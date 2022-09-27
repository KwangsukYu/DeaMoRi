package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.Image.UniversityAuth;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.DB.repository.BadgeRepository;
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

	@Autowired
	BadgeRepository badgeRepository;

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
		user.setNickName(registerInfo.getNickName());
		user.setBadge(badgeRepository.getById(1).getFileUrl());
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

	@Override
	public User findByPk(int userPk) {
		return userRepository.findById(userPk).orElse(null);
	}

	@Override
	public String changeRole(User user, int role) {
		String r = null;
		switch (role){
			case 0 :
				r = "ROLE_USER";
				break;
			case 1 :
				r = "ROLE_AUTH";
				break;
			case 2 :
				r = "ROLE_SUS";
				break;
			case 3 :
				r = "ROLE_ADMIN";
				break;
			default:
				break;
		}

		if(r == null){
			return "권한없음";
		}

		user.setRole(r);
		userRepository.save(user);
		return r + " 변경 완료";
	}

	@Override
	public User getUserByNickname(String nickName) {
		return userRepository.findByNickName(nickName);
	}


}
