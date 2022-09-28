package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.CheerRegisterPostReq;
import ohgwang.demori.api.request.SupportRegisterPostReq;

import java.io.IOException;

public interface TransactionService {
    void registerSupport(SupportRegisterPostReq supportReq, User user) throws IOException;

    void registerCheer(CheerRegisterPostReq cheerReq, User user) throws IOException;
}
