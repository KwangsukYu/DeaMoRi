package ohgwang.demori.api.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.api.request.LeagueRegisterPostReq;
import ohgwang.demori.api.response.LeaguePageRes;
import ohgwang.demori.api.service.LeagueService;
import ohgwang.demori.api.service.UniversityService;
import ohgwang.demori.api.service.UserService;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/league")
public class LeagueController {

    private final String SUCCESS = "success";
    private final String FAIL = "fail";

    @Autowired
    LeagueService leagueService;

    @Autowired
    UserService userService;

    @Autowired
    UniversityService universityService;

    @ApiOperation(value = "대회 생성")
    @PostMapping(value = "", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 422, message = "대학 이름이 같습니다."),
            @ApiResponse(code = 500, message = "실패"),
    })
    public ResponseEntity<? extends BaseResponseBody> registerLeague(
            @RequestPart MultipartFile file, @RequestPart LeagueRegisterPostReq registerInfo) throws IOException {

        if(universityService.getUniversityByName(registerInfo.getTeam1University()) == null
                || universityService.getUniversityByName(registerInfo.getTeam2University()) == null) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "대학 정보가 올바르지 않습니다"));
        }
        if(userService.getByWallet(registerInfo.getTeam1Wallet()) == null
                || userService.getByWallet(registerInfo.getTeam2Wallet()) == null) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "팀장 지갑 정보가 올바르지 않습니다"));
        }

        League league = leagueService.createLeague(registerInfo, file);

        if(league == null) {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, FAIL));
        }
        if (league.getTeam1().getUniversity().getUniName().equals(league.getTeam2().getUniversity().getUniName())) {
            return ResponseEntity.status(422).body(BaseResponseBody.of(422, "대학 이름이 같습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, SUCCESS));
    }

    @ApiOperation(value = "대회 조회", notes = "[page : 페이지], [size : 페이당 정보 개수], [field : 정렬 기준]")
    @GetMapping()
    @ApiResponses({
            @ApiResponse(code=200, message = "성공"),
            @ApiResponse(code=204, message = "대회가 존재하지 않습니다"),
    })
    public ResponseEntity<? extends BaseResponseBody> getLeagueList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "8") int size,
            @RequestParam(value = "field", defaultValue = "id") String field,
            @RequestParam(value = "keyword", required = false) String keyword) {

        Page<League> leaguePage = leagueService.getLeaguePage(page, size, field, keyword);

        if (leaguePage.isEmpty()) {
            return ResponseEntity.status(204).body(BaseResponseBody.of(204, "대회가 존재하지 않습니다."));
        }
        return ResponseEntity.status(200).body(LeaguePageRes.of(200, SUCCESS, leaguePage));
    }


}
