package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.User;
import org.web3j.crypto.CipherException;

import java.io.IOException;

public interface WalletService {

    void registAddress(User user, String address);


    void requestEth(String address, int coin) throws Exception;
}
