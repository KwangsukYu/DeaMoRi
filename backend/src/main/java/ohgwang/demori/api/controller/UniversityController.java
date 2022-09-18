package ohgwang.demori.api.controller;

import io.swagger.annotations.*;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.response.AddressRes;
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

@Api(value = "대학 API" , tags = {"univers"})
@RestController
@RequestMapping("/api/univers")
public class UniversityController {


    public static final Logger logger = LoggerFactory.getLogger(UniversityController.class);






}
