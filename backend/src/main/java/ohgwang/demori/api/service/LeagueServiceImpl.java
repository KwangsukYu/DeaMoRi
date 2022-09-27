package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.Team;
import ohgwang.demori.DB.repository.LeagueRepository;
import ohgwang.demori.api.request.LeagueRegisterPostReq;
import ohgwang.demori.common.model.response.BaseResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;

@Service
public class LeagueServiceImpl implements LeagueService {

    @Autowired
    LeagueRepository leagueRepository;

    @Autowired
    TeamService teamService;

    @Override
    public League createLeague(LeagueRegisterPostReq registerInfo) {

        League league = new League();

        league.setLeagueId(registerInfo.getLeagueId());
        league.setLeagueStartDatetime(registerInfo.getLeagueStartDatetime());
        league.setLeagueEndDatetime(registerInfo.getLeagueEndDatetime());
        league.setSponStartDatetime(registerInfo.getSponStartDatetime());
        league.setLocation(registerInfo.getLocation());

        List<Team> teams = new ArrayList<Team>();
        for(int i = 0; i < 2; i++) {
            teams.add(teamService.createTeam(registerInfo, i));
        }

        league.setTeam1(teams.get(0));
        league.setTeam2(teams.get(1));

        return leagueRepository.save(league);
    }

    @Override
    public Page<League> getLeaguePage(int page, int size, String field, String keyword) {
        if(keyword == null) {
            return leagueRepository.findAll(PageRequest.of(page, size).withSort(Sort.by(field)));
        }

        return leagueRepository.findAllByLeagueId(keyword, PageRequest.of(page, size).withSort(Sort.by(field)));
    }
}