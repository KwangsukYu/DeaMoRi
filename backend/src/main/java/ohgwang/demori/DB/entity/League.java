package ohgwang.demori.DB.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class League {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "league_pk")
    private int id;

    private String leagueId;
    private LocalDateTime leagueStartDatetime;
    private LocalDateTime leagueEndDatetime;
    private LocalDateTime sponStartDatetime;
    private String location;
    private boolean isBroadcast;
    private int live;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team1")
    private Team team1;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team2")
    private Team team2;

}
