package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.Team;
import ohgwang.demori.api.request.LeagueRegisterPostReq;

public interface TeamService {

    Team createTeam(LeagueRegisterPostReq registerInfo, int idx);

}
