package ohgwang.demori.api.controller;

import io.swagger.annotations.*;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.University;
import ohgwang.demori.api.response.League.LeagueListRes;
import ohgwang.demori.api.response.UniversityRes;
import ohgwang.demori.api.service.UniversityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "대학 API" , tags = {"univers"})
@RestController
@RequestMapping("/api/univers")
public class UniversityController {


    public static final Logger logger = LoggerFactory.getLogger(UniversityController.class);

    @Autowired
    UniversityService universityService;

    @GetMapping("/list")
    @ApiOperation(value = "대학 전체 리스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 204, message = "리스트 없음"),
            @ApiResponse(code = 400, message = "잘못된 요청"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<UniversityRes>> getUniversities() {
        try {
            List<UniversityRes> l = universityService.getUniversities();
            if(l == null){
                return ResponseEntity.status(400).body(null);
            }else if(l.size() == 0){
                return ResponseEntity.status(204).body(l);
            }else{
                return ResponseEntity.status(200).body(l);
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }

    }

    @GetMapping({"/search/{search}","/search"})
    @ApiOperation(value = "대학 검색")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 204, message = "리스트 없음"),
            @ApiResponse(code = 400, message = "잘못된 요청"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<UniversityRes>> searchUniversities(
            @ApiParam(value = "검색어, null 일 경우 전체 조회")@PathVariable(required = false)  String search) {
        try {
            List<UniversityRes> l = null;
            if(search == null){
                l = universityService.getUniversities();
            }else{
                l = universityService.searchUniversities(search);
            }

            if(l == null){
                return ResponseEntity.status(400).body(null);
            }else if(l.size() == 0){
                return ResponseEntity.status(204).body(l);
            }else{
                return ResponseEntity.status(200).body(l);
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }


    @GetMapping("")
    @ApiOperation(value = "대학 정보 보기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 204, message = "리스트 없음"),
            @ApiResponse(code = 400, message = "잘못된 요청"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UniversityRes> getUniversity(
            @RequestParam @ApiParam(value = "id") String id) {
        try {
            University u = universityService.getUniversity(id);
            if(u == null){
                return ResponseEntity.status(400).body(null);
            }else{
                return ResponseEntity.status(200).body(UniversityRes.of(u));
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }


    @GetMapping("/league/{universityPk}")
    @ApiOperation(value = "해당 대학과 관련된 대회 보기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 204, message = "리스트 없음"),
            @ApiResponse(code = 400, message = "잘못된 요청"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<LeagueListRes> getUniversityLeague(
            @PathVariable @ApiParam(value = "대학교 Pk") String universityPk) {
        try {
            University u = universityService.getUniversity(universityPk);
            if(u == null){
                return ResponseEntity.status(400).body(LeagueListRes.of(400,"대학이 없습니다" , null));
            }

            List<League> universityLeague = universityService.findUniversityLeague(u);
            if(universityLeague == null){
                return ResponseEntity.status(400).body(LeagueListRes.of(400,"잘못된 요청" , null));
            }
            else if(universityLeague.size() == 0){
                return ResponseEntity.status(204).body(LeagueListRes.of(204,"해당 대학 대회 없음" , null));
            }else{
                return ResponseEntity.status(200).body(LeagueListRes.of(200,"성공" , universityLeague));
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body(LeagueListRes.of(200,"서버 오류" , null));
        }
    }








}
