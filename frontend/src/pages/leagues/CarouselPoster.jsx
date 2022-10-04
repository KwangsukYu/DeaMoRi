import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./CarouselPoster.scss";

/* eslint-disable react/prop-types */
function CarouselPoster({
  item: {
    leagueId,
    leagueName,
    posterURL,
    uniName1,
    uniName2,
    leagueStartDate,
    leagueEndDate,
    status,
    donation,
    prizeMoney
  }
}) {
  return (
    <Link id="poster" to={`detail/${leagueId}`}>
      <Card
        id="card"
        sx={{
          width: 230,
          height: 450,
          padding: 0,
          marginTop: 3,
          textAlign: "center"
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={posterURL}
          alt="green iguana"
        />
        <CardContent className="poster-content">
          <Typography gutterBottom variant="h5" component="div">
            {leagueName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {uniName1} VS {uniName2}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {leagueStartDate} ~ {leagueEndDate} <br />
            대회 상금 : {prizeMoney}
            <br />
            후원금 : {donation}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
export default CarouselPoster;
