package ohgwang.demori.api.controller;

import io.swagger.annotations.Api;
import ohgwang.demori.DB.entity.University;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.response.Ranking.UniversityRankingRes;
import ohgwang.demori.api.response.Ranking.UserRankingRes;
import ohgwang.demori.api.service.RankingService;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "Ranking API" , tags = {"ranking"})
@RestController
@RequestMapping("/api/ranking")
public class RankingController {

    @Autowired
    RankingService rankingService;


    @PutMapping("/update/user")
    public ResponseEntity<? extends BaseResponseBody> updateUserRanking() {
        try{
            rankingService.updateUserRanking();
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "유저 랭킹 갱신"));
        }catch (Exception e){
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @GetMapping("/user")
    public ResponseEntity<UserRankingRes> getUserRanking(@RequestParam(value = "page", defaultValue = "0") int page,
                                                         @RequestParam(value = "size", defaultValue = "10") int size) {
        try{
            Page<User> userList = rankingService.getUserRanking(page, size);
            if(userList == null){
                return ResponseEntity.status(204).body(UserRankingRes.of(204, "데이터 없음" , null));
            }
            return ResponseEntity.status(200).body(UserRankingRes.of(200, "유저 랭킹" , userList));
        }catch (Exception e){
            return ResponseEntity.status(500).body(UserRankingRes.of(500, "서버 오류", null));
        }
    }

    @PatchMapping("/update/university")
    public ResponseEntity<? extends BaseResponseBody> updateUniversityRanking() {
        try{
            rankingService.updateUniversityRanking();
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "대학 랭킹 갱신"));
        }catch (Exception e){
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @GetMapping("/university")
    public ResponseEntity<UniversityRankingRes> getUniversityRanking(@RequestParam(value = "page", defaultValue = "0") int page,
                                                                     @RequestParam(value = "size", defaultValue = "10") int size) {
        try{
            Page<University> universityList = rankingService.getUniversityRanking(page, size);
            if(universityList == null){
                return ResponseEntity.status(204).body(UniversityRankingRes.of(204, "데이터 없음" , null));
            }
            return ResponseEntity.status(200).body(UniversityRankingRes.of(200, "유저 랭킹" , universityList));
        }catch (Exception e){
            return ResponseEntity.status(500).body(UniversityRankingRes.of(500, "서버 오류", null));
        }
    }

}
