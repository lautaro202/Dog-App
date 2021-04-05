import React from "react";
import "./css/Landing.scss";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
export default function Lading() {
  return (
    <div className="text-container">
      <h1>
        Welcome to.... <span class="badge bg-secondary">PUPPYPEDIA</span>
      </h1>
      <div>
        <Link style={{ textDecoration: "none", color: "black" }} to="/home">
          <Button
            style={{
              backgroundColor: "gray",
              textDecoration: "none",
              color: "white",
              marginTop: 100,
            }}
          >
            Home
          </Button>
        </Link>
      </div>
      <div className="invisible">a</div>
    </div>
  );
}
