package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.Relation.Support;
import ohgwang.demori.DB.entity.Transaction;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.DB.repository.LeagueRepository;
import ohgwang.demori.DB.repository.SupportRepository;
import ohgwang.demori.DB.repository.TransactionRepository;
import ohgwang.demori.api.request.SupportRegisterPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class SupportServiceImpl implements SupportService {

    private final Web3j web3j = Web3j.build(new HttpService());

    @Autowired
    LeagueRepository leagueRepository;

    @Autowired
    SupportRepository supportRepository;

    @Autowired
    TransactionRepository transactionRepository;

    public Map<String,String> inputCutting(String input){
        Map<String, String> map = new HashMap<>();
        map.put("sender","0x"+input.substring(34, 74));
        map.put("receiver","0x"+input.substring(98, 138));
        map.put("balance" , input.substring(138));


        return map;
    }

    @Override
    public void registerSupport(SupportRegisterPostReq supportReq, User user) throws IOException {
        Support support = new Support();
        support.setSupportName(supportReq.getSupportName());
        support.setTransactionHash(supportReq.getTransactionHash());
        support.setUser(user);
        support.setSendUniversity(supportReq.getSendUniversity());

        League league = leagueRepository.getById(Integer.parseInt(supportReq.getLeaguePk()));
        support.setLeague(league);

        org.web3j.protocol.core.methods.response.Transaction t = web3j.ethGetTransactionByHash(supportReq.getTransactionHash()).send().getTransaction().get();
        Map<String,String> map = inputCutting(t.getInput());
        support.setSupportBalance(Integer.parseInt(map.get("balance"),16));

        supportRepository.save(support);


        Transaction transaction = Transaction.builder()
                .blockHash(t.getBlockHash())
                .blockNumber(t.getBlockNumber().toString())
                .transactionHash(supportReq.getTransactionHash())
                .value(Integer.toString(Integer.parseInt(map.get("balance"),16)))
                .fromAddress(map.get("sender"))
                .toAddress(map.get("receiver"))
                .isRemit("1")
                .wallet(user.getWallet())
                .build();

        transactionRepository.save(transaction);



    }
}
