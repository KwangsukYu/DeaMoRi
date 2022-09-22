package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.UniversityAuth;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.DB.repository.UniversityAuthRepository;
import ohgwang.demori.DB.repository.UserRepository;
import ohgwang.demori.api.request.UserRegisterPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service("userService")
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
    PasswordEncoder passwordEncoder;

	@Autowired
	S3Service s3Service;

	@Autowired
	UniversityAuthRepository universityAuthRepository;

	@Override
	public User getUserByUserId(String userId) {
		// TODO Auto-generated method stub
		User user = userRepository.findByUserId(userId);
		if(user != null) {
			return user;
		}else {
			return null;
		}
	}


	@Override
	public User createUser(UserRegisterPostReq registerInfo) {
		// TODO Auto-generated method stub
		User user = new User();
		if (registerInfo.getPassword().length()<4) {
			return user;
		}

		user.setUserId(registerInfo.getUserId());
		user.setUsername(registerInfo.getUserName());
		user.setRole("ROLE_USER");
		user.setPassword(passwordEncoder.encode(registerInfo.getPassword()));
		
		return userRepository.save(user);
	}

	@Override
	public void uploadAuthImage(MultipartFile file , User user) throws IOException {
		UniversityAuth uniAuth = universityAuthRepository.findByUser(user);

		if(uniAuth != null){ // 이미 파일이 있으면 파일 삭제 후 재 업로드
			s3Service.delete(uniAuth.getFileName());
		} else{
			uniAuth = new UniversityAuth();
		}

		Map<String, String> map = s3Service.upload(file, "A");

		String fileName = map.get("fileName");
		String fileUrl = map.get("fileUrl");


		uniAuth.setFileName(fileName);
		uniAuth.setFileUrl(fileUrl);
		uniAuth.setUser(user);

		universityAuthRepository.save(uniAuth);
	}

	@Override
	public List<User> findAllUser() {
		return userRepository.findAll();
	}


}
