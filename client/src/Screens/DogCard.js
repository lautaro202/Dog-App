import React from "react";
import { Link } from "react-router-dom";
import "./css/DogDetail.scss";

export default function DogCard(dogs) {
  return (
    <div className="container">
      {console.log(dogs)}
      <div>
        {dogs.img ? (
          <img src={dogs.img} title="Image" />
        ) : (
          <img src={dogs.image} title="Title image"></img>
        )}
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
          {console.log(dogs.temperaments)}
          {dogs.temperament ? (
            <div>{dogs.temperament}</div>
          ) : (
            <div>{dogs.temperaments[0].name}</div>
          )}
        </div>
      </div>
    </div>
  );
}
