package ohgwang.demori.api.response.Ranking;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.DB.entity.University;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UniversityRankingRes extends BaseResponseBody{
    private List<UniversityRanking> universityRankings;


    public static UniversityRankingRes of(int statusCode, String message, Page<University> UniversityPage) {

        UniversityRankingRes res = new UniversityRankingRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.universityRankings = new ArrayList<>();

        if(UniversityPage != null){

            for(University uni : UniversityPage) {
                UniversityRanking universityRanking = UniversityRanking.builder()
                        .donation(uni.getDonation())
                        .homepage(uni.getHomepage())
                        .logoUrl(uni.getLogoUrl())
                        .ranking(uni.getRanking())
                        .uniAddress(uni.getUniAddress())
                        .uniName(uni.getUniName())
                        .uniPk(uni.getId())
                        .build();



                res.universityRankings.add(universityRanking);
            }
        }



        return res;
    }
}


@Data
@Builder
class UniversityRanking {
    private int uniPk;
    private String uniName;
    private String homepage;
    private String uniAddress;
    private String logoUrl;

    private int donation;
    private int ranking;

}