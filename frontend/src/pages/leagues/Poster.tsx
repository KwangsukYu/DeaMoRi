import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// Materil UI
type leagueData = {
  posterImage?: { posterSample: string };
  title: string;
  time: string;
  place: string;
};

interface myProps {
  item: leagueData;
}

export default function Poster({ item }: myProps) {
  return (
    <Card id="card" sx={{ width: 200, height: 300, padding: 0, marginTop: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={item.posterImage?.posterSample}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.time}
          <br />
          {item.place}
        </Typography>
      </CardContent>
    </Card>
  );
}
