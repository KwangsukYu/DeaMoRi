package ohgwang.demori.DB.entity.Image;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "badge_pk")
    private int id;

    String fileName;
    String fileUrl;
}
