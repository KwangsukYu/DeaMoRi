package ohgwang.demori.api.service;


import ohgwang.demori.DB.entity.League;
import ohgwang.demori.DB.entity.University;
import ohgwang.demori.api.response.UniversityRes;

import java.util.List;

public interface UniversityService {

    List<UniversityRes> getUniversities();

    List<UniversityRes> searchUniversities(String search);

    University getUniversity(String id);

    University getUniversityByName(String univesityName);

    List<League> findUniversityLeague(University u);
}
