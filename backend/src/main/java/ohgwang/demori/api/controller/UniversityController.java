package ohgwang.demori.api.controller;

import io.swagger.annotations.*;
import ohgwang.demori.DB.entity.University;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.response.AddressRes;
import ohgwang.demori.api.response.BaseRes;
import ohgwang.demori.api.response.UniversityRes;
import ohgwang.demori.api.service.UniversityService;
import ohgwang.demori.api.service.UserService;
import ohgwang.demori.api.service.WalletService;
import ohgwang.demori.common.auth.SsafyUserDetails;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

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

    @GetMapping("/{search}")
    @ApiOperation(value = "대학 검색")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 204, message = "리스트 없음"),
            @ApiResponse(code = 400, message = "잘못된 요청"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<UniversityRes>> searchUniversities(
            @PathVariable(required = false) @ApiParam(value = "검색어, null 일 경우 전체 조회") String search) {
        try {
            List<UniversityRes> l = universityService.searchUniversities(search);
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









}
