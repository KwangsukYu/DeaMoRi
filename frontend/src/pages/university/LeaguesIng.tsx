import { v4 } from "uuid";
import Badge from "assets/images/RewardBadge.svg";
import "./LeaguesIng.scss";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import posterSample from "assets/images/posterSample.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Poster from "pages/leagues/Poster";
import Loading from "../../components/Loading/Loading";

interface leagueType {
  donation(donation: any): unknown;
  prizeMoney: string;
  leagueEndDate: string;
  leagueId: number;
  leagueName: string;
  leagueStartDate: string;
  posterURL: string;
  uniName1: string;
  uniName2: string;
}

export interface Leaguestype extends Array<leagueType> {}

export default function LeaguesIng({ uniPk }: any) {
  const navigate = useNavigate();

  const [leagueList, setLeagueList] = useState<Leaguestype>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      url: `https://j7c208.p.ssafy.io:8080/api/univers/league/${uniPk}`,
      method: "get"
    })
      .then(res => {
        const Leagues = res.data.getLeagues;
        const IngLeagues = Leagues?.filter(
          (league: { status: string; "": any }) => league.status === "0"
        );
        setLeagueList(IngLeagues);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {leagueList ? (
            <div className="card-box">
              {leagueList.map(league => {
                return <Poster item={league} key={v4()} />;
              })}
            </div>
          ) : (
            <div className="no-content-background">
              <p className="no-content-text">진행중인 대회가 없습니다.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
