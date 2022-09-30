package ohgwang.demori.DB.entity.Image;

import lombok.Data;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.University;

import javax.persistence.*;

@Entity
@Data
public class Trophy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trophy_pk")
    private int id;

    String fileUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "university_id")
    private University university;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "league_id")
    private League league;
}
