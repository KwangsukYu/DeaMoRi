package ohgwang.demori.api.response;

import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.Team;
import ohgwang.demori.common.model.response.BaseResponseBody;

import java.time.LocalDate;

@Getter @Setter
public class LeagueRes extends BaseResponseBody {

    private String leagueId;
    private LocalDate leagueStartDate;
    private LocalDate leagueEndDate;
    private String location;
    private String isBroadcast;
    private String status;
    private String posterURL;
    private Team team1;
    private Team team2;

    public static LeagueRes of (int statusCode, String message, League league) {
        LeagueRes res = new LeagueRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setLeagueId(league.getLeagueId());
        res.setLeagueStartDate(league.getLeagueStartDate());
        res.setLeagueEndDate(league.getLeagueEndDate());
        res.setLocation(league.getLocation());
        res.setIsBroadcast(league.getIsBroadcast());
        res.setStatus(league.getStatus());
        res.setPosterURL(league.getPosterURL());

        Team team1 = new Team();
        team1.setTeamId(league.getTeam1().getTeamId());
//        team1.setUniversity(league.getTeam2().getUniversity());
        team1.setTeamColor(league.getTeam1().getTeamColor());

        Team team2 = new Team();
        team2.setTeamId(league.getTeam2().getTeamId());
//        team2.setUniversity(league.getTeam2().getUniversity());
        team2.setTeamColor(league.getTeam2().getTeamColor());

        res.setTeam1(team1);
        res.setTeam2(team2);

        return res;
    }

//    public Team makeTeamObj(League league) {
//        Team team = new Team();
//
//    }
}
