package ohgwang.demori.DB.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

}
