package ohgwang.demori.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.UserLoginPostReq;
import ohgwang.demori.api.response.User.UserAdminRes;
import ohgwang.demori.api.response.User.UserLoginPostRes;
import ohgwang.demori.api.service.UserService;
import ohgwang.demori.common.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */

/**
 * 	post
 UserloginPostReq 안의
 userId, password을 받아서 사용

 생성된 엑세스 토큰을 herder에 Authorization : Bearer + 엑세스 토큰 형태로 저장
 */

@Api(value = "auth API" , tags = {"auth"})
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	UserService userService;
	
	@Autowired
    PasswordEncoder passwordEncoder;

	@ApiOperation(value = "로그인",notes = "Access Tocken 필요없음",response = UserLoginPostRes.class)
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 400, message = "잘못된 요청"),
			@ApiResponse(code = 401, message = "로그인 실패"),
			@ApiResponse(code = 403, message = "정지 유저"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/login")
	public ResponseEntity<UserLoginPostRes> login(@RequestBody UserLoginPostReq loginInfo) {
		String userId = loginInfo.getUserId();
		String password = loginInfo.getPassword();
		
		User user = userService.getUserByUserId(userId);
		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if(passwordEncoder.matches(password, user.getPassword())) {
			if (user.getRole().equals("ROLE_SUSPENDED")) {
				return ResponseEntity.status(403).body(UserLoginPostRes.of(403, "정지 유저입니다", null));
			}
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId)));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
	}
}
