package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.Team;
import ohgwang.demori.DB.entity.University;
import ohgwang.demori.DB.entity.User;
import ohgwang.demori.DB.repository.TeamRepository;
import ohgwang.demori.DB.repository.UniversityRepository;
import ohgwang.demori.DB.repository.UserRepository;
import ohgwang.demori.api.request.LeagueRegisterPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeamServiceImpl implements TeamService {

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    UserService userService;

    @Autowired
    UniversityService universityService;

    @Override
    public List<Team> createTeam(LeagueRegisterPostReq registerInfo) {
        List<Team> teamList = new ArrayList<>();

        Team team1 = new Team();
        team1.setTeamId(registerInfo.getTeam1Id());
        team1.setTeamColor(registerInfo.getTeam1Color());
        team1.setUser(userService.getUserByUserId(registerInfo.getTeam1LeaderId()));
        team1.setUniversity(universityService.getUniversityByName(" " + registerInfo.getTeam1University() + " "));
        teamList.add(teamRepository.save(team1));

        Team team2 = new Team();
        team2.setTeamId(registerInfo.getTeam2Id());
        team2.setTeamColor(registerInfo.getTeam2Color());
        team2.setUser(userService.getUserByUserId(registerInfo.getTeam2LeaderId()));
        team2.setUniversity(universityService.getUniversityByName(" " + registerInfo.getTeam2University() + " "));
        teamList.add(teamRepository.save(team2));

        return teamList;
    }
}
