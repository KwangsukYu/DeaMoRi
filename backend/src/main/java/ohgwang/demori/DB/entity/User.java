package ohgwang.demori.DB.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import ohgwang.demori.DB.entity.Image.Badge;
import ohgwang.demori.DB.entity.Image.Trophy;
import ohgwang.demori.DB.entity.Image.UniversityAuth;
import ohgwang.demori.DB.entity.Relation.UserBadge;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

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

	private int donation;
	private int ranking;

	@CreationTimestamp
	@JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
	private Timestamp createDate;

	@OneToOne
	@JoinColumn(name = "wallet_pk",unique = true)
	private Wallet wallet;

	@OneToOne
	@JoinColumn(name = "uni_auth_pk")
	private UniversityAuth universityAuth;

	@OneToOne
	@JoinColumn(name = "uni_pk")
	private University university;

	@OneToMany(mappedBy = "user" , fetch = FetchType.LAZY , cascade = CascadeType.ALL)
	private List<UserBadge> badgeList = new ArrayList<>();

}
