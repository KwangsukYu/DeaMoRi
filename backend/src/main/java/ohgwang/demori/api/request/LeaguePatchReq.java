package ohgwang.demori.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDate;

@Data
@ApiModel("LeaguePatchReq")
public class LeaguePatchReq {
   @ApiModelProperty(name="대회 pk", example="1")
   private int leaguePk;

   @ApiModelProperty(name="우승자", example="0 or 1" , value = "이긴 팀 정보 0 = 1번팀, 1 = 2번팀 우승")
   private String winner;

   @ApiModelProperty(name="트로피 url")
   private String trophyUrl;

   @ApiModelProperty(name="트랜잭션 해쉬")
   private String transactionHash;
}
