package ohgwang.demori.api.controller;

import io.swagger.annotations.Api;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.api.request.LeagueRegisterPostReq;
import ohgwang.demori.api.service.RankingService;
import ohgwang.demori.api.service.UserService;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "Ranking API" , tags = {"ranking"})
@RestController
@RequestMapping("/api/ranking")
public class RankingController {

    @Autowired
    RankingService rankingService;


    @PatchMapping("/update/user")
    public ResponseEntity<? extends BaseResponseBody> updateUserRanking() {
        rankingService.updateUserRanking();

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "td"));
    }

    @PatchMapping("/update/university")
    public ResponseEntity<? extends BaseResponseBody> updateUniversityRanking(
            @RequestBody LeagueRegisterPostReq registerInfo) {


        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "td"));
    }

}
