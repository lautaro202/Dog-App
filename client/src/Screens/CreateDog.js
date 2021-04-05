import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, addDogs } from "../Redux/actions";
import "./css/CreateDog.scss";
import swal from "sweetalert";

export default function CreateDog() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    lifespan: "",
    image: "",
    temperaments: "",
  });

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(addDogs(input));
    setInput({
      name: "",
      temperaments: "",
      height: "",
      weight: "",
      lifespan: "",
      image: "",
    });

    swal({
      title: "Good job!",
      text: "Dog created succesfully!",
      icon: "success",
      button: "Aww yiss!",
    });
  };

  const temperaments = useSelector((state) => state.temperaments);

  return (
    <div className="contenedor">
      <form onSubmit={handleSubmit} className="form-group">
        <div className="form-group" style={{ maxWidth: 300 }}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Height: </label>
          <input
            type="number"
            name="height"
            value={input.height}
            onChange={handleInputChange}
          />
          <label> (metric)</label>
        </div>
        <div className="form-group">
          <label>Weight: </label>
          <input
            type="number"
            name="weight"
            value={input.weight}
            onChange={handleInputChange}
          />
          <label> (metric)</label>
        </div>
        <div className="form-group">
          <label>lifespan: </label>
          <input
            type="number"
            name="lifespan"
            value={input.lifespan}
            onChange={handleInputChange}
          />
          <label> (years)</label>
        </div>
        <span className="temp">
          <label for="temperaments">Temperaments: </label>
        </span>
        <select
          value={input.temperaments}
          onChange={handleInputChange}
          id="temperaments"
          name="temperaments"
        >
          {temperaments.map((temp) => {
            return <option value={temp.name}>{temp.name}</option>;
          })}
          {console.log(input.temperaments)}
        </select>
        <div className="form-group">
          <label>URL or URLS of images: </label>
          <textarea
            type="text"
            name="image"
            value={input.image}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            className="btn btn-info"
            type="submit"
            value="Add dog"
            disabled={
              !input.name || !input.height || !input.temperaments || false
            }
          ></input>
        </div>
      </form>
    </div>
  );
}
