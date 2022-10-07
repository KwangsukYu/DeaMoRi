package ohgwang.demori.DB.repository;

import ohgwang.demori.DB.entity.Transaction;
import ohgwang.demori.DB.entity.University;
import ohgwang.demori.DB.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UniversityRepository extends JpaRepository<University, Integer> {
    List<University> findByUniNameContaining(String search);

    University getByUniName(String univesityName);

    @Query(value = "SELECT rank() over (order by u.donation desc) from university u",
            nativeQuery = true)
    List<Integer> getRank();

    List<University> findAllByOrderByDonationDesc();

    Page<University> findAll(Pageable pageable);
}
