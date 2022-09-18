package ohgwang.demori.DB.repository;

import ohgwang.demori.DB.entity.Transaction;
import ohgwang.demori.DB.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversityRepository extends JpaRepository<University, Integer> {
}
