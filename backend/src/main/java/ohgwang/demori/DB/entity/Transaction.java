package ohgwang.demori.DB.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

@Entity
@Data
@NoArgsConstructor
public class Transaction { //

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    @Column(name = "t_pk")
    private int id;
    //From, To, 블록해쉬, 블록넘버, 트랜잭션 해쉬, 사용 가스, 사용 금액

    private String transactionHash;
    private String blockHash;
    private String blockNumber;
    private String fromAddress;
    private String toAddress;
    private String gas;
    private String value;


    //
//    @ManyToOne
//    @JoinColumn(name = "from_wallet_pk")
//    Wallet from;
//
//    @ManyToOne
//    @JoinColumn(name = "to_wallet_pk")
//    Wallet to;
//


}

