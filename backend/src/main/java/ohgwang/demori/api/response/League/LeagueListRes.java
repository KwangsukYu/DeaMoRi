package ohgwang.demori.api.response.League;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class LeagueListRes extends BaseResponseBody {

    private List<GetLeague> getLeagues;

    public static LeagueListRes of(int statusCode, String message, List<League> leagues) {

        LeagueListRes res = new LeagueListRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);

        res.getLeagues = new ArrayList<>();
        if(leagues != null) {
            for (League league : leagues) {
                GetLeague getLeague = GetLeague.builder()
                        .leagueId(league.getId())
                        .leagueName(league.getLeagueId())
                        .posterURL(league.getPosterURL())
                        .uniName1(league.getTeam1().getUniversity().getUniName())
                        .uniName2(league.getTeam2().getUniversity().getUniName())
                        .leagueStartDate(league.getLeagueStartDate())
                        .leagueEndDate(league.getLeagueEndDate())
                        .status(league.getStatus())
                        .donation(league.getAllDonation())
                        .prizeMoney(league.getPrizeMoney())
                        .build();

                res.getLeagues.add(getLeague);
            }
        }

        return res;
    }
}

@Data
@Builder
class UniLeague {
    private int leagueId;
    private String leagueName;
    private String posterURL;
    private String uniName1;
    private String uniName2;
    private LocalDate leagueStartDate;
    private LocalDate leagueEndDate;
    @ApiModelProperty(name="대회 상태", example="0", value = "0 : 대회 준비, 1 : 대회 중 , 2 : 대회 종료")
    private String status;
    private int donation;
    private int prizeMoney;
}
