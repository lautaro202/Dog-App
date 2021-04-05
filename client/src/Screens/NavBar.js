import React, { useState } from "react";
import "./css/NavBar.scss";
import { useDispatch } from "react-redux";
import { getDogsByBreed } from "../Redux/actions";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

export default function Home() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const user = localStorage.getItem("userName");
  const email = localStorage.getItem("emailUser");

  const logOut = (e) => {
    localStorage.removeItem("userName");
    localStorage.removeItem("emailUser");
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

  const reload = () => {
    window.location.reload();
    window.location.replace("/home");
  };
  const check = useRouteMatch("/home");

  return (
    <Container>
      {console.log(email)}
      <AppBar style={{ height: 80 }}>
        <ToolBar variant="dense">
          {!user ? (
            <div
              style={{
                textDecoration: "none",
                color: "white",
                cursor: "pointer",
              }}
              onClick={reload}
              to="/"
            >
              Welcome {user}
            </div>
          ) : (
            <div
              onClick={reload}
              style={{
                textDecoration: "none",
                color: "white",
                cursor: "pointer",
              }}
              to="/"
            >
              {email === "lautaropaez308@gmail.com" ? (
                <div>Welcome {email}</div>
              ) : (
                <div>Welcome {user}</div>
              )}{" "}
            </div>
          )}
          <form
            onSubmit={(e) => searchDogs(e)}
            style={{ margin: "auto", width: 600 }}
            className={`search-${check?.isExact ? "active" : "inactive"}`}
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
          {email === "lautaropaez308@gmail.com" ? (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/addog"
            >
              <Button
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginTop: 10,
                }}
              >
                Add Dog
              </Button>{" "}
            </Link>
          ) : null}{" "}
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
