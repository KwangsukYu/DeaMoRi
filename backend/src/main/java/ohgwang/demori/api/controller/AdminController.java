package ohgwang.demori.api.controller;

import io.swagger.annotations.*;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.UserRegisterPostReq;
import ohgwang.demori.api.response.UserAdminRes;
import ohgwang.demori.api.response.UserRes;
import ohgwang.demori.api.service.UserService;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Api(value = "admin API" , tags = {"admin"})
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    UserService userService;


    @GetMapping()
    @ApiOperation(value = "유저 리스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> getUsers() {
        List<User> list = null;
        try {
            list = userService.findAllUser();
            if(list == null){
                return ResponseEntity.status(400).body(BaseResponseBody.of(400, "잘못된 요청입니다"));
            }else if(list.size() == 0){
                return ResponseEntity.status(204).body(UserAdminRes.of(204,"유저가 없습니다" ,list));
            }else{
                return ResponseEntity.status(200).body(UserAdminRes.of(200,"유저 리스트" ,list));
            }

        }catch (Exception e){
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 오류"));
        }
    }

    @PatchMapping()
    @ApiOperation(value = "유저 권한 변경")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> changeRole(@ApiParam(value = "유저 PK")@RequestParam int userPk,@ApiParam(value = "유저 권한(0 == 일반 유저, 1 == 인증 유저 , 2 == 중지 유저)")@RequestParam int role) {

        try{
            User user = userService.findByPk(userPk);

            if(user == null){
                return ResponseEntity.status(400).body(BaseResponseBody.of(400, "없는 유저"));
            }else{
                String message = userService.changeRole(user , role);
                if("권한없음".equals(message)){
                    return ResponseEntity.status(400).body(BaseResponseBody.of(400, message));
                }
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, message));
            }
        }catch (Exception e){
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "서버 오류"));
        }

    }




}
