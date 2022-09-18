package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.User;
import ohgwang.demori.DB.entity.Wallet;
import ohgwang.demori.api.response.TransactionRes;
import org.web3j.crypto.CipherException;

import java.io.IOException;
import java.util.List;

public interface WalletService {

    void registAddress(User user, String address);


    void requestEth(String address, int coin) throws Exception;

    List<TransactionRes> getTransactions(Wallet wallet, String isRemit);
}
