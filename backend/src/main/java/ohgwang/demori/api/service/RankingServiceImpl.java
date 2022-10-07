package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.University;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.DB.repository.UniversityRepository;
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
    @Autowired
    UniversityRepository universityRepository;

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

    @Override
    public Page<User> getUserRanking(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size).withSort(Sort.by("ranking")));
    }

    @Override
    public void updateUniversityRanking() {
        List<Integer> ranklist = universityRepository.getRank();
        List<University> universityList = universityRepository.findAllByOrderByDonationDesc();

        for(int i = 0 ; i < universityList.size() ; i++){
            University now = universityList.get(i);
            now.setRanking(ranklist.get(i));
        }

        universityRepository.saveAll(universityList);

    }

    @Override
    public Page<University> getUniversityRanking(int page, int size) {
        return universityRepository.findAll(PageRequest.of(page, size).withSort(Sort.by("ranking")));
    }
}
