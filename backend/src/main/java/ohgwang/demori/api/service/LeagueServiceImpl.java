package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.Team;
import ohgwang.demori.DB.entity.University;
import ohgwang.demori.DB.repository.LeagueRepository;
import ohgwang.demori.DB.repository.TeamRepository;
import ohgwang.demori.api.request.LeagueRegisterPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class LeagueServiceImpl implements LeagueService {

    @Autowired
    LeagueRepository leagueRepository;

    @Autowired
    TeamService teamService;

    @Autowired
    TeamRepository teamRepository;

    @Override
    public League createLeague(LeagueRegisterPostReq registerInfo) {

        League league = new League();

        league.setLeagueId(registerInfo.getLeagueId());
        league.setLeagueStartDatetime(registerInfo.getLeagueStartDatetime());
        league.setLeagueEndDatetime(registerInfo.getLeagueEndDatetime());
        league.setSponStartDatetime(registerInfo.getSponStartDatetime());
        league.setLocation(registerInfo.getLocation());

        List<Team> teamList = teamService.createTeam(registerInfo);
        league.setTeam1(teamList.get(0));
        league.setTeam2(teamList.get(1));

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