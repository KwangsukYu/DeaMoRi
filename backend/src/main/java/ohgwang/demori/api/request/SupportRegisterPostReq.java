package ohgwang.demori.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("SupportRegisterPostRequest")
public class SupportRegisterPostReq {
    @ApiModelProperty(name="후원자 이름", example="**동문회, 이민재,  (닉네임 아무거나)")
    private String supportName;
    @ApiModelProperty(name="트랜잭션 해쉬")
    private String transactionHash;
    @ApiModelProperty(name="보낼 대학", example="0 or 1" , value = "0으로 보내면 1번팀의 대학의 후원 1은 2번팀")
    private String sendUniversity;
    @ApiModelProperty(name="대학 pk", example="leaguePk")
    private String leaguePk;
}
