import React from "react";
import "./css/NavBar.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
export default function Home() {
  const classes = useStyles();

  return (
    <Container>
      <AppBar>
        <ToolBar variant="dense">
          <div className='welcome'>
            Welcome!
          </div>
          <InputBase
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            placeholder="Search a Breed!"
          ></InputBase>
          <Button className='welcome' style={{textDecoration:'none', color:'white'}}>
              Login
          </Button>
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
