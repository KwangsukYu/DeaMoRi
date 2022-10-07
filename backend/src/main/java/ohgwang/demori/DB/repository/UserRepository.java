package ohgwang.demori.DB.repository;

import ohgwang.demori.DB.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUserId(String userId);

    User findByNickName(String nickName);

    @Query(value = "SELECT rank() over (order by u.donation desc) from user u", nativeQuery = true)
    List<Integer> getRank();

    List<User> findAllByOrderByDonationDesc();

    Page<User> findAll(Pageable pageable);

    User findByWallet_Address(String walletAddress);

}

