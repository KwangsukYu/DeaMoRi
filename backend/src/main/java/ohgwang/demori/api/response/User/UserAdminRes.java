package ohgwang.demori.api.response.User;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.common.model.response.BaseResponseBody;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserAdminRes extends BaseResponseBody {

    private List<UserAdmin> userAdmins;

    public static UserAdminRes of(int statusCode, String message, List<User> users){
        UserAdminRes res = new UserAdminRes();

        res.setMessage(message);
        res.setStatusCode(statusCode);

        res.userAdmins = new ArrayList<>();

        for(User user : users){
            UserAdmin userAdmin = UserAdmin.builder()
                    .userPk(user.getId())
                    .userId(user.getUserId())
                    .userName(user.getUsername())
                    .badge(user.getBadge())
                    .nickName(user.getNickName())
                    .address(user.getWallet() == null ? null : user.getWallet().getAddress())
                    .universityName(user.getUniversity() == null ? null : user.getUniversity().getUniName())
                    .role(user.getRole())
                    .fileUrl(user.getUniversityAuth() == null ? null : user.getUniversityAuth().getFileUrl())
                    .build();
            res.userAdmins.add(userAdmin);

        }

        return res;
    }

}

@Data
@Builder
class UserAdmin{
    int userPk;
    String userId;
    String userName;
    String address;
    String role;
    String nickName;
    String badge;
    String fileUrl;
    String universityName;
}