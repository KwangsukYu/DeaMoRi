import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Poster_sample from "assets/images/Poster_sample.png";

// Materil UI
export default function Poster() {
  return (
    <Card sx={{ width: 200, height: 300 }}>
      <CardMedia
        component="img"
        height="200"
        image={Poster_sample}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          춘계 축구대회
        </Typography>
        <Typography variant="body2" color="text.secondary">
          경기일 : 22.09.05
          <br />
          장소 : 전남대체육관
        </Typography>
      </CardContent>
    </Card>
  );
}
