package ohgwang.demori.api.controller;

import io.swagger.annotations.*;
import jnr.ffi.Address;
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

@Api(value = "지갑 API" , tags = {"wallet"})
@RestController
@RequestMapping("/api/wallet")
public class WalletController {

    final private String SUCCESS = "SUCCESS";
    final private String FAIL = "FAIL";

    public static final Logger logger = LoggerFactory.getLogger(WalletController.class);


    @Autowired
    WalletService walletService;

    @Autowired
    private UserService userService;

    @PostMapping()
    @ApiOperation(value = "지갑 등록", notes = "지갑 주소를 DB에 저장, 주소가 이미 있을 경우 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerAddress(
            @ApiIgnore Authentication authentication, @RequestParam @ApiParam(value = "지갑 주소", required = true) String address) {
        try {
            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            String userId = userDetails.getUsername();
            User user = userService.getUserByUserId(userId);
            walletService.registAddress(user, address);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, FAIL));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, SUCCESS));
    }


    @GetMapping
    @ApiOperation(value = "유저 지갑주소", notes = "해당 계정의 지갑 주소를 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 204, message = "지갑 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<AddressRes> getAddress(
            @ApiIgnore Authentication authentication) {
        String address = null;
        try {
            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            String userId = userDetails.getUsername();
            User user = userService.getUserByUserId(userId);
            address = user.getWallet().getAddress();


        } catch (Exception e) {
            return ResponseEntity.status(500).body(AddressRes.of(500, FAIL, null));
        }

        if (address == null) {
            return ResponseEntity.status(204).body(AddressRes.of(204, "지갑이 없습니다", null));
        } else {
            return ResponseEntity.status(200).body(AddressRes.of(200, SUCCESS, address));
        }

    }








}
