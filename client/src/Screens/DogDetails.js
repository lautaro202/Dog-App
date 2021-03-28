import React, { useEffect } from "react";
import { getDogsById } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "./css/DogCard.scss";

export default function DogDetails(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(getDogsById(id));
  }, []);
  const dog = useSelector((state) => state.dogID);
  if (Object.keys(dog).length === 0)
    return (
      <div style={{ marginTop: 100, textAlign: "center" }}>No Puppies!</div>
    );
  return (
    <div class="card">
      {console.log(dog)}
      <div class="container">
        <img src={dog.img}></img>
        <h4>
          <b style={{ marginLeft: 670 }}>{dog.name}</b>
        </h4>
        <p style={{ marginLeft: 600 }}>{dog.temperament}</p>
        <p style={{ marginLeft: 600 }}>Life Span: {dog.lifespan}</p>
        <p style={{ marginLeft: 600 }}>Weight: {dog.weight} KG</p>
        <p style={{ marginLeft: 600 }}>Height: {dog.height} </p>
      </div>
    </div>
  );
}
