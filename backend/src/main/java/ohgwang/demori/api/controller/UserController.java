package ohgwang.demori.api.controller;

import io.swagger.annotations.*;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.UserRegisterPostReq;
import ohgwang.demori.api.response.User.UserRes;
import ohgwang.demori.api.service.UniversityService;
import ohgwang.demori.api.service.UserService;
import ohgwang.demori.common.auth.SsafyUserDetails;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;


/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */

/**
 * 	post 요청 시에
 	UserRegisterPostReq 안의
 	userId, password, userName, nickName, email을 받아서 사용

 	get 요청 시에
 	해당 변수를 params로 받아서 사용


 	Authentication authentication
 	로그인 후 생성되는 엑세스 토큰이 헤더에 등록되어 있으면 자동으로 사용
 */
@Api(value = "User API" , tags = {"Users"})
@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private final String SUCCESS = "success";
	private final String FAIL = "fail";
	
	@Autowired
	UserService userService;

	@Autowired
	UniversityService universityService;


	@PostMapping()
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody UserRegisterPostReq registerInfo) {
		
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		User user = userService.createUser(registerInfo);
		if (user.getUserId()==null) {
			return ResponseEntity.status(401).body(BaseResponseBody.of(401, "비밀번호가 4자 이하입니다"));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, SUCCESS));
	}

	@GetMapping("/me")
	@Transactional
	public ResponseEntity<UserRes> getUserInfo(Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);

		return ResponseEntity.status(200).body(UserRes.of(user));
	}

	@GetMapping("/check/id")
	public ResponseEntity<?> getIdCheck(@RequestParam String userId){
		User user = userService.getUserByUserId(userId);

		if(user == null) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}else {
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/check/nickname")
	public ResponseEntity<?> getNicknameCheck(@RequestParam String nickName){
		User user = userService.getUserByNickname(nickName);

		if(user == null) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}else {
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}

	@ApiOperation(value = "대학 인증 사진 업로드 , 토큰 필요")
	@ApiResponses({
			@ApiResponse(code = 200, message = "저장완료"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/auth")
	public ResponseEntity<? extends BaseResponseBody> uploadAuthImage(Authentication authentication, @ApiParam(value = "multipart 타입으로 파일 전송") @RequestPart MultipartFile file ,@ApiParam(value = "대학 이름") @RequestParam String univesityName){
		try {
			SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
			String userId = userDetails.getUsername();
			User user = userService.getUserByUserId(userId);
			user.setUniversity(universityService.getUniversityByName(univesityName));

			userService.uploadAuthImage(file, user);

		}catch (Exception e){
			return ResponseEntity.status(500).body(BaseResponseBody.of(500,"FAIL"));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200,"저장완료"));
	}

	@ApiOperation(value = "유저 프로필 변경, multipart 형식으로 받음")
	@ApiResponses({
			@ApiResponse(code = 200, message = "저장완료"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PatchMapping("/profile")
	public ResponseEntity<? extends BaseResponseBody> uploadProfileImage(Authentication authentication, @ApiParam(value = "multipart 타입으로 파일 전송") @RequestPart MultipartFile file){
		try {
			SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
			String userId = userDetails.getUsername();
			User user = userService.getUserByUserId(userId);

			userService.uploadProfileImage(file, user);
		}catch (Exception e){
			return ResponseEntity.status(500).body(BaseResponseBody.of(500,"FAIL"));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200,"저장완료"));
	}

}
