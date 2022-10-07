package ohgwang.demori.DB.entity.Relation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.User;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Cheer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cheer_pk")
    private int id;

    private String cheertName;
    private int cheerBalance;
    private String content;
    private String transactionHash;
    private String sendTeam; // 0 , 1 0 = 1번째 팀 , 1 = 2번째 팀

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "league_id")
    private League league;

}
