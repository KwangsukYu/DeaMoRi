package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.Transaction;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.DB.entity.Wallet;
import ohgwang.demori.DB.repository.TransactionRepository;
import ohgwang.demori.DB.repository.UserRepository;
import ohgwang.demori.DB.repository.WalletRepository;
import ohgwang.demori.api.response.TransactionRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.EthTransaction;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.Transfer;
import org.web3j.utils.Convert;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class WalletServiceImpl implements WalletService {

    private final Web3j web3j = Web3j.build(new HttpService("http://j7c2081.p.ssafy.io:8545"));

    @Autowired
    WalletRepository walletRepository;

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public void registAddress(User user, String address) {
        Wallet wallet = walletRepository.findByUser(user);
        if (wallet == null) {
            wallet = new Wallet();
            wallet.setAddress(address);
            wallet.setUser(user);
        } else {
            wallet.setAddress(address);
        }
        walletRepository.save(wallet);
        user.setWallet(wallet);

        userRepository.save(user);

    }


    @Override
    public void requestEth(String address, int coin) throws Exception {
        // local용 절대 경로 나중에 상대 경로로 변경, admin.wallet = 관리자 지갑
        Credentials credentials = WalletUtils.loadCredentials("1234", "C:\\Users\\multicampus\\Desktop\\project\\blockchain\\account\\admin.wallet");
        Transfer transfer = new Transfer(web3j, new RawTransactionManager(web3j, credentials, web3j.ethChainId().send().getChainId().longValue()));
        TransactionReceipt transactionReceipt = transfer.sendFunds(address, BigDecimal.valueOf(coin), Convert.Unit.WEI).sendAsync().get(); // 15초 소모
        org.web3j.protocol.core.methods.response.Transaction t = web3j.ethGetTransactionByHash(transactionReceipt.getTransactionHash()).send().getTransaction().get();

        Transaction transaction = Transaction.builder()
                .blockHash(t.getBlockHash())
                .blockNumber(t.getBlockNumber().toString())
                .transactionHash(transactionReceipt.getTransactionHash())
                .value(t.getValue().toString())
                .fromAddress(t.getFrom())
                .toAddress(t.getTo())
                .isRemit("0")
                .wallet(walletRepository.findByAddress(address))
                .build();

        transactionRepository.save(transaction);
    }

    @Override
    public List<TransactionRes> getTransactions(Wallet wallet, String isRemit) {
        List<TransactionRes> list = new ArrayList<>();
        if(isRemit == null){
            for(Transaction t : wallet.getTransactions()){
                list.add(TransactionRes.of(t));
            }
        }else{
            for(Transaction t : wallet.getTransactions()){
                if(t.getIsRemit().equals(isRemit)) {
                    list.add(TransactionRes.of(t));
                }
            }
        }

        return list;
    }
}

