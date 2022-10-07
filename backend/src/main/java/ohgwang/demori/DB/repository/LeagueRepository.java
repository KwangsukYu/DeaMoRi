package ohgwang.demori.DB.repository;

import ohgwang.demori.DB.entity.League;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeagueRepository extends JpaRepository<League, Integer> {

    Page<League> findAllByStatusIsNotContaining(String status, Pageable pageable);
    Page<League> findAllByLeagueIdContainingAndStatusIsNotContaining(String leagueId,String status, Pageable pageable);

    Page<League> findAllByStatus(String status, Pageable pageable);
    Page<League> findAllByLeagueIdContainingAndStatusIs(String leagueId,String status, Pageable pageable);

}
