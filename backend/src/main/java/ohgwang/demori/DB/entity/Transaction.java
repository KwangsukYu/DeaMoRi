package ohgwang.demori.DB.entity;

import lombok.Builder;
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
    private boolean isRemit;   // 송금여부 true 보내는 쪽, false 받는 쪽 트랜잭션

    @Builder
    public Transaction(String transactionHash, String blockHash, String blockNumber, String fromAddress, String toAddress, String gas, String value, boolean isRemit) {
        this.transactionHash = transactionHash;
        this.blockHash = blockHash;
        this.blockNumber = blockNumber;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.gas = gas;
        this.value = value;
        this.isRemit = isRemit;
    }
}

