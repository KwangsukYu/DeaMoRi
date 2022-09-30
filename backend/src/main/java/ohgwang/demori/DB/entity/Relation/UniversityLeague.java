package ohgwang.demori.DB.entity.Relation;

import lombok.Data;
import lombok.NoArgsConstructor;
import ohgwang.demori.DB.entity.League;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class UniversityLeague {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uni_league_pk")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "league_id")
    private League league;





}
