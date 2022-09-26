package ohgwang.demori.api.request;


import lombok.Data;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Data
//@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {

	String userId;
	//@ApiModelProperty(name="유저 Password", example="your_password")
	String password;
	
	String userName;

	String nickName;

}
