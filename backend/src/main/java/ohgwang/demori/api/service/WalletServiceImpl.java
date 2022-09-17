package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.User;
import ohgwang.demori.DB.entity.Wallet;
import ohgwang.demori.DB.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

@Service
public class WalletServiceImpl implements WalletService{

    private final Web3j web3j = Web3j.build(new HttpService());

    @Autowired
    WalletRepository walletRepository;

    @Override
    public void registAddress(User user, String address) {
        Wallet wallet = walletRepository.findByUser(user);
        if(wallet == null){
            wallet = new Wallet();
            wallet.setAddress(address);
            wallet.setUser(user);
        }else{
            wallet.setAddress(address);
        }
        walletRepository.save(wallet);

    }


}
