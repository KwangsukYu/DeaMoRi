package ohgwang.demori.api.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.Relation.Cheer;
import ohgwang.demori.DB.entity.Team;
import ohgwang.demori.common.model.response.BaseResponseBody;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class LeagueRes extends BaseResponseBody {

    private int leaguePk;
    private int ownerPk;
    private String leagueId;
    private String leagueContractAddress;
    private LocalDate leagueStartDate;
    private LocalDate leagueEndDate;
    private String location;
    private String isBroadcast;
    private String status;
    private String posterURL;
    private int allDonation;
    private GetTeam team1;
    private GetTeam team2;

    public static LeagueRes of (int statusCode, String message, League league) {

        LeagueRes res = new LeagueRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setOwnerPk(league.getOwner().getId());
        res.setLeaguePk(league.getId());
        res.setLeagueId(league.getLeagueId());
        res.setLeagueContractAddress(league.getContractAddress());
        res.setLeagueStartDate(league.getLeagueStartDate());
        res.setLeagueEndDate(league.getLeagueEndDate());
        res.setLocation(league.getLocation());
        res.setIsBroadcast(league.getIsBroadcast());
        res.setStatus(league.getStatus());
        res.setPosterURL(league.getPosterURL());
        res.setAllDonation(league.getAllDonation());

        res.setTeam1(GetTeam.builder()
                .teamId(league.getTeam1().getId())
                .teamName(league.getTeam1().getTeamId())
                .teamColor(league.getTeam1().getTeamColor())
                .teamWalletAddress(league.getTeam1().getWallet().getAddress())
                .teamDonation(league.getTeamOneDonation())
                .teamUniversityId(league.getTeam1().getUniversity().getId())
                .teamUniversityName(league.getTeam1().getUniversity().getUniName())
                .teamUniversitylogoUrl(league.getTeam1().getUniversity().getLogoUrl())
                .build());
        res.setTeam2(GetTeam.builder()
                .teamId(league.getTeam2().getId())
                .teamName(league.getTeam2().getTeamId())
                .teamColor(league.getTeam2().getTeamColor())
                .teamWalletAddress(league.getTeam2().getWallet().getAddress())
                .teamDonation(league.getTeamTwoDonation())
                .teamUniversityId(league.getTeam2().getUniversity().getId())
                .teamUniversityName(league.getTeam2().getUniversity().getUniName())
                .teamUniversitylogoUrl(league.getTeam2().getUniversity().getLogoUrl())
                .build());

        res.getTeam1().setGetCheers(new ArrayList<>());
        res.getTeam2().setGetCheers(new ArrayList<>());


        for(Cheer cheer : league.getCheers()) {
            GetCheer getCheer = GetCheer.builder()
                    .cheerId(cheer.getId())
                    .cheerName(cheer.getCheertName())
                    .cheerBalance(cheer.getCheerBalance())
                    .cheerContent(cheer.getContent())
                    .selectTeam(cheer.getSendTeam())
                    .sendId(cheer.getUser().getUserId())
                    .build();

            if(cheer.getSendTeam().equals("0")) {
                res.getTeam1().getGetCheers().add(getCheer);
            }
            else {
                res.getTeam2().getGetCheers().add(getCheer);
            }
        }

        return res;
    }
}

@Data
@Builder
class GetTeam {
    private int teamId;
    private String teamName;
    private String teamColor;
    private String teamWalletAddress;
    private int teamDonation;
    private int teamUniversityId;
    private String teamUniversityName;
    private String teamUniversitylogoUrl;
    private List<GetCheer> getCheers;
}

@Data
@Builder
class GetCheer {
    private int cheerId;
    private String cheerName;
    private int cheerBalance;
    private String cheerContent;
    private String selectTeam;
    private String sendId;
}