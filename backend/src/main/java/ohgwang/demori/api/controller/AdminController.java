package ohgwang.demori.api.controller;

import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.UserLoginPostReq;
import ohgwang.demori.api.response.UserLoginPostRes;
import ohgwang.demori.api.service.UserService;
import ohgwang.demori.common.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {




}
