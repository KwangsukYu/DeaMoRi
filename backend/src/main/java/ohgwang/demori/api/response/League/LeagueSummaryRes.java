package ohgwang.demori.api.response.League;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.DB.entity.League;
import ohgwang.demori.common.model.response.BaseResponseBody;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class LeagueSummaryRes extends BaseResponseBody {

    private int totalLeague;
    private int nowLeague;
    private int endLeague;
    private int totalDonation;

    public static LeagueSummaryRes of(int statusCode, String message, List<League> leagues) {

        LeagueSummaryRes res = new LeagueSummaryRes();
        res.setMessage(message);
        res.setStatusCode(statusCode);

        if(leagues != null){
            res.totalLeague = leagues.size();
            int now = 0;
            int end = 0;
            int donation = 0;
            for(League l : leagues) {
                donation += l.getAllDonation();
                if(l.getStatus().equals("0") || l.getStatus().equals("1")){
                    now++;
                }else{
                    end++;
                }
            }

            res.setEndLeague(end);
            res.setNowLeague(now);
            res.setTotalDonation(donation);
        }


        return res;
    }
}