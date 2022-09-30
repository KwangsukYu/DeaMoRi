package ohgwang.demori.api.request;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class LeagueRegisterPostReq {

    // League
    private String leagueTitle;         // 리그 제목
    private LocalDate leagueStart;      // 시작 날짜
    private LocalDate leagueEnd;        // 종료
    private String place;               // 장소
    private String contractAddress;     // 컨트렉트 주소
    private String broadcast;           // 중계 여부
    private int prizeMoney;             // 상금

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
