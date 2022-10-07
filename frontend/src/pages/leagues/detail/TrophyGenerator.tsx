import React, { useState } from "react";
import { dataurlToBlob } from "utils/dataurlToBlob";
import "./TrophyGenerator.scss";
import { v1 } from "uuid";
import deepai from "deepai";
import { leagueDetailType, teamType } from "apis/leagues/LeagueDetail";
import { LinearProgress } from "@mui/material";
import { sendFileToIPFS } from "apis/web3/web3";

interface TrophyGeneratorProps {
  leagueInfo: leagueDetailType;
  teamInfo: teamType;
  isGenerated: (tx: string) => void;
}

function TrophyGenerator({
  leagueInfo,
  teamInfo,
  isGenerated
}: TrophyGeneratorProps) {
  const [trophyImg, setTrophyImg] = useState("");
  const [progressMsg, setProgressMsg] = useState<null | string>(null);

  const text2img = async () => {
    setProgressMsg("AI가 트로피를 그리고 있어요!");
    deepai.setApiKey(process.env.REACT_APP_DEEPAI_API_KEY as string);

    const resp = await deepai.callStandardApi("text2img", {
      text: "Center Trophy with margin"
    });

    const generatedImg = resp.output_url;
    console.log(generatedImg);

    const canvas = document.createElement("canvas");
    const newImg = new Image();
    newImg.src = generatedImg;
    newImg.crossOrigin = "Anonmymous";
    newImg.onload = async () => {
      const ctx = canvas.getContext("2d");
      canvas.width = 512;
      canvas.height = 512;
      ctx?.drawImage(newImg, 0, 0, 512, 512);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setTrophyImg(dataUrl);
      const newFile = new File([dataurlToBlob(dataUrl)], v1());
      setProgressMsg("트로피를 NFT로 만들고있어요!");
      // const TrophyUrl = await sendFileToIPFS(
      //   newFile,
      //   leagueInfo.leagueId,
      //   teamInfo.teamName,
      //   teamInfo.teamWalletAddress
      // );
      // isGenerated(TrophyUrl);
      // setProgressMsg(null);
    };
  };

  return (
    <div id="trophygenerator">
      <div className="trophygenerator">
        {!trophyImg && (
          <button type="button" onClick={text2img}>
            트로피 생성
          </button>
        )}

        {trophyImg ? (
          <img src={trophyImg} alt="trophy" />
        ) : (
          <div className="empty-trophy">
            <p>우승팀에겐 트로피NFT를!</p>
            <p>유일한 우리만의 트로피를 만들어보세요!</p>
            <p>트로피가 제작되는데 다소 시간이 걸릴 수 있습니다.</p>
          </div>
        )}
        {progressMsg ? <p>{progressMsg}</p> : null}
      </div>
      {progressMsg ? <LinearProgress /> : null}
    </div>
  );
}

export default TrophyGenerator;
