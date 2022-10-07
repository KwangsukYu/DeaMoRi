import React from "react";
import { commentType } from "apis/leagues/LeagueDetail";
import "./CommentItem.scss";

interface LeagueCommentProps {
  cheer: commentType;
  color: string;
}

function CommentItem({ cheer, color }: LeagueCommentProps) {
  return (
    <div id="commentitem">
      <div className="commentitem" style={{ border: `4px solid ${color}` }}>
        <div className="commentitem-content ">
          <p>{cheer.cheerContent}</p>
        </div>
        <div className="commentitem-hr" style={{ backgroundColor: color }} />
        <div className="commentitem-user">
          <p>{cheer.cheerBalance} WON을 대표팀에게 후원했습니다.</p>
          <p>from.{cheer.cheerName}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
