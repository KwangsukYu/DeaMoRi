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
import java.util.Collections;
import java.util.Comparator;
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

	@ApiModelProperty(name="후원금")
	private int donation;

	@ApiModelProperty(name="랭킹")
	private int ranking;

	@ApiModelProperty(name="대학교 내의 유저(후원금 순 정렬)")
	private List<UserUniversityRes> userList;

	
	public static UniversityRes of(University university) {
		UniversityRes res = new UniversityRes();
		res.setId(university.getId());
		res.setHomepage(university.getHomepage());
		res.setUniversityAddress(university.getUniAddress());
		res.setUniversityName(university.getUniName());
		res.setLogoUrl(university.getLogoUrl());
		res.setDonation(university.getDonation());
		res.setRanking(university.getRanking());
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

		res.userList = new ArrayList<>();
		Collections.sort(university.getUserList(), new Comparator<User>() {
			@Override
			public int compare(User user, User t1) {
				return - user.getDonation() + t1.getDonation() ;
			}
		});

		for(User u : university.getUserList()){
			UserUniversityRes uRes = UserUniversityRes.builder()
					.userPk(u.getId())
					.userId(u.getUserId())
					.userName(u.getUsername())
					.nickName(u.getNickName())
					.badge(u.getBadge())
					.donation(u.getDonation())
					.ranking(u.getRanking())
					.role(u.getRole())
					.build();
			if(u.getWallet() != null){
				uRes.setAddress(u.getWallet().getAddress());
			}

			res.userList.add(uRes);
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

@Data
@Builder
class UserUniversityRes{
	private int userPk;
	@ApiModelProperty(name="User ID")
	private String userId;
	private String userName;
	private String nickName;
	private String badge;
	private int donation;
	private int ranking;
	private String role;
	private String address;

}