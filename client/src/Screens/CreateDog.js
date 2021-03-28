import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../Redux/actions";
import "./css/CreateDog.scss";

export default function CreateDog() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);
  const temperaments = useSelector((state) => state.temperaments);

  return (
    <div className="container">
      <div class="col-25">
        <label for="country">Temperamento</label>
      </div>
      <select id="country" name="country">
        {temperaments.map((temp) => {
          return <option value="australia">{temp.name}</option>;
        })}
      </select>
      hola
    </div>
  );
}
