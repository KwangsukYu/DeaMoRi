package ohgwang.demori.DB.repository;

import ohgwang.demori.DB.entity.Relation.Cheer;
import ohgwang.demori.DB.entity.Relation.Support;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheerRepository extends JpaRepository<Cheer, Integer> {



}
