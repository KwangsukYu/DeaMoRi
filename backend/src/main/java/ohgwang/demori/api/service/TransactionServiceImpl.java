package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.*;
import ohgwang.demori.DB.entity.Image.Badge;
import ohgwang.demori.DB.entity.Image.Trophy;
import ohgwang.demori.DB.entity.Relation.Cheer;
import ohgwang.demori.DB.entity.Relation.Support;
import ohgwang.demori.DB.entity.Relation.UserBadge;
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

    private final Web3j web3j = Web3j.build(new HttpService("https://j7c208.p.ssafy.io/blockchain"));

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

    @Autowired
    BadgeRepository badgeRepository;

    @Autowired
    UserBadgeRepository userBadgeRepository;

    public Map<String,String> inputCutting(String input){
        Map<String, String> map = new HashMap<>();
        map.put("sender","0x"+input.substring(34, 74).toLowerCase());
        map.put("receiver","0x"+input.substring(98, 138).toLowerCase());
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

    public int badgeCheck(int balance){
        if(balance > 1000000){
            return 5;
        }else if(balance > 500000){
            return 4;
        }else if(balance > 100000){
            return 3;
        }else if(balance > 10000){
            return 2;
        }else{
            return 1;
        }

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
        Badge b = badgeRepository.getById(badgeCheck(user.getDonation()));

        if(!b.getFileUrl().equals(user.getBadge())){  // 둘이 다르면 교체 후에 새 뱃지 리스트 추가
            user.setBadge(b.getFileUrl());

            UserBadge userBadge = new UserBadge();
            userBadge.setUser(user);
            userBadge.setBadge(b);


            userBadgeRepository.save(userBadge);
        }


        userRepository.save(user);


    }

    @Override
    public void endLeague(League league, LeaguePatchReq leagueReq) throws IOException {

        org.web3j.protocol.core.methods.response.Transaction t = web3j.ethGetTransactionByHash(leagueReq.getTransactionHash()).send().getTransaction().get();
        Map<String, String> map = new HashMap<>();
        map.put("sender",t.getTo());
        map.put("receiver",t.getFrom());
        map.put("balance" , t.getValue().toString());


        saveTransaction(t,leagueReq.getTransactionHash(),map,walletRepository.findByAddress(map.get("receiver")),"0");   // 받는 사람 지갑에 트랜션 저장



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

        Map<String, String> map = new HashMap<>();
        map.put("receiver","0x"+t.getInput().substring(34, 74).toLowerCase());
        map.put("balance",t.getInput().substring(98, 138));


        System.out.println(t.getInput().substring(98, 138));

        // 충전할때는 input에 보내는 사람 주소가 빠져서 한칸 땡겨짐
        Transaction transaction = Transaction.builder()
                .blockHash(t.getBlockHash())
                .blockNumber(t.getBlockNumber().toString())
                .transactionHash(transactionHash)
                .value(Integer.toString(Integer.parseInt(map.get("balance"),16)))
                .fromAddress("0x38994da194bb27f0901f4c9e030ebecfa3115b45")
                .toAddress(map.get("receiver"))
                .isRemit("0")
                .wallet(walletRepository.findByAddress(map.get("receiver")))
                .build();

        transactionRepository.save(transaction);

    }


}
