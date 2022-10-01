import React, { useState } from "react";
import "./LeagueComment.scss";
import { v4 } from "uuid";
import Pagination from "components/Pagination/Pagination";
import TeamSupport from "components/teamSupport/TeamSupport";
import { teamType } from "apis/leagues/LeagueDetail";
import CommentItem from "./CommentItem";

interface TeamDetailProps {
  teamInfo: teamType;
  teamNumber: number;
  leaguePk: number;
  change: () => void;
}

function LeagueComment({
  teamInfo,
  teamNumber,
  leaguePk,
  change
}: TeamDetailProps) {
  const commentDummy = [1, 2, 3, 4, 5];
  const [teamModal, setTeamModal] = useState(false);

  return (
    <div id="leaguecomment">
      <div className="leaguecomment">
        <p>학교를 대표한 팀에게 따뜻한 응원의 마음을 보내보세요!</p>
        <button
          className="leaguecomment-button"
          style={{ backgroundColor: teamInfo.teamColor }}
          type="button"
          onClick={() => setTeamModal(true)}
        >
          응원하기
        </button>
      </div>
      <div className="leaguecomment-comment">
        {teamInfo.getCheers.map(cheer => {
          return (
            <CommentItem key={v4()} color={teamInfo.teamColor} cheer={cheer} />
          );
        })}
      </div>
      {teamModal && (
        <TeamSupport
          leaguePk={leaguePk}
          teamInfo={teamInfo}
          teamNumber={teamNumber}
          signal={() => setTeamModal(false)}
          change={change}
        />
      )}
      <div className="leaguecomment-pagination">{/* <Pagination /> */}</div>
    </div>
  );
}

export default LeagueComment;
