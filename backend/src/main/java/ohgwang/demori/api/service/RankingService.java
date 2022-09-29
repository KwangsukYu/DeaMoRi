package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.User;
import org.springframework.data.domain.Page;

public interface RankingService {
    void updateUserRanking();

    Page<User> getUserRanking(int page, int size);
}
