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
    private LocalDateTime sponEndDatetime;
    private String location;

    // TEAM
    private List<String> uniName = new ArrayList<>();
    private List<String> teamId = new ArrayList<>();
    private List<String> leaderId = new ArrayList<>();
    private List<String> teamColor = new ArrayList<>();

}
