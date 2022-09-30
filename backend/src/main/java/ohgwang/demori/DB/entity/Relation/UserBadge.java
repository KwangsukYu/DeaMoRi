package ohgwang.demori.DB.entity.Relation;

import lombok.Data;
import lombok.NoArgsConstructor;
import ohgwang.demori.DB.entity.Image.Badge;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.User;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class UserBadge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "badge_user_pk")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "badge_id")
    private Badge badge;

}
