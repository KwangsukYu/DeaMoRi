import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import posterSample from "assets/images/posterSample.png";

/* eslint-disable react/prop-types */
function Poster({
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
      <CardContent>
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
          후원금 : {prizeMoney}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default Poster;
