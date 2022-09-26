package ohgwang.demori.DB.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import ohgwang.demori.DB.entity.Image.UniversityAuth;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class User {
	
	@Id   
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
	@Column(name = "user_pk")
	private int id;

	private String userId;
	private String password;
	private String username;
	private String nickName;
	private String badge;
	private String role;

	@CreationTimestamp
	@JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
	private Timestamp createDate;

	@OneToOne
	@JoinColumn(name = "wallet_pk",unique = true)
	private Wallet wallet;

	@OneToOne
	@JoinColumn(name = "uni_auth_pk")
	private UniversityAuth universityAuth;


}
