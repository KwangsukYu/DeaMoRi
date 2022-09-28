package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.Relation.Cheer;
import ohgwang.demori.DB.entity.Relation.Support;
import ohgwang.demori.DB.entity.Transaction;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.DB.entity.Wallet;
import ohgwang.demori.DB.repository.*;
import ohgwang.demori.api.request.CheerRegisterPostReq;
import ohgwang.demori.api.request.SupportRegisterPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final Web3j web3j = Web3j.build(new HttpService());

    @Autowired
    LeagueRepository leagueRepository;

    @Autowired
    SupportRepository supportRepository;

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    CheerRepository cheerRepository;

    @Autowired
    WalletRepository  walletRepository;

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

    @Override
    public void registerCheer(CheerRegisterPostReq cheerReq, User user) throws IOException {
        Cheer cheer = new Cheer();
        cheer.setCheertName(cheerReq.getSupportName());
        cheer.setContent(cheerReq.getContent());
        cheer.setSendTeam(cheerReq.getSendTeam());
        cheer.setTransactionHash(cheer.getTransactionHash());
        cheer.setUser(user);

        League league = leagueRepository.getById(Integer.parseInt(cheerReq.getLeaguePk()));
        cheer.setLeague(league);

        org.web3j.protocol.core.methods.response.Transaction t = web3j.ethGetTransactionByHash(cheerReq.getTransactionHash()).send().getTransaction().get();
        Map<String,String> map = inputCutting(t.getInput());
        cheer.setCheerBalance(Integer.parseInt(map.get("balance"),16));

        cheerRepository.save(cheer);

        Transaction transaction1 = Transaction.builder()    // 보내는 사람 지갑에 트랜션 저장
                .blockHash(t.getBlockHash())
                .blockNumber(t.getBlockNumber().toString())
                .transactionHash(cheerReq.getTransactionHash())
                .value(Integer.toString(Integer.parseInt(map.get("balance"),16)))
                .fromAddress(map.get("sender"))
                .toAddress(map.get("receiver"))
                .isRemit("1")
                .wallet(user.getWallet())
                .build();

        transactionRepository.save(transaction1);


        Transaction transaction0 = Transaction.builder()   // 받는 사람 지갑에 트랜션 저장
                .blockHash(t.getBlockHash())
                .blockNumber(t.getBlockNumber().toString())
                .transactionHash(cheerReq.getTransactionHash())
                .value(Integer.toString(Integer.parseInt(map.get("balance"),16)))
                .fromAddress(map.get("sender"))
                .toAddress(map.get("receiver"))
                .isRemit("0")
                .wallet( walletRepository.findByAddress(map.get("receiver")))
                .build();

        transactionRepository.save(transaction0);

    }
}
