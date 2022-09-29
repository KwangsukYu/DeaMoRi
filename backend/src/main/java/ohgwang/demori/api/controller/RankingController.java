package ohgwang.demori.api.controller;

import io.swagger.annotations.Api;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.LeagueRegisterPostReq;
import ohgwang.demori.api.response.UserRankingRes;
import ohgwang.demori.api.service.RankingService;
import ohgwang.demori.api.service.UserService;
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


    @PatchMapping("/update/user")
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
            return ResponseEntity.status(200).body(UserRankingRes.of(200, "유저 랭킹" , userList));
        }catch (Exception e){
            return ResponseEntity.status(500).body(UserRankingRes.of(500, "서버 오류", null));
        }
    }

    @PatchMapping("/update/university")
    public ResponseEntity<? extends BaseResponseBody> updateUniversityRanking(
            @RequestBody LeagueRegisterPostReq registerInfo) {


        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "td"));
    }

}
