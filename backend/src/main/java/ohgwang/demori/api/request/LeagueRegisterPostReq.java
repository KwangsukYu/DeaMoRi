package ohgwang.demori.api.request;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class LeagueRegisterPostReq {

    // League
    private String leagueId;
    private LocalDateTime leagueStartDatetime;
    private LocalDateTime leagueEndDatetime;
    private LocalDateTime sponStartDatetime;
    private String location;
    private String contractAddress;

    // TEAM
    private String team1Id;
    private String team1University;
    private String team1LeaderId;
    private String team1Color;

    private String team2Id;
    private String team2University;
    private String team2LeaderId;
    private String team2Color;

}
