import React, { useState, useEffect } from "react";
import "./Create.scss";
import ColorPicker from "components/colorPicker/ColorPicker";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { infoType } from "Slices/userInfo";
import DAMORI from "assets/images/DAEMORI_logo.svg";
import { CircularProgress } from "@mui/material";
import CreateLeague from "apis/leagues/CreateLeague";
import UniversityData from "./UniversityData.json";

type Inputs = {
  leagueTitle: string;
  prizeMoney: number;
  leagueStart: string;
  leagueEnd: string;
  place: string;
  poster: File;
  contractAddress: string;
  team1University: string;
  team1Name: string;
  team1Wallet: string;
  team2University: string;
  team2Name: string;
  team2Wallet: string;
  team1Color: string;
  team2Color: string;
  broadcast: string;
  ownerPk: string;
};

function Create() {
  const storeUser = useSelector((state: infoType) => state.userInfo.userInfo);

  const [team1Color, setTeam1Color] = useState("#5c6bc0");
  const [team2Color, setTeam2Color] = useState("#5c6bc0");
  const [broadcast, setBroadcast] = useState("");
  const [files, setFiles] = useState([] as any);
  const [userPk] = useState(String(storeUser.userPk));
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  // 프리뷰

  // 파일 객체 생성
  const createFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        const res = reader.result;
        setImageSrc(res as string);
      };
    }
  };

  // 대학 검색 드롭다운
  const [search1, setSearch1] = useState([]);
  const [search2, setSearch2] = useState([]);
  const [isHaveInputValue1, setIsHaveInputValue1] = useState(false);
  const [isHaveInputValue2, setIsHaveInputValue2] = useState(false);
  const [team1uni, setTeam1uni] = useState("");
  const [team2uni, setTeam2uni] = useState("");
  // useForm submit시 어떤 데이터를 넘겨줄것인지 설정 및 추가해줌
  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    const newData = {
      ...data,
      team1Color,
      team2Color,
      broadcast,
      ownerPk: userPk
    };
    await CreateLeague(files, newData);
    setIsLoading(false);
  };

  const broadcasting = (e: string) => {
    if (e === "1") {
      setBroadcast("1");
    } else if (e === "0") {
      setBroadcast("0");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const teamColorProps = (n: number, c: string) => {
    if (n === 1) {
      setTeam1Color(c);
    } else if (n === 2) {
      setTeam2Color(c);
    }
  };

  // UniversityData.json 에서 대학 이름 가져오기
  const dataFull = JSON.parse(JSON.stringify(UniversityData));

  const updateChange1 = (e: any) => {
    const data = e.target.value;

    let filterData = dataFull.name.filter((i: any) => i.includes(data));
    if (data.length === 0) {
      filterData = [];
    } else if (data.length !== 0 && filterData.length === 0) {
      filterData = ["검색 결과가 없습니다."];
      // 데이터에 있는 검색어를 입력시 dropdown 창이 사라짐
    } else if (data === filterData[0] && filterData.length === 1) {
      filterData = [];
    }
    setSearch1(filterData);
  };

  const updateChange2 = (e: any) => {
    const data = e.target.value;

    let filterData = dataFull.name.filter((i: any) => i.includes(data));
    if (data.length === 0) {
      filterData = [];
    } else if (data.length !== 0 && filterData.length === 0) {
      filterData = ["검색 결과가 없습니다."];
      // 데이터에 있는 검색어를 입력시 dropdown 창이 사라짐
    } else if (data === filterData[0] && filterData.length === 1) {
      filterData = [];
    }
    setSearch2(filterData);
  };

  // 1팀 대학검색 dropdwon
  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeam1uni(e.target.value); // input에 입력한 값을 newValue에 담아둔다.
    // 여기서 입력을 해준다고 바로바로 밑의 출력값이 변하지 않는다.
    // 왜냐하면 handleBlur에 의해서 handleValueChange 함수가 실행되어야 값이 바뀌기 때문이다.
  };

  const clickDropDownItem1 = (clickedItem: string) => {
    setTeam1uni(clickedItem);
    setIsHaveInputValue1(false);
  };

  // 2팀 대학검색 dropdwon
  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeam2uni(e.target.value); // input에 입력한 값을 newValue에 담아둔다.
    // 여기서 입력을 해준다고 바로바로 밑의 출력값이 변하지 않는다.
    // 왜냐하면 handleBlur에 의해서 handleValueChange 함수가 실행되어야 값이 바뀌기 때문이다.
  };

  const clickDropDownItem2 = (clickedItem: string) => {
    setTeam2uni(clickedItem);
    setIsHaveInputValue2(false);
  };

  // 파일 출력

  return (
    <div id="create">
      <div className="create">
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          // encType="multipart/form-data"
        >
          {/* 공통 옵션 선택 */}
          <div className="create-option">
            <h1>대회 생성</h1>
            <div className="create-container">
              <div className="create-container-poster">
                <p className="create-container-poster-label">
                  대회 포스터 등록
                </p>
                <div className="create-container-poster-box">
                  {imageSrc ? (
                    <img src={imageSrc} alt="" />
                  ) : (
                    <img src={DAMORI} alt="" />
                  )}
                </div>
                <label className="create-option-poster" htmlFor="poster">
                  포스터 등록
                  <input
                    className="create-option-poster-register"
                    type="file"
                    placeholder="포스터"
                    id="poster"
                    // {...register("poster", {
                    //   required: "포스터를 등록해주세요."
                    // })}
                    onChange={e => {
                      createFile(e);
                    }}
                  />
                </label>
                {errors.poster && (
                  <small role="alert">{errors.poster.message}</small>
                )}
              </div>
              <div className="create-container-info">
                <div className="create-info-wrapper">
                  <div className="create-container-info_title">
                    <p>대회 명</p>
                    <input
                      className="create-container-info_title_input"
                      type="text"
                      placeholder="대회명"
                      id="leaguetitle"
                      {...register("leagueTitle", {
                        required: "대회명을 입력해주세요."
                      })}
                    />
                  </div>
                  {/* 입력값이 없으면 오류 메세지를 띄워줌 */}
                  {errors.leagueTitle && (
                    <small role="alert">{errors.leagueTitle.message}</small>
                  )}
                  <div className="create-container-info_place">
                    <p className="create-container-info_place_label">
                      대회 장소
                    </p>
                    <input
                      className="create-container-info_place_input"
                      type="text"
                      placeholder="대회 장소"
                      id="leagueend"
                      {...register("place", {
                        required: "대회 장소를 입력해주세요."
                      })}
                    />
                    {errors.place && (
                      <small role="alert">{errors.place.message}</small>
                    )}
                  </div>
                  <div className="create-container-info_prize">
                    <p>대회 상금</p>
                    <input
                      className="create-container-info_prize_input"
                      type="text"
                      id="sponstart"
                      placeholder="대회 상금"
                      {...register("prizeMoney")}
                    />
                    {errors.prizeMoney && (
                      <small role="alert">{errors.prizeMoney.message}</small>
                    )}
                  </div>
                </div>

                <div className="create-broadcast-wrapper">
                  <p>중계</p>
                  <div className="create-container-info_broadcast">
                    <p>대회 중계 여부를 선택해주세요.</p>
                    <p>중계방은 주최자만 만들 수 있습니다.</p>
                    {broadcast === "1" ? (
                      <button
                        type="button"
                        className="create-container-info_broadcast_on"
                        onClick={() => broadcasting("0")}
                      >
                        ON
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="create-container-info_broadcast_off"
                        onClick={() => broadcasting("1")}
                      >
                        OFF
                      </button>
                    )}
                  </div>
                </div>
                <div className="create-container-date">
                  <div className="create-option-text">
                    대회 일정
                    <div className="create-option-comment">
                      후원 종료일은 대회 종료일과 동일하게 적용됩니다.
                    </div>
                  </div>
                  <span>
                    <input
                      className="create-option-input"
                      type="date"
                      id="leaguestart"
                      {...register("leagueStart")}
                    />{" "}
                    -{" "}
                    <input
                      className="create-option-input"
                      type="date"
                      id="leagueend"
                      {...register("leagueEnd")}
                    />
                  </span>
                  {errors.leagueStart && (
                    <small role="alert">{errors.leagueStart.message}</small>
                  )}
                  {errors.leagueEnd && (
                    <small role="alert">{errors.leagueEnd.message}</small>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 팀별 옵션 선택 */}
          <span className="create-container">
            {/* 1팀 */}
            <div className="create-container-teamoption1">
              <h2>1팀</h2>
              <input
                type="text"
                placeholder="학교명"
                {...register("team1University", {
                  required: "학교명을 입력해주세요."
                })}
                onChange={e => {
                  setIsHaveInputValue1(true);
                  updateChange1(e);
                  handleInputChange1(e);
                }}
                value={team1uni}
              />
              <div className="create-container-dropdown">
                {isHaveInputValue1 &&
                  search1.map(item => {
                    return (
                      <div
                        className="create-container-dropdown-item"
                        key={item}
                        onClick={() => clickDropDownItem1(item)}
                        role="presentation"
                      >
                        {item}
                      </div>
                    );
                  })}
              </div>
              {errors.team1University && (
                <small role="alert">{errors.team1University.message}</small>
              )}
              <input
                type="text"
                placeholder="팀명"
                {...register("team1Name", {
                  required: "팀 이름을 입력해주세요."
                })}
              />
              {errors.team1Name && (
                <small role="alert">{errors.team1Name.message}</small>
              )}
              <input
                type="text"
                placeholder="팀장 지갑주소"
                {...register("team1Wallet", {
                  required: "팀장 지갑주소를 입력해주세요."
                })}
              />
              {errors.team1Wallet && (
                <small role="alert">{errors.team1Wallet.message}</small>
              )}
              <div className="create-container-teamoption1-text">
                팀장 계정으로 각 팀의 후원이 제공됩니다.
              </div>
              <h4>1팀 대표 색상 선택</h4>
              <ColorPicker team={1} teamColorProps={teamColorProps} />
            </div>

            {/* 2팀 */}
            <div className="create-container-teamoption2">
              <h2>2팀</h2>
              <input
                type="text"
                placeholder="학교명"
                {...register("team2University", {
                  required: "학교명을 입력해주세요."
                })}
                onChange={e => {
                  setIsHaveInputValue2(true);
                  updateChange2(e);
                  handleInputChange2(e);
                }}
                value={team2uni}
              />
              <div className="create-container-dropdown">
                {isHaveInputValue2 &&
                  search2.map(item => {
                    return (
                      <div
                        className="create-container-dropdown-item"
                        key={item}
                        onClick={() => clickDropDownItem2(item)}
                        role="presentation"
                      >
                        {item}
                      </div>
                    );
                  })}
              </div>
              {errors.team2University && (
                <small role="alert">{errors.team2University.message}</small>
              )}
              <input
                type="text"
                placeholder="팀명"
                {...register("team2Name", {
                  required: "팀 이름을 입력해주세요."
                })}
              />
              {errors.team2Name && (
                <small role="alert">{errors.team2Name.message}</small>
              )}
              <input
                type="text"
                placeholder="팀장 지갑주소"
                {...register("team2Wallet", {
                  required: "팀장 지갑주소를 입력해주세요."
                })}
              />
              {errors.team2Wallet && (
                <small role="alert">{errors.team2Wallet.message}</small>
              )}
              <div className="create-container-teamoption2-text">
                팀장 계정으로 각 팀의 후원이 제공됩니다.
              </div>
              <h4>1팀 대표 색상 선택</h4>
              <ColorPicker team={2} teamColorProps={teamColorProps} />
            </div>
          </span>
          {isLoading ? (
            <div className="create-buttoncontainer">
              <CircularProgress />
            </div>
          ) : (
            <div className="create-buttoncontainer">
              <Link to="/leagues">
                <button className="create-buttoncontainer-cancel" type="button">
                  취소
                </button>
              </Link>
              <button
                className="create-buttoncontainer-approve"
                // onClick={handleSubmit}
                type="submit"
              >
                대회 생성
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Create;
