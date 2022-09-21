package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.League;
import ohgwang.demori.api.request.LeagueRegisterPostReq;
import org.springframework.data.domain.Page;

import java.awt.print.Pageable;

public interface LeagueService {

    League createLeague(LeagueRegisterPostReq registerInfo);

    Page<League> getLeaguePage(int page, int size, String field);

}
