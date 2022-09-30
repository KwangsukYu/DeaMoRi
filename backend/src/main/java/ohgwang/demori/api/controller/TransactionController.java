package ohgwang.demori.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.CheerRegisterPostReq;
import ohgwang.demori.api.request.SupportRegisterPostReq;
import ohgwang.demori.api.response.UserAdminRes;
import ohgwang.demori.api.service.TransactionService;
import ohgwang.demori.api.service.UserService;
import ohgwang.demori.common.auth.SsafyUserDetails;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "후원 API" , tags = {"transaction"})
@RestController
@RequestMapping("api/transaction")
public class TransactionController {
    @Autowired
    private UserService userService;

    @Autowired
    private TransactionService transactionService;


    @PostMapping("/support")
    @ApiOperation(value = "후원 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "유저 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerSupport(@ApiIgnore Authentication authentication, @RequestBody SupportRegisterPostReq supportReq) {
        try {
            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            String userId = userDetails.getUsername();
            User user = userService.getUserByUserId(userId);

            if(user == null){
                return ResponseEntity.status(400).body(BaseResponseBody.of(400, "유저 없음"));
            }
            transactionService.registerSupport(supportReq, user);

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "저장 완료"));
        }catch (Exception e){
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @PostMapping("/cheer")
    @ApiOperation(value = "응원 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "유저 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerCheer(@ApiIgnore Authentication authentication, @RequestBody CheerRegisterPostReq cheerReq) {
        try {
            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            String userId = userDetails.getUsername();
            User user = userService.getUserByUserId(userId);

            if(user == null){
                return ResponseEntity.status(400).body(BaseResponseBody.of(400, "유저 없음"));
            }
            transactionService.registerCheer(cheerReq, user);

            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "저장 완료"));
        }catch (Exception e){
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }


}
