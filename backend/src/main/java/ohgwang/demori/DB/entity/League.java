package ohgwang.demori.DB.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ohgwang.demori.DB.entity.Relation.Cheer;
import ohgwang.demori.DB.entity.Relation.Support;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@ToString
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
    private int isBroadcast;
    private String status; // 0 = 대회 준비, 1 = 대회시작 , 2 = 대회 종료
    private String contractAddress;
    private String posterURL;

    private int OriginalWinning;

    private int allDonation;
    private int teamOneDonation;
    private int teamTwoDonation;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team1")
    private Team team1;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team2")
    private Team team2;

    @OneToMany(mappedBy = "league" , fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<Support> supports = new ArrayList<>();

    @OneToMany(mappedBy = "league" , fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<Cheer> cheers = new ArrayList<>();


}
