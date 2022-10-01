package ohgwang.demori.DB.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import ohgwang.demori.DB.entity.Image.Trophy;
import ohgwang.demori.DB.entity.Relation.Cheer;
import ohgwang.demori.DB.entity.Relation.UniversityLeague;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class University {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    @Column(name = "t_pk")
    private int id;

    private String uniName;
    private String homepage;
    private String uniAddress;
    private String logoUrl;

    private int donation;
    private int ranking;

    @OneToMany(mappedBy = "university" , fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<Trophy> trophyList = new ArrayList<>();

    @OneToMany(mappedBy = "university" , fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<UniversityLeague> universityList = new ArrayList<>();

    @OneToMany(mappedBy = "university" , fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<User> userList = new ArrayList<>();



}
