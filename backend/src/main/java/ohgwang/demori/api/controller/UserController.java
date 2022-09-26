package ohgwang.demori.api.controller;

import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.UserRegisterPostReq;
import ohgwang.demori.api.response.UserRes;
import ohgwang.demori.api.service.UserService;
import ohgwang.demori.common.auth.SsafyUserDetails;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


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
@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private final String SUCCESS = "success";
	private final String FAIL = "fail";
	
	@Autowired
	UserService userService;


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

	@PostMapping("/auth")
	public ResponseEntity<? extends BaseResponseBody> uploadAuthImage(Authentication authentication, @RequestPart MultipartFile file){
		try {
			SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
			String userId = userDetails.getUsername();
			User user = userService.getUserByUserId(userId);

			userService.uploadAuthImage(file, user);
		}catch (Exception e){
			return ResponseEntity.status(500).body(BaseResponseBody.of(500,"FAIL"));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200,"저장완료"));
	}




}
