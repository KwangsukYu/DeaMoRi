import { v4 } from "uuid";
import Badge from "assets/images/RewardBadge.svg";
import "./LeaguesIng.scss";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import posterSample from "assets/images/posterSample.png";

interface leagueType {
  leagueEndDate: string;
  leagueId: number;
  leagueName: string;
  leagueStartDate: string;
  posterURL: string;
  uniName1: string;
  uniName2: string;
}

export interface Leaguestype extends Array<leagueType> {}

export default function LeaguesEd({ uniPk }: any) {
  const [leagueList, setLeagueList] = useState<Leaguestype>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      url: `http://j7c208.p.ssafy.io:8080/api/univers/league/${uniPk}`,
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        const Leagues = res.data.getLeagues;
        console.log(Leagues);
        const IngLeagues = Leagues?.filter(
          (league: { status: string; "": any }) => league.status === "2"
        );
        setLeagueList(IngLeagues);
        console.log(res.data);
        console.log(IngLeagues, "11");
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {leagueList.length >= 1 ? (
        <div className="card-box">
          {leagueList.map(league => {
            return (
              <Card
                id="card"
                sx={{ width: 200, height: 300, padding: 1, margin: 1 }}
                key={v4()}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={league.posterURL}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {league.leagueName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {league.leagueStartDate} - {league.leagueEndDate}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="no-content-background">
          <p className="no-content-text">종료 된 대회가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
