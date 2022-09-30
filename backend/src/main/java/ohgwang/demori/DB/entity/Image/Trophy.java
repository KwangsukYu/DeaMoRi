package ohgwang.demori.DB.entity.Image;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Trophy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trophy_pk")
    private int id;

    String fileUrl;
}
