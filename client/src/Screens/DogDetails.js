import React, { useEffect } from "react";
import { getDogsById } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function DogDetails(props) {
  const dispatch = useDispatch();
  console.log(props.match.params.id);
  useEffect(() => {
    dispatch(getDogsById(props.match.params.id));
  }, []);
  const dog = useSelector((state) => state.dogID);
  if (Object.keys(dog).length === 0)
    return (
      <div style={{ marginTop: 100, textAlign: "center" }}>No Puppies!</div>
    );
  return <div style={{ textAlign: "center", marginTop: 300 }}>{dog.name}</div>;
}
