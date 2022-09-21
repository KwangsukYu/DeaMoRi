package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.Team;
import ohgwang.demori.DB.repository.TeamRepository;
import ohgwang.demori.DB.repository.UserRepository;
import ohgwang.demori.api.request.LeagueRegisterPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamServiceImpl implements TeamService {

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Team createTeam(LeagueRegisterPostReq registerInfo, int idx) {

        Team team = new Team();

        team.setUniName(registerInfo.getUniName().get(idx));
        team.setTeamId(registerInfo.getTeamId().get(idx));
        team.setUser(userRepository.findByUserId(registerInfo.getLeaderId().get(idx)));
        team.setTeamColor(registerInfo.getTeamColor().get(idx));

        return teamRepository.save(team);
    }
}
