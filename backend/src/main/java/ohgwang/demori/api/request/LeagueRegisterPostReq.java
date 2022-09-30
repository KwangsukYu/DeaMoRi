package ohgwang.demori.api.request;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class LeagueRegisterPostReq {

    // League
    private String leagueTitle;
    private LocalDate leagueStart;
    private LocalDate leagueEnd;
    private String place;
    private String contractAddress;
    private String broadcast;

    // TEAM
    private String team1Name;
    private String team1University;
    private String team1Wallet;
    private String team1Color;

    private String team2Name;
    private String team2University;
    private String team2Wallet;
    private String team2Color;

}
