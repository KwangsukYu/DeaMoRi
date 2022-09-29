import React, { useState } from "react";
import { dataurlToBlob } from "utils/dataurlToBlob";
import "./TrophyGenerator.scss";
import { v1 } from "uuid";
import deepai from "deepai";
import { LinearProgress } from "@mui/material";
import { sendFileToIPFS } from "apis/web3/web3";

function TrophyGenerator() {
  const [trophyImg, setTrophyImg] = useState("");
  const [progressMsg, setProgressMsg] = useState<null | string>(null);

  const text2img = async () => {
    setProgressMsg("AI가 트로피를 그리고 있어요!");
    deepai.setApiKey(process.env.REACT_APP_DEEPAI_API_KEY as string);

    const resp = await deepai.callStandardApi("text2img", {
      text: "colorful Trophy with top and bottom margins"
    });

    const generatedImg = resp.output_url;
    console.log(generatedImg);

    const canvas = document.createElement("canvas");
    const newImg = new Image();
    newImg.src = generatedImg;
    newImg.crossOrigin = "Anonmymous";
    newImg.onload = async () => {
      const ctx = canvas.getContext("2d");
      canvas.width = 256;
      canvas.height = 256;
      ctx?.drawImage(newImg, 0, 0, 256, 256, 0, 0, 256, 256);
      const dataUrl = canvas.toDataURL("image/jpeg");
      console.log(dataUrl);
      setTrophyImg(dataUrl);
      const newFile = new File([dataurlToBlob(dataUrl)], v1());
      setProgressMsg("트로피를 NFT로 만들고있어요!");
      await sendFileToIPFS(newFile, "리그리그리그", "뤼그", 123);
      setProgressMsg(null);
    };
  };

  return (
    <div id="trophygenerator">
      <div className="trophygenerator">
        <button type="button" onClick={text2img}>
          트로피 생성
        </button>
        {trophyImg && <img src={trophyImg} alt="trophy" />}
        {progressMsg ? <p>{progressMsg}</p> : null}
      </div>
      {progressMsg ? <LinearProgress /> : null}
    </div>
  );
}

export default TrophyGenerator;
