package ohgwang.demori.DB.repository;

import ohgwang.demori.DB.entity.League;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeagueRepository extends JpaRepository<League, Integer> {



}
