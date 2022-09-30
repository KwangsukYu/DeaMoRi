package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.Team;
import ohgwang.demori.DB.repository.LeagueRepository;
import ohgwang.demori.DB.repository.TeamRepository;
import ohgwang.demori.DB.repository.UserRepository;
import ohgwang.demori.api.request.LeaguePatchReq;
import ohgwang.demori.api.request.LeagueRegisterPostReq;
import ohgwang.demori.common.util.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;


@Service
public class LeagueServiceImpl implements LeagueService {

    @Autowired
    LeagueRepository leagueRepository;

    @Autowired
    TeamService teamService;

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    S3Service s3Service;
    @Override
    public League createLeague(LeagueRegisterPostReq registerInfo, MultipartFile file) throws IOException {

        Map<String,String> map = s3Service.upload(file, "P");

        League league = new League();

        league.setLeagueId(registerInfo.getLeagueTitle());
        league.setLeagueStartDate(registerInfo.getLeagueStart());
        league.setLeagueEndDate(registerInfo.getLeagueEnd());
        league.setLocation(registerInfo.getPlace());
        league.setContractAddress(registerInfo.getContractAddress());
        league.setIsBroadcast(registerInfo.getBroadcast());
        league.setStatus("0");
        league.setOwner(userRepository.getById(Integer.parseInt(registerInfo.getOwnerPk())));


        List<Team> teamList = teamService.createTeam(registerInfo);
        league.setTeam1(teamList.get(0));
        league.setTeam2(teamList.get(1));

        league.setPosterURL(map.get("fileUrl"));

        return leagueRepository.save(league);
    }

    @Override
    public Page<League> getLeaguePage(int page, int size, String field, String keyword) {
        if(keyword == null) {
            return leagueRepository.findAll(PageRequest.of(page, size).withSort(Sort.by(field)));
        }

        return leagueRepository.findAllByLeagueId(keyword, PageRequest.of(page, size).withSort(Sort.by(field)));
    }

    @Override
    public League getByPk(int leaguePK) {
        return leagueRepository.getById(leaguePK);
    }

    @Override
    public void updateLeagueStatus(League league, String s) {
        league.setStatus(s);
        leagueRepository.save(league);
    }


}