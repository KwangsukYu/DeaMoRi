package ohgwang.demori.api.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class LeaguePageRes extends BaseResponseBody {

    private List<GetLeague> getLeagues;

    public static LeaguePageRes of(int statusCode, String message, Page<League> leaguePage) {

        LeaguePageRes res = new LeaguePageRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);

        res.getLeagues = new ArrayList<>();
        for(League league : leaguePage) {
            GetLeague getLeague = GetLeague.builder()
                    .uniName1(league.getTeam1().getUniversity().getUniName())
                    .uniName2(league.getTeam2().getUniversity().getUniName())
                    .leagueName(league.getLeagueId())
                    .leagueDatetime(league.getLeagueStartDatetime())
                    .build();

            res.getLeagues.add(getLeague);
        }

        return res;
    }
}

@Data
@Builder
class GetLeague {
    private String uniName1;
    private String uniName2;
    private String leagueName;
    private LocalDateTime leagueDatetime;
}
