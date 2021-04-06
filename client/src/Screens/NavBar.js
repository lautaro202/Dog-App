import React, { useState } from "react";
import "./css/NavBar.scss";
import { useDispatch } from "react-redux";
import { getDogsByBreed } from "../Redux/actions";
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
  };
  const searchDogs = (e) => {
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
    <div>
      <div style={{ height: 80, backgroundColor: "#0D90D4" }}>
        <ToolBar>
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
              <button
                className="btn btn-primary"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginTop: 10,
                }}
              >
                Add Dog
              </button>{" "}
            </Link>
          ) : null}{" "}
          {!user ? (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/login"
            >
              <button
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginTop: 10,
                }}
                className="btn btn-primary"
              >
                {" "}
                Login
              </button>
            </Link>
          ) : (
            <button
              className="btn btn-primary"
              style={{ textDecoration: "none", color: "white", marginTop: 10 }}
              onClick={logOut}
            >
              Logout
            </button>
          )}
        </ToolBar>
      </div>
    </div>
  );
}
