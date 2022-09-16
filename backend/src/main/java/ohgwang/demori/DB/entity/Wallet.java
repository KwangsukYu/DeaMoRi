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

    private String address;
    private String transactionHash;

    public void addTransactionHash(String hash){
        String addHash = this.transactionHash + "," + hash;
        this.transactionHash = addHash;
    }
    public List<String> getTransactionHashes(){
        StringTokenizer st = new StringTokenizer(this.transactionHash, ",");
        List<String> li = new ArrayList<>();
        while (st.hasMoreTokens()) {
            li.add(st.nextToken());
        }
        return li;
    }
}

