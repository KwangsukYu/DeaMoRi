package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.User;
import ohgwang.demori.DB.repository.UserRepository;
import ohgwang.demori.api.request.UserRegisterPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
    PasswordEncoder passwordEncoder;

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


}
