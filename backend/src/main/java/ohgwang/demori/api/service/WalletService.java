package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.User;

public interface WalletService {

    void registWallet(User user, String address);

}
