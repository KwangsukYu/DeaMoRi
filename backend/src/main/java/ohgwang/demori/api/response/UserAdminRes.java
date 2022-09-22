package ohgwang.demori.api.response;

import lombok.Data;
import ohgwang.demori.DB.entity.User;

@Data
public class UserAdminRes extends UserRes{
    String fileUrl;

    public static UserAdminRes of(User user){
        UserAdminRes res = new UserAdminRes();
        res.setUserId(user.getUserId());
        res.setUserName(user.getUsername());
        if(user.getWallet() != null){
            res.setAddress(user.getWallet().getAddress());
        }else{
            res.setAddress(null);
        }
        if(user.getUniversityAuth() != null){
            res.setFileUrl(user.getUniversityAuth().getFileUrl());
        }else{
            res.setFileUrl(null);
        }
        res.setRole(user.getRole());

        return res;
    }

}