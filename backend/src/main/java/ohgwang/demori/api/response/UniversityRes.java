package ohgwang.demori.api.response;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.DB.entity.Image.Trophy;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.University;
import ohgwang.demori.DB.entity.User;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;

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

	@ApiModelProperty(name="로고 이미지 주소, null 있음")
	private String logoUrl;

	@ApiModelProperty(name="트로피 리스트")
	private List<TrophyRes> trophyList;

	
	public static UniversityRes of(University university) {
		UniversityRes res = new UniversityRes();
		res.setId(university.getId());
		res.setHomepage(university.getHomepage());
		res.setUniversityAddress(university.getUniAddress());
		res.setUniversityName(university.getUniName());
		res.setLogoUrl(university.getLogoUrl());
		res.trophyList = new ArrayList<>();
		if(university.getTrophyList() != null){
			for(Trophy trophy : university.getTrophyList()){
				TrophyRes trophyRes = TrophyRes.builder()
						.fileUrl(trophy.getFileUrl())
						.id(trophy.getId())
						.leaguePk(trophy.getLeague().getId())
						.build();
				res.trophyList.add(trophyRes);
			}
		}
		return res;
	}
}
@Data
@Builder
class TrophyRes{
	private int id;
	String fileUrl;
	private int leaguePk;
}