package ohgwang.demori.api.service;


import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.UserRegisterPostReq;

public interface UserService {

	User getUserByUserId(String userId);

	User createUser(UserRegisterPostReq registerInfo);
}
