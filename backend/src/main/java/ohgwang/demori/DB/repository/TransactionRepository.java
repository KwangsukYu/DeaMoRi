package ohgwang.demori.DB.repository;

import ohgwang.demori.DB.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
}
