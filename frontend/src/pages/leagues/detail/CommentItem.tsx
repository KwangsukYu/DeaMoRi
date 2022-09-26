import React from "react";
import "./CommentItem.scss";

interface LeagueCommentProps {
  teamColor: string;
}

function CommentItem({ teamColor }: LeagueCommentProps) {
  return (
    <div id="commentitem">
      <div className="commentitem" style={{ border: `4px solid ${teamColor}` }}>
        <div className="commentitem-content ">
          <p>
            세게간채강자드르싸우민가세게간채강자드르싸우민가세게간채강자드르싸우민가
          </p>
        </div>
        <div
          className="commentitem-hr"
          style={{ backgroundColor: teamColor }}
        />
        <div className="commentitem-user">
          <p>서울대학교동문회</p>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
