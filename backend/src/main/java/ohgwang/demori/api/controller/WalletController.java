package ohgwang.demori.api.controller;

import org.jetbrains.annotations.TestOnly;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthAccounts;
import org.web3j.protocol.core.methods.response.EthBlockNumber;
import org.web3j.protocol.http.HttpService;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
    Web3j web3j = Web3j.build(new HttpService());

    public EthBlockNumber getBlockNumber() throws Exception{  // 현재 블록 번호
        EthBlockNumber result = new EthBlockNumber();
        result = this.web3j.ethBlockNumber()
                .sendAsync()
                .get();
        return result;
    }

    public EthAccounts getEthAccounts() throws ExecutionException, InterruptedException {
        EthAccounts result = new EthAccounts();
        result = this.web3j.ethAccounts()
                .sendAsync()
                .get();
        return result;

    }

    @GetMapping()
    public String test() throws Exception {
        System.out.println("1 : " + getBlockNumber());
        System.out.println("2 : " + getBlockNumber().getBlockNumber());
        System.out.println("3 : " + getBlockNumber().getJsonrpc());
        System.out.println("------------------------------------------");
        System.out.println("1 : " + getEthAccounts());
        getEthAccounts().getAccounts().forEach(s -> System.out.println(s));
        System.out.println("2 : " + getEthAccounts().getJsonrpc());
        System.out.println("3 : " + getEthAccounts().getRawResponse());
        System.out.println(web3j.ethGetBalance(getEthAccounts().getAccounts().get(0), DefaultBlockParameterName.LATEST).send().getBalance());


        List<Type> inputParameters = Arrays.asList(new Uint8(1));
        List<TypeReference<?>> outputParameters = Arrays.asList(new TypeReference<Type>() {});
//
//        Transaction transaction = Transaction.createEtherTransaction();
//        web3j.ethSendTransaction()
        return "test";
    }


}
