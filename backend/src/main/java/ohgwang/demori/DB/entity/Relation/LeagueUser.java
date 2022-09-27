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
public class LeagueUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uni_user_pk")
    private int id;

    private String supportName;
    private int supportBalance;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "league_id")
    private League league;



}
