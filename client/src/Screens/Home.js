import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Dog from "./DogCard";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { getDogs } from "../Redux/actions";
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
    fontFamily: "roboto",
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

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const dog = useSelector((state) => state.dogs);
  if (Object.keys(dog).length === 0)
    return (
      <div style={{ marginTop: 100, textAlign: "center" }}>No Puppies!</div>
    );
  console.log(dog);
  const currentPosts = dog.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="App">
      <Box className={classes.hero}>
        <Box>PuppyPedia</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Breeds
        </Typography>
        {!dog ? <div>No existen perros</div> : null}
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {currentPosts.map((dogs) => (
              <Dog
                key={dogs.id}
                id={dogs.id}
                name={dogs.name}
                temperament={dogs.temperament}
                img={dogs.img}
              ></Dog>
            ))}
            <Pagination
              postPerPage={postPerPage}
              paginate={paginate}
              totalPosts={dog.length}
            />
          </Grid>
        </Container>
      </Container>
    </div>
  );
}
