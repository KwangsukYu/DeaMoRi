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
	private int userPk;
	@ApiModelProperty(name="User ID")
	private String userId;
	private String userName;
	private String nickName;
	private String badge;
	private String role;

	private String address;

	private int universityPk;
	private String universityName;
	private String universityLogo;
	
	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserPk(user.getId());
		res.setUserId(user.getUserId());
		res.setUserName(user.getUsername());
		res.setBadge(user.getBadge());
		res.setNickName(user.getNickName());
		if(user.getWallet() != null){
			res.setAddress(user.getWallet().getAddress());
		}
		if(user.getUniversity() != null){
			res.setUniversityPk(user.getUniversity().getId());
			res.setUniversityLogo(user.getUniversity().getLogoUrl());
			res.setUniversityName(user.getUniversity().getUniName());
		}

		res.setRole(user.getRole());
		return res;
	}
}