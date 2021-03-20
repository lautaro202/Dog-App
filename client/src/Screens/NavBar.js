import React, { useState } from "react";
import "./css/NavBar.scss";
import { useDispatch } from "react-redux";
import { getDogsByBreed } from "../Redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
export default function Home() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = localStorage.getItem("userName");
  const logOut = (e) => {
    localStorage.removeItem("userName");
    window.location.reload();
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };
  const searchDogs = (e) => {
    console.log("estoy accionando");
    e.preventDefault();
    dispatch(getDogsByBreed(input));
    setInput("");
  };

  return (
    <Container>
      <AppBar style={{ height: 80 }}>
        <ToolBar variant="dense">
          {!user ? (
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Welcome!
            </Link>
          ) : (
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Welcome! {user}
            </Link>
          )}
          <form
            onSubmit={(e) => searchDogs(e)}
            style={{ margin: "auto", width: 600 }}
            className="searchbar"
          >
            <div className="search__container">
              <p className="search__title"></p>
              <input
                style={{ margin: 0, position: "relative", top: -15 }}
                onChange={handleChange}
                onSubmit={searchDogs}
                className="search__input"
                type="text"
                placeholder="Realice su búsqueda..."
              />
            </div>
          </form>
          {!user ? (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/login"
            >
              Login
            </Link>
          ) : (
            <Button
              style={{ textDecoration: "none", color: "white", marginTop: 10 }}
              onClick={logOut}
            >
              Logout
            </Button>
          )}
        </ToolBar>
      </AppBar>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "inherit",
    margin: "auto",
  },
  inputInput: {
    margin: "auto",
  },
}));
