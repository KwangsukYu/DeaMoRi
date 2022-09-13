package ohgwang.demori.api.response;


import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.DB.entity.User;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
//@ApiModel("UserResponse")
public class UserRes{
	//@ApiModelProperty(name="User ID")
	String userId;
	String userName;
	String nickName;
	String email;
	String profileUrl;
	String role;
	
	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserId(user.getUserid());
		res.setUserName(user.getUsername());
		res.setRole(user.getRole());
		return res;
	}
}
