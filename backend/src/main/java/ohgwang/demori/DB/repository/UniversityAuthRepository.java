package ohgwang.demori.DB.repository;

import ohgwang.demori.DB.entity.University;
import ohgwang.demori.DB.entity.UniversityAuth;
import ohgwang.demori.DB.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UniversityAuthRepository extends JpaRepository<UniversityAuth, Integer> {
    UniversityAuth findByUser(User user);
}
