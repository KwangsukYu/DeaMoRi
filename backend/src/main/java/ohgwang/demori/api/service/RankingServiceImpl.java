package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.User;
import ohgwang.demori.DB.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankingServiceImpl implements RankingService {

    @Autowired
    UserRepository userRepository;

    @Override
    public void updateUserRanking() {
        List<Integer> ranklist = userRepository.getRank();
        List<User> userList = userRepository.findAllByOrderByDonationDesc();
        for(int i = 0 ; i < userList.size() ; i++){
            User now = userList.get(i);
            now.setRanking(ranklist.get(i));
        }
        userRepository.saveAll(userList);
    }
}
