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

    private final Web3j web3j = Web3j.build(new HttpService("https://j7c2081.p.ssafy.io/blockchain"));

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
            wallet.setAddress(address.toLowerCase());
            wallet.setUser(user);
        } else {
            wallet.setAddress(address.toLowerCase());
        }
        walletRepository.save(wallet);
        user.setWallet(wallet);

        userRepository.save(user);

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

