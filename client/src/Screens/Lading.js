import React from "react";
import "./css/Landing.scss";
import { Link } from "react-router-dom";
export default function Lading() {
  return (
    <div style={{ marginTop: 0 }} className="text-container">
      <h1>
        Welcome to.... <span class="badge bg-secondary">PUPPYPEDIA</span>
      </h1>
      <div>
        <Link style={{ textDecoration: "none", color: "black" }} to="/home">
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: "gray",
              textDecoration: "none",
              color: "white",
              marginTop: 100,
            }}
          >
            Home
          </button>
        </Link>
      </div>
      <div className="invisible">a</div>
    </div>
  );
}
