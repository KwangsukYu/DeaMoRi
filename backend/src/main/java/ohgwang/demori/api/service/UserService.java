package ohgwang.demori.api.service;


import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.UserRegisterPostReq;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {

	User getUserByUserId(String userId);

	User createUser(UserRegisterPostReq registerInfo);

	void uploadAuthImage(MultipartFile file, User user) throws IOException;

    List<User> findAllUser();

	User findByPk(int userPk);

	String changeRole(User user, int role);

	User getUserByNickname(String nickName);
}
