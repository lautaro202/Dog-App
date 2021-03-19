import React from "react";
import "./css/NavBar.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import {Link} from 'react-router-dom'
export default function Home() {
  const classes = useStyles();
  const user = localStorage.getItem('userName')
  const logOut = (e) => {
    localStorage.removeItem('userName')
    window.location.reload()
  }
  return (
    <Container>
      {console.log(user)}
      <AppBar>
        <ToolBar variant="dense">
          {!user ? <Link style={{textDecoration:'none', color:'white'}} to='/'>Welcome!</Link> :  <Link style={{textDecoration:'none', color:'white'}} to='/'>Welcome! {user}</Link> }
          <InputBase
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            placeholder="Search a Breed!"
          ></InputBase>
              {!user ? <Link  style={{textDecoration:'none', color:'white'}} to='/login'>Login</Link> : <Button onClick={logOut}>Logout</Button> }
        </ToolBar>
      </AppBar>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({ 
  inputRoot: {
    color: "inherit",
    margin:'auto'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },

}));
