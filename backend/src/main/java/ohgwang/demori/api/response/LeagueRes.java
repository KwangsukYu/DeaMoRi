package ohgwang.demori.api.response;

import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.Team;
import ohgwang.demori.common.model.response.BaseResponseBody;

import java.time.LocalDateTime;

@Getter @Setter
public class LeagueRes extends BaseResponseBody {

    private String leagueId;
    private LocalDateTime leagueStartDatetime;
    private LocalDateTime leagueEndDatetime;
    private LocalDateTime sponStartDatetime;
    private String location;
    private int isBroadcast;
    private String status;
    private String posterURL;
    private Team team1;
    private Team team2;

    public static LeagueRes of (int statusCode, String message, League league) {
        LeagueRes res = new LeagueRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setLeagueId(league.getLeagueId());
        res.setLeagueStartDatetime(league.getLeagueStartDatetime());
        res.setLeagueEndDatetime(league.getLeagueEndDatetime());
        res.setSponStartDatetime(league.getSponStartDatetime());
        res.setLocation(league.getLocation());
        res.setIsBroadcast(league.getIsBroadcast());
        res.setStatus(league.getStatus());
        res.setPosterURL(league.getPosterURL());

        Team team1 = new Team();
        team1.setTeamId(league.getTeam1().getTeamId());
        team1.setUniversity(league.getTeam1().getUniversity());
        team1.setTeamColor(league.getTeam1().getTeamColor());

        Team team2 = new Team();
        team2.setTeamId(league.getTeam1().getTeamId());
        team2.setUniversity(league.getTeam1().getUniversity());
        team2.setTeamColor(league.getTeam1().getTeamColor());

        res.setTeam1(team1);
        res.setTeam2(team2);

        return res;
    }
}