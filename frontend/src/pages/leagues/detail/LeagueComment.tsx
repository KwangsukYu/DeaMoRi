import React from "react";
import "./LeagueComment.scss";
import { v4 } from "uuid";
import Pagination from "components/Pagination/Pagination";
import CommentItem from "./CommentItem";

interface TeamDetailProps {
  teamColor: string;
}

function LeagueComment({ teamColor }: TeamDetailProps) {
  const commentDummy = [1, 2, 3, 4, 5];
  return (
    <div id="leaguecomment">
      <div className="leaguecomment">
        <input
          className="leaguecomment-input"
          type="text"
          placeholder="팀에게 따뜻한 응원메세지를 보내보세요!"
        />
        <button
          className="leaguecomment-button"
          style={{ backgroundColor: teamColor }}
          type="button"
        >
          응원하기
        </button>
      </div>
      <div className="leaguecomment-comment">
        {commentDummy.map(() => {
          return <CommentItem key={v4()} teamColor={teamColor} />;
        })}
      </div>
      <div className="leaguecomment-pagination">
        <Pagination />
      </div>
    </div>
  );
}

export default LeagueComment;
