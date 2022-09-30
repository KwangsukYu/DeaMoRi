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
import Loading from "../../components/Loading/Loading";

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

export default function LeaguesIng() {
  const [leagueList, setLeagueList] = useState<Leaguestype>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      url: "http://j7c208.p.ssafy.io:8080/api/league",
      method: "get",
      params: { page: 0, size: 8 }
    })
      .then(res => {
        setLeagueList(res.data.getLeagues);
        console.log(res);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log(leagueList);

  return (
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
                123
              </Typography>
              <Typography variant="body2" color="text.secondary">
                123
                <br />
                123
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
