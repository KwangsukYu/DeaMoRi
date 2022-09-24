import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import posterSample from "assets/images/posterSample.png";

/* eslint-disable react/prop-types */
function Poster({ item: { id, email, body } }) {
  return (
    <Card id="card" sx={{ width: 200, height: 500, padding: 0, marginTop: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={posterSample}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {email}
          <br />
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default Poster;
