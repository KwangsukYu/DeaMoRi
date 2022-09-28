package ohgwang.demori.DB.entity.Relation;

import lombok.Data;
import lombok.NoArgsConstructor;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.Team;
import ohgwang.demori.DB.entity.University;
import ohgwang.demori.DB.entity.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Support {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uni_user_pk")
    private int id;

    private String supportName;
    private int supportBalance;
    private String transactionHash;
    private String sendUniversity; // 0 , 1 0 = 1번째 대학 , 1 = 2번째 대학

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "league_id")
    private League league;

}
