package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.*;
import ohgwang.demori.DB.entity.Relation.UniversityLeague;
import ohgwang.demori.DB.repository.TransactionRepository;
import ohgwang.demori.DB.repository.UniversityLeagueRepository;
import ohgwang.demori.DB.repository.UniversityRepository;
import ohgwang.demori.DB.repository.WalletRepository;
import ohgwang.demori.api.response.UniversityRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.Transfer;
import org.web3j.utils.Convert;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class UniversityServiceImpl implements UniversityService{

    @Autowired
    UniversityRepository universityRepository;

    @Autowired
    UniversityLeagueRepository  universityLeagueRepository;

    @Override
    public List<UniversityRes> getUniversities() {
        List<University> l = null;
        l = universityRepository.findAll();

        if(l == null){
            return null;
        }
        List<UniversityRes> universityRes = new ArrayList<>();
        for(University u : l){
            universityRes.add(UniversityRes.of(u));
        }

        return universityRes;
    }

    @Override
    public List<UniversityRes> searchUniversities(String search) {
        List<University> list = universityRepository.findByUniNameContaining(search);

        if(list == null){
            return null;
        }

        List<UniversityRes> universityRes = new ArrayList<>();
        for(University u : list){
            universityRes.add(UniversityRes.of(u));
        }

        return universityRes;
    }

    @Override
    public University getUniversity(String id) {
        return universityRepository.getById(Integer.parseInt(id));
    }

    @Override
    public University getUniversityByName(String universityName) {
        return universityRepository.getByUniName(universityName);
    }

    @Override
    @Transactional
    public List<League> findUniversityLeague(University u) {
        List<UniversityLeague> universityLeagues = universityLeagueRepository.findByUniversity(u);
        if(universityLeagues == null) return null;

        List<League> leagues = new ArrayList<>();
        for(UniversityLeague ul : universityLeagues){
            leagues.add(ul.getLeague());
        }


        return leagues;
    }
}
