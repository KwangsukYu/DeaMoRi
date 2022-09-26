package ohgwang.demori.DB.entity.Image;

import lombok.Data;
import ohgwang.demori.DB.entity.User;

import javax.persistence.*;

@Entity
@Data
public class UniversityAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uni_auth_pk")
    private int id;

    String fileName;
    String fileUrl;

    @OneToOne(mappedBy = "universityAuth")
    User user;

}
