package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.University;
import ohgwang.demori.api.request.LeaguePatchReq;
import ohgwang.demori.api.request.LeagueRegisterPostReq;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.awt.print.Pageable;
import java.io.IOException;

public interface LeagueService {

    League createLeague(LeagueRegisterPostReq registerInfo, MultipartFile file) throws IOException;

    Page<League> getLeaguePage(int page, int size, String field, String keyword);

    League getByPk(int leaguePK);

    void updateLeagueStatus(League league, String s);
}
