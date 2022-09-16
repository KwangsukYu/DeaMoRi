package ohgwang.demori.api.controller;

import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.UserRegisterPostReq;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.jetbrains.annotations.TestOnly;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthAccounts;
import org.web3j.protocol.core.methods.response.EthBlockNumber;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.Transfer;
import org.web3j.utils.Convert;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
    Web3j web3j = Web3j.build(new HttpService());

    @PostMapping()
    public ResponseEntity<? extends BaseResponseBody> registWallet(
            Authentication authentication, @RequestBody String address) {



        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
    }


}
