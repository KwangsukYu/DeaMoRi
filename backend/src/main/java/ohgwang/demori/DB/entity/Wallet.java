package ohgwang.demori.DB.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

@Entity
@Data
@NoArgsConstructor
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    @Column(name = "wallet_pk")
    private int id;

    @Column(length = 10000)
    private String address;

    @OneToOne
    @JoinColumn(name = "user_pk",unique = true)
    private User user;

//    @OneToMany(mappedBy = "from")
//    private List<Transaction> from = new ArrayList<>();
//
//    @OneToMany(mappedBy = "to")
//    private List<Transaction> to = new ArrayList<>();


}

