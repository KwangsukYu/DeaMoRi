package ohgwang.demori.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Data
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	@ApiModelProperty(name="유저 ID", example="test")
	String userId;
	@ApiModelProperty(name="유저 Password", example="your_password")
	String password;
	@ApiModelProperty(name="유저 이름", example="김싸피")
	String userName;
	@ApiModelProperty(name="닉네임", example="대모리김싸피")
	String nickName;

}
