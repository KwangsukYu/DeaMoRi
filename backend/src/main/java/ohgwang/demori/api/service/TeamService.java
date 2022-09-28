package ohgwang.demori.api.service;

import ohgwang.demori.DB.entity.Team;
import ohgwang.demori.DB.entity.University;
import ohgwang.demori.api.request.LeagueRegisterPostReq;

import java.util.List;

public interface TeamService {

    List<Team> createTeam(LeagueRegisterPostReq registerInfo);

}
