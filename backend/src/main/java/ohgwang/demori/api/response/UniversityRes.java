package ohgwang.demori.api.response;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.DB.entity.University;
import ohgwang.demori.DB.entity.User;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UniversityResponse")
public class UniversityRes {
	@ApiModelProperty(name="대학교 ID")
	private int id;

	@ApiModelProperty(name="대학교 이름")
	private String universityName;

	@ApiModelProperty(name="대학교 홈페이지, 웹메일")
	private String homepage;

	@ApiModelProperty(name="학교 주소")
	private String universityAddress;

	
	public static UniversityRes of(University university) {
		UniversityRes res = new UniversityRes();
		res.setId(university.getId());
		res.setHomepage(university.getHomepage());
		res.setUniversityAddress(university.getUniAddress());
		res.setUniversityName(university.getUniName());
		return res;
	}
}
