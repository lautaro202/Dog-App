import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
export default function DogCard(dogs) {
  const classes = useStyles();

  return (
    <Card
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Link to={`/dogs/${dogs.id}`}></Link>
      <CardActionArea>
        <div>
          {dogs.id ? (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/dogs/${dogs.id}`}
            >
              <Typography
                style={{ textDecoration: "none" }}
                gutterBottom
                variant="h5"
                component="h2"
              >
                {dogs.name}
              </Typography>{" "}
            </Link>
          ) : (
            <Link
              onClick={() => {
                return window.location.reload();
              }}
            >
              <h5>{dogs.name}</h5>
            </Link>
          )}
        </div>
        <CardMedia
          className={classes.media}
          image={dogs.img}
          title="Contemplative Reptile"
        ></CardMedia>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {dogs.temperament}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://free4kwallpapers.com/uploads/originals/2020/05/09/puppy-dog-wallpaper.jpg')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));
