import React, { useState } from "react";
import "./Create.scss";
import ColorPicker from "components/colorPicker/ColorPicker";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import CreateLeague from "apis/leagues/CreateLeague";

type Inputs = {
  leagueTitle: string;
  sponStart: string;
  leagueStart: string;
  leagueEnd: string;
  place: string;
  poster: File;

  team1University: string;
  team1Name: string;
  team1Wallet: string;
  team2University: string;
  team2Name: string;
  team2Wallet: string;
  team1Color: string;
  team2Color: string;
  broadcast: number;
};

function Create() {
  const [team1Color, setTeam1Color] = useState("#5c6bc0");
  const [team2Color, setTeam2Color] = useState("#5c6bc0");
  const [broadcast, setBroadcast] = useState(0);

  // useForm submit시 어떤 데이터를 넘겨줄것인지 설정 및 추가해줌
  const onSubmit = (data: Inputs) => {
    const newData = { ...data, team1Color, team2Color, broadcast };
    CreateLeague(newData);
    console.log(newData);
  };

  const broadcasting = (e: number) => {
    if (e === 1) {
      setBroadcast(1);
    } else if (e === 0) {
      setBroadcast(0);
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
    // 색상 코드 선택 확인
    // console.log(c);
  };

  return (
    <div id="create">
      <div className="create">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 공통 옵션 선택 */}
          <div className="create-option">
            <h1>대회생성</h1>
            <input
              className="create-option-input"
              type="text"
              placeholder="대회명"
              id="leaguetitle"
              {...register("leagueTitle", {
                required: "대회명을 입력해주세요."
              })}
            />
            {/* 입력값이 없으면 오류 메세지를 띄워줌 */}
            {errors.leagueTitle && (
              <small role="alert">{errors.leagueTitle.message}</small>
            )}
            <div className="create-option-text">후원 시작일</div>
            <div className="create-option-comment">
              후원 종료일은 대회 종료일과 동일하게 적용됩니다.
            </div>
            <input
              className="create-option-input"
              type="date"
              id="sponstart"
              {...register("sponStart", {
                required: "후원 시작일을 입력해주세요."
              })}
            />
            {errors.sponStart && (
              <small role="alert">{errors.sponStart.message}</small>
            )}
            <div className="create-option-text">대회 일정</div>
            <span>
              <input
                className="create-option-input"
                type="date"
                id="leaguestart"
                {...register("leagueStart", {
                  required: "대회 시작일을 입력해주세요."
                })}
              />{" "}
              -{" "}
              <input
                className="create-option-input"
                type="date"
                id="leagueend"
                {...register("leagueEnd", {
                  required: "대회 종료일을 입력해주세요."
                })}
              />
            </span>
            {errors.leagueStart && (
              <small role="alert">{errors.leagueStart.message}</small>
            )}
            {errors.leagueEnd && (
              <small role="alert">{errors.leagueEnd.message}</small>
            )}
            <input
              className="create-option-input"
              type="text"
              placeholder="장소"
              id="leagueend"
              {...register("place", {
                required: "대회 장소를 입력해주세요."
              })}
            />
            {errors.place && <small role="alert">{errors.place.message}</small>}
            <label className="create-option-poster" htmlFor="poster">
              포스터 등록
              <input
                className="create-option-poster-register"
                type="file"
                placeholder="포스터"
                id="poster"
                {...register("poster", {
                  required: "포스터를 등록해주세요."
                })}
              />
            </label>
            {errors.poster && (
              <small role="alert">{errors.poster.message}</small>
            )}
            <span className="create-option-broadcast">
              <button
                className={
                  broadcast === 0
                    ? "create-option-broadcast-on"
                    : "create-option-broadcast-off"
                }
                onClick={() => broadcasting(0)}
                type="button"
              >
                중개 Off
              </button>
              <button
                className={
                  broadcast === 1
                    ? "create-option-broadcast-on"
                    : "create-option-broadcast-off"
                }
                onClick={() => broadcasting(1)}
                type="button"
              >
                중개 On
              </button>
            </span>
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
              />{" "}
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
              />
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

          <div className="create-buttoncontainer">
            <Link to="/leagues">
              <button className="create-buttoncontainer-cancel" type="button">
                취소
              </button>
            </Link>
            <button className="create-buttoncontainer-approve" type="submit">
              대회 생성
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
