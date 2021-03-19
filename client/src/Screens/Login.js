
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from "firebase/app"
import "firebase/auth"
import '@firebase/firestore'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        PuppyPedia
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function initializeFirebase(){    
    var config = {
        apiKey: "AIzaSyDwOvI4ruKBCMbteNrkJzBoap4zzzuSgqQ",
        authDomain: "login-ac5ee.firebaseapp.com",
        projectId: "login-ac5ee",
        storageBucket: "login-ac5ee.appspot.com",
        messagingSenderId: "920335775713",
        appId: "1:920335775713:web:3e8f88513e93a17872c4a0"
      };   
      //initialize firebase  
      firebase.initializeApp(config);  
   }
initializeFirebase()
 const onSubmit = (e) =>  {
     e.preventDefault()
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
        localStorage.setItem('emailUser', user.email)
        localStorage.setItem('userName', user.displayName)
        window.location.replace('/')

    }).catch((error) => {
        console.log(error)
    });
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop:200
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
      
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in with Google
        </Typography>
        <form className={classes.form} >
            
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}