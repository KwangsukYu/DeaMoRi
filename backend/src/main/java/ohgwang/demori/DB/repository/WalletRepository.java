package ohgwang.demori.DB.repository;

import ohgwang.demori.DB.entity.User;
import ohgwang.demori.DB.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Integer> {

    Wallet findByUser(User user);
}

