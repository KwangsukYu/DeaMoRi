package ohgwang.demori.api.response;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.DB.entity.User;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	int userPk;
	@ApiModelProperty(name="User ID")
	String userId;
	String userName;
	String address;
	String nickName;
	String badge;
	String role;
	
	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserPk(user.getId());
		res.setUserId(user.getUserId());
		res.setUserName(user.getUsername());
		res.setBadge(user.getBadge());
		res.setNickName(user.getNickName());
		if(user.getWallet() != null){
			res.setAddress(user.getWallet().getAddress());
		}else{
			res.setAddress(null);
		}
		res.setRole(user.getRole());
		return res;
	}
}