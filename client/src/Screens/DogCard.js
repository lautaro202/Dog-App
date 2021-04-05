import React from "react";
import { Link } from "react-router-dom";
import "./css/DogDetail.scss";

export default function DogCard(dogs) {
  return (
    <div className="container">
      <div>
        <img src={dogs.img} title="Image title" />
        <div>
          <div>
            <Link
              to={`/dogs/${dogs.id}`}
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {dogs.name}
            </Link>
          </div>
          <div>{dogs.temperament}</div>
        </div>
      </div>
    </div>
  );
}
