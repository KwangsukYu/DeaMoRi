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

    @OneToOne(mappedBy = "wallet", fetch = FetchType.LAZY)
    private User user;

    @OneToMany(mappedBy = "wallet" , fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<Transaction> transactions = new ArrayList<>();


    @Override
    public String toString() {
        return "Wallet{" +
                "id=" + id +
                ", address='" + address + '\'' +
                ", user=" + user +
                ", transactions=" + transactions +
                '}';
    }

}

