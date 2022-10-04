package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.*;
import ohgwang.demori.DB.entity.Image.Trophy;
import ohgwang.demori.DB.entity.Relation.Cheer;
import ohgwang.demori.DB.entity.Relation.Support;
import ohgwang.demori.DB.repository.*;
import ohgwang.demori.api.request.CheerRegisterPostReq;
import ohgwang.demori.api.request.LeaguePatchReq;
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

    private final Web3j web3j = Web3j.build(new HttpService("http://j7c2081.p.ssafy.io:8545"));

    @Autowired
    LeagueRepository leagueRepository;

    @Autowired
    SupportRepository supportRepository;

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CheerRepository cheerRepository;

    @Autowired
    WalletRepository  walletRepository;

    @Autowired
    TrophyRepository trophyRepository;

    @Autowired
    UniversityRepository universityRepository;

    public Map<String,String> inputCutting(String input){
        Map<String, String> map = new HashMap<>();
        map.put("sender","0x"+input.substring(34, 74));
        map.put("receiver","0x"+input.substring(98, 138));
        map.put("balance" , input.substring(138));


        return map;
    }

    public void saveTransaction(org.web3j.protocol.core.methods.response.Transaction t , String transactionHash, Map<String, String> map, Wallet wallet, String isRemit){
        Transaction transaction = Transaction.builder()
                .blockHash(t.getBlockHash())
                .blockNumber(t.getBlockNumber().toString())
                .transactionHash(transactionHash)
                .value(Integer.toString(Integer.parseInt(map.get("balance"),16)))
                .fromAddress(map.get("sender"))
                .toAddress(map.get("receiver"))
                .isRemit(isRemit)
                .wallet(wallet)
                .build();

        transactionRepository.save(transaction);

    }


    @Override
    public void registerSupport(SupportRegisterPostReq supportReq, User user) throws IOException {
        League league = leagueRepository.getById(Integer.parseInt(supportReq.getLeaguePk()));
        org.web3j.protocol.core.methods.response.Transaction t = web3j.ethGetTransactionByHash(supportReq.getTransactionHash()).send().getTransaction().get();
        Map<String,String> map = inputCutting(t.getInput());

        Support support = new Support();
        support.setSupportName(supportReq.getSupportName());
        support.setTransactionHash(supportReq.getTransactionHash());
        support.setUser(user);
        support.setSendUniversity(supportReq.getSendUniversity());
        support.setLeague(league);
        support.setSupportBalance(Integer.parseInt(map.get("balance"),16));


        if(supportReq.getSendUniversity().equals("0")){
            league.setTeamOneDonation(league.getTeamOneDonation() + Integer.parseInt(map.get("balance"),16));
        }else{
            league.setTeamTwoDonation(league.getTeamTwoDonation() + Integer.parseInt(map.get("balance"),16));
        }
        league.setAllDonation(league.getAllDonation() + Integer.parseInt(map.get("balance"),16));

        leagueRepository.save(league); // 대회에 후원금 갱신
        supportRepository.save(support);    // 후원 내역 저장

        saveTransaction(t,supportReq.getTransactionHash(),map,user.getWallet(),"1");  // 트랜잭선 저장

        user.setDonation(user.getDonation() + Integer.parseInt(map.get("balance"),16));
        userRepository.save(user);



    }

    @Override
    public void registerCheer(CheerRegisterPostReq cheerReq, User user) throws IOException {
        League league = leagueRepository.getById(Integer.parseInt(cheerReq.getLeaguePk()));
        org.web3j.protocol.core.methods.response.Transaction t = web3j.ethGetTransactionByHash(cheerReq.getTransactionHash()).send().getTransaction().get();
        Map<String,String> map = inputCutting(t.getInput());

        Cheer cheer = new Cheer();
        cheer.setCheertName(cheerReq.getSupportName());
        cheer.setContent(cheerReq.getContent());
        cheer.setSendTeam(cheerReq.getSendTeam());
        cheer.setTransactionHash(cheer.getTransactionHash());
        cheer.setUser(user);
        cheer.setLeague(league);
        cheer.setCheerBalance(Integer.parseInt(map.get("balance"),16));
        cheerRepository.save(cheer);

        saveTransaction(t,cheerReq.getTransactionHash(),map,user.getWallet(),"1");   // 보내는 사람 지갑에 트랜션 저장

        saveTransaction(t,cheerReq.getTransactionHash(),map,walletRepository.findByAddress(map.get("receiver")),"0");   // 받는 사람 지갑에 트랜션 저장


        user.setDonation(user.getDonation() + Integer.parseInt(map.get("balance"),16));
        userRepository.save(user);


    }

    @Override
    public void endLeague(League league, LeaguePatchReq leagueReq) throws IOException {

        Transaction transaction = Transaction.builder()
                .blockHash("")
                .blockNumber("")
                .transactionHash("")
                .value(Integer.toString(Integer.parseInt(leagueReq.getValue().substring(5),16)))
                .fromAddress(leagueReq.getFromAddress().substring(26))
                .toAddress(leagueReq.getToAddress().substring(26))
                .isRemit("0")
                .wallet(walletRepository.findByAddress(leagueReq.getFromAddress().substring(26)))
                .build();

        transactionRepository.save(transaction);


        Trophy trophy = new Trophy();  // 트로피
        trophy.setFileUrl(leagueReq.getTrophyUrl());
        University teamOneUniversity = league.getTeam1().getUniversity();
        University teamTwoUniversity = league.getTeam2().getUniversity();
        if(leagueReq.getWinner().equals("0")){
            trophy.setUniversity(teamOneUniversity);
        }else{
            trophy.setUniversity(teamTwoUniversity);
        }
        trophy.setLeague(league);
        trophyRepository.save(trophy);


        teamOneUniversity.setDonation(teamOneUniversity.getDonation() + league.getTeamOneDonation()); // 후원금 정산
        teamTwoUniversity.setDonation(teamTwoUniversity.getDonation() + league.getTeamTwoDonation());

        universityRepository.save(teamOneUniversity);
        universityRepository.save(teamTwoUniversity);


    }

    @Override
    public void chargeCoin(String transactionHash) throws IOException {
        org.web3j.protocol.core.methods.response.Transaction t = web3j.ethGetTransactionByHash(transactionHash).send().getTransaction().get();
        Map<String,String> map = inputCutting(t.getInput());
        saveTransaction(t,transactionHash,map,walletRepository.findByAddress(map.get("receiver")),"0");   // 받는 사람 지갑에 트랜션 저장

    }


}
