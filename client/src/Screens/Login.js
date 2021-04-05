import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import Grid from "@material-ui/core/Grid";
import "firebase/auth";
import "@firebase/firestore";

function initializeFirebase() {
  var config = {
    apiKey: "AIzaSyDwOvI4ruKBCMbteNrkJzBoap4zzzuSgqQ",
    authDomain: "login-ac5ee.firebaseapp.com",
    projectId: "login-ac5ee",
    storageBucket: "login-ac5ee.appspot.com",
    messagingSenderId: "920335775713",
    appId: "1:920335775713:web:3e8f88513e93a17872c4a0",
  };
  //initialize firebase
  firebase.initializeApp(config);
}
initializeFirebase();
const onSubmit = (e) => {
  e.preventDefault();
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      localStorage.setItem("emailUser", user.email);
      localStorage.setItem("userName", user.displayName);
      window.location.replace("/home");
    })
    .catch((error) => {
      console.log(error);
    });
};
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://i.pinimg.com/originals/12/64/86/126486aa0b856871e4772505f9f2fee6.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginTop: 100,
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(10, 10, 10),
  },
  submit: {
    marginTop: 100,
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in with Google
        </Typography>
        <form className={classes.form}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmit}
            className={classes.submit}
          >
            Sign In with Google!
          </Button>
        </form>
      </div>
    </Grid>
  );
}
