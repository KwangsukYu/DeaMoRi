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
      url: `http://j7c208.p.ssafy.io:8080/api/univers/league/${uniPk}`,
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        const Leagues = res.data.getLeagues;
        console.log(Leagues);
        const IngLeagues = Leagues?.filter(
          (league: { status: string; "": any }) => league.status === "0"
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

  console.log(leagueList);
  console.log(loading);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {leagueList ? (
            <div className="card-box">
              {leagueList.map(league => {
                return (
                  <Card
                    id="card"
                    sx={{
                      width: 200,
                      // height: 300,
                      padding: 1,
                      margin: 1,
                      cursor: "pointer"
                    }}
                    key={v4()}
                    onClick={() => {
                      navigate(`/leagues/detail/${league.leagueId}`);
                    }}
                  >
                    <CardMedia
                      component="img"
                      // height="200"
                      image={league.posterURL}
                      alt="green iguana"
                    />
                    <hr />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "17px",
                          width: "210px",
                          textAlign: "center"
                        }}
                      >
                        {league.leagueName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontWeight: "bold",
                          marginTop: "15px",
                          width: "214px",
                          textAlign: "center"
                        }}
                      >
                        {league.leagueStartDate} ~ {league.leagueEndDate} <br />
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontWeight: "bold",
                          marginTop: "15px",
                          width: "214px",
                          marginLeft: "50px"

                          // textAlign: "center"
                        }}
                      >
                        {`대회상금 : ${Number(league.prizeMoney)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} WON`}
                        {/* 대회상금 :
                        {Number(league.prizeMoney)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        WON <br /> */}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontWeight: "bold",
                          marginTop: "15px",
                          width: "214px",
                          marginLeft: "50px"
                          // textAlign: "center"
                        }}
                      >
                        {`후원금 : ${Number(league.donation)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} WON`}
                      </Typography>
                    </CardContent>
                  </Card>
                );
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
