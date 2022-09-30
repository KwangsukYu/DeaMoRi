package ohgwang.demori.DB.repository;

import ohgwang.demori.DB.entity.Image.Badge;
import ohgwang.demori.DB.entity.Image.Trophy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrophyRepository extends JpaRepository<Trophy, Integer> {



}
