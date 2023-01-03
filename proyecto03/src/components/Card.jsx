import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BasicGrid } from "./Types.jsx";

function MediaCard({ urlImage, name, id, types }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 300 }} image={urlImage} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardContent>
        <BasicGrid types={types} />
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small">
          Photos
        </Button>
      </CardActions>
    </Card>
  );
}

export { MediaCard };
