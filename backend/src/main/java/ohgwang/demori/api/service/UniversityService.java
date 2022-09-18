package ohgwang.demori.api.service;


import ohgwang.demori.api.response.UniversityRes;

import java.util.List;

public interface UniversityService {

    List<UniversityRes> getUniversities();

    List<UniversityRes> searchUniversities(String search);
}
