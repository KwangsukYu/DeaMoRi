package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.SupportRegisterPostReq;

import java.io.IOException;

public interface SupportService {
    void registerSupport(SupportRegisterPostReq supportReq, User user) throws IOException;
}
