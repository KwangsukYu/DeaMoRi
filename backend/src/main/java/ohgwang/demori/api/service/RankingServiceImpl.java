package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.User;
import ohgwang.demori.DB.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankingServiceImpl implements RankingService {

    @Autowired
    UserRepository userRepository;

    @Override
    public void updateUserRanking() {
        List<Integer> ranklist = userRepository.getRank();
        System.out.println(1);
        List<User> userList = userRepository.findAllByOrderByDonationDesc();
        System.out.println(2);
        for(int i = 0 ; i < userList.size() ; i++){
            User now = userList.get(i);
            now.setRanking(ranklist.get(i));
        }
        System.out.println(3);
        userRepository.saveAll(userList);
        System.out.println(4);
    }

    @Override
    public Page<User> getUserRanking(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size).withSort(Sort.by("ranking")));
    }
}
