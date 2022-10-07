package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.CheerRegisterPostReq;
import ohgwang.demori.api.request.LeaguePatchReq;
import ohgwang.demori.api.request.SupportRegisterPostReq;

import java.io.IOException;

public interface TransactionService {
    void registerSupport(SupportRegisterPostReq supportReq, User user) throws IOException;

    void registerCheer(CheerRegisterPostReq cheerReq, User user) throws IOException;


    void endLeague(League league, LeaguePatchReq leagueReq) throws IOException;

    void chargeCoin(String transactionHash) throws IOException;
}
