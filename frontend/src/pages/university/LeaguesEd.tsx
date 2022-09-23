import { v4 } from "uuid";
import Badge from "assets/images/RewardBadge.svg";
import "./LeaguesIng.scss";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import posterSample from "assets/images/posterSample.png";

export default function LeaguesEd() {
  return (
    <div className="card-box">
      <Card id="card" sx={{ width: 200, height: 300, padding: 1, margin: 1 }}>
        <CardMedia
          component="img"
          height="200"
          image={posterSample}
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
      <Card id="card" sx={{ width: 200, height: 300, padding: 1, margin: 1 }}>
        <CardMedia
          component="img"
          height="200"
          image={posterSample}
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
      <Card id="card" sx={{ width: 200, height: 300, padding: 1, margin: 1 }}>
        <CardMedia
          component="img"
          height="200"
          image={posterSample}
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
      <Card id="card" sx={{ width: 200, height: 300, padding: 1, margin: 1 }}>
        <CardMedia
          component="img"
          height="200"
          image={posterSample}
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
      <Card id="card" sx={{ width: 200, height: 300, padding: 1, margin: 1 }}>
        <CardMedia
          component="img"
          height="200"
          image={posterSample}
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
      <Card id="card" sx={{ width: 200, height: 300, padding: 1, margin: 1 }}>
        <CardMedia
          component="img"
          height="200"
          image={posterSample}
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
    </div>
  );
}
