package ohgwang.demori.DB.repository;

import ohgwang.demori.DB.entity.Image.Badge;
import ohgwang.demori.DB.entity.Relation.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBadgeRepository extends JpaRepository<UserBadge, Integer> {



}
