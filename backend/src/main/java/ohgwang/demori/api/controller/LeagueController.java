package ohgwang.demori.api.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.Team;
import ohgwang.demori.api.request.LeagueRegisterPostReq;
import ohgwang.demori.api.response.LeaguePageRes;
import ohgwang.demori.api.service.LeagueService;
import ohgwang.demori.api.service.TeamService;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/league")
public class LeagueController {

    private final String SUCCESS = "success";
    private final String FAIL = "fail";

    @Autowired
    LeagueService leagueService;

    @Autowired
    TeamService teamService;

    @ApiOperation(value = "대회 생성")
    @PostMapping("")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 422, message = "대학 이름이 같습니다."),
            @ApiResponse(code = 500, message = "실패"),
    })
    public ResponseEntity<? extends BaseResponseBody> registerLeague(
            @RequestBody LeagueRegisterPostReq registerInfo) {

        League league = leagueService.createLeague(registerInfo);
        if (league == null) {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, FAIL));
        }
        if (league.getTeam1().getUniName().equals(league.getTeam2().getUniName()) == true) {
            return ResponseEntity.status(422).body(BaseResponseBody.of(422, "대학 이름이 같습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, SUCCESS));
    }

    @ApiOperation(value = "대회 조회", notes = "[page : 페이지], [size : 페이당 정보 개수], [field : 정렬 기준]")
    @GetMapping()
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 204, message = "대회가 존재하지 않습니다"),
    })
    public ResponseEntity<? extends BaseResponseBody> getLeagueList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "8") int size,
            @RequestParam(value = "field", defaultValue = "id") String field,
            @RequestParam(value = "keyword", required = false) String keyword) {

        Page<League> leaguePage = leagueService.getLeaguePage(page, size, field, keyword);

        if (leaguePage.isEmpty() == true) {
            return ResponseEntity.status(204).body(BaseResponseBody.of(204, "대회가 존재하지 않습니다."));
        }
        return ResponseEntity.status(200).body(LeaguePageRes.of(200, SUCCESS, leaguePage));
    }
}
