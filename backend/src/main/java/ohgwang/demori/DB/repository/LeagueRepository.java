package ohgwang.demori.DB.repository;

import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeagueRepository extends JpaRepository<League, Integer> {

    Page<League> findAllByLeagueId(String leagueId, Pageable pageable);

}
