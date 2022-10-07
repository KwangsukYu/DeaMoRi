package ohgwang.demori.api.response;

import lombok.Data;
import ohgwang.demori.DB.entity.Transaction;

@Data
public class TransactionRes {

    private String transactionHash;
    private String blockHash;
    private String blockNumber;
    private String fromAddress;
    private String toAddress;
    private String value;
    private String isRemit;   // 송금여부 true 보내는 쪽, false 받는 쪽 트랜잭션

    public static TransactionRes of(Transaction transaction) {
        TransactionRes TransR = new TransactionRes();
        TransR.setBlockHash(transaction.getBlockHash());
        TransR.setBlockNumber(transaction.getBlockNumber());
        TransR.setTransactionHash(transaction.getTransactionHash());
        TransR.setFromAddress(transaction.getFromAddress());
        TransR.setToAddress(transaction.getToAddress());
        TransR.setValue(transaction.getValue());
        TransR.setIsRemit(transaction.getIsRemit());
        return TransR;
    }
}
