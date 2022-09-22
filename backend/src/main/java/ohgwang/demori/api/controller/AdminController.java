package ohgwang.demori.api.controller;

import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.UserRegisterPostReq;
import ohgwang.demori.api.response.UserAdminRes;
import ohgwang.demori.api.response.UserRes;
import ohgwang.demori.api.service.UserService;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    UserService userService;


    @PostMapping()
    public ResponseEntity<List<UserAdminRes>> getUsers() {
        List<User> list = userService.findAllUser();

        List<UserAdminRes> adminList = new ArrayList<>();
        for(User u : list){
            adminList.add(UserAdminRes.of(u));
        }
        return ResponseEntity.status(200).body(adminList);
    }



}
