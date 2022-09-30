package ohgwang.demori.DB.repository;

import ohgwang.demori.DB.entity.Image.Badge;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.Relation.UniversityLeague;
import ohgwang.demori.DB.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UniversityLeagueRepository extends JpaRepository<UniversityLeague, Integer> {
    List<UniversityLeague> findByUniversity(University u);
}
