package ohgwang.demori.api.service;


import ohgwang.demori.DB.entity.User;
import ohgwang.demori.api.request.UserRegisterPostReq;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {

	User getUserByUserId(String userId);

	User createUser(UserRegisterPostReq registerInfo);

	void uploadAuthImage(MultipartFile file, User user) throws IOException;
}
