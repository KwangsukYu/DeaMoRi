package ohgwang.demori.api.response;

import lombok.Builder;
import lombok.Data;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class UserRankingRes extends BaseResponseBody {
    private List<UserRanking> UserRankings;

    public static UserRankingRes of(int statusCode, String message, Page<User> userPage) {

        UserRankingRes res = new UserRankingRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.UserRankings = new ArrayList<>();
        if(userPage != null){
            for(User user : userPage) {
                UserRanking userRanking = UserRanking.builder()
                        .badge(user.getBadge())
                        .donation(user.getDonation())
                        .nickName(user.getNickName())
                        .ranking(user.getRanking())
                        .userPk(user.getId())
                        .userName(user.getUsername())
                        .build();

                if(user.getUniversity() != null){
                    userRanking.setUniversityPk(user.getUniversity().getId());
                    userRanking.setUniversityName(user.getUniversity().getUniName());
                    userRanking.setUniversityLogo(user.getUniversity().getLogoUrl());
                }

                res.UserRankings.add(userRanking);
            }
        }



        return res;
    }
}


@Data
@Builder
class UserRanking {
    private int userPk;
    private int ranking;
    private int donation;
    private String nickName;
    private String userName;
    private String badge;

    private int universityPk;
    private String universityName;
    private String universityLogo;

}