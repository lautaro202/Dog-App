import axios from "axios";
import {
  GET_DOGS,
  GET_DOGS_BY_NAME,
  GET_DOGS_BY_ID,
  GET_TEMPERAMENTS,
  ADD_DOGS,
} from "./constants";
import swal from "sweetalert";
export function getDogs() {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/dogs`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        dispatch({ type: GET_DOGS, payload: data });
      })
      .catch(() =>
        swal(
          "Oops",
          "Se nos escaparon los perritos, por favor intentelo mas tarde!",
          "error"
        )
      );
  };
}

export function getDogsByBreed(query) {
  return function (dispatch) {
    console.log("hola");
    axios
      .get(`http://localhost:3001/dogs?name=${query}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        dispatch({ type: GET_DOGS_BY_NAME, payload: data });
      })
      .catch(() =>
        swal(
          "Oops",
          "Hubo un error buscando a los perritos, por favor intentelo mas tarde!",
          "error"
        )
      );
  };
}

export function getTemperaments() {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/temperament/`)
      .then((res) => res.data)
      .then((data) => {
        dispatch({ type: GET_TEMPERAMENTS, payload: data });
      })
      .catch(() =>
        swal(
          "Oops",
          "Hubo un error cargando los temperamentos, por favor intentelo mas tarde!",
          "error"
        )
      );
  };
}

export function getDogsById(id) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/dogs/${id}`)
      .then((res) => res.data)
      .then((data) => {
        dispatch({ type: GET_DOGS_BY_ID, payload: data });
      })
      .catch(() =>
        swal(
          "Oops",
          "Se escapó el perrito, por favor intentelo mas tarde!",
          "error"
        )
      );
  };
}
export const addDogs = (input) => {
  let { name, height, weight, image, lifespan, temperaments } = input;
  return function (dispatch) {
    axios
      .post(`http://localhost:3001/dogs/`, {
        name,
        height,
        weight,
        image,
        lifespan,
        temperaments,
      })
      .then((data) => dispatch({ type: ADD_DOGS, payload: data.data }));
  };
};

export const setFilter = (filter) => {
  console.log("entre");
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};
