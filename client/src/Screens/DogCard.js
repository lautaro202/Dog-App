import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

export default function DogCard(dogs) {
  const classes = useStyles();
  return (
    <Grid xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={dogs.img}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            <Link
              to={`/dogs/${dogs.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {dogs.name}
            </Link>
          </Typography>
          <Typography>{dogs.temperament}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));
