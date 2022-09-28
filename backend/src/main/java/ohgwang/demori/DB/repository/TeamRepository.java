package ohgwang.demori.DB.repository;

import ohgwang.demori.DB.entity.Team;
import ohgwang.demori.DB.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {



}
