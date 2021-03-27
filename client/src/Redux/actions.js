import axios from "axios";
import { GET_DOGS, GET_DOGS_BY_NAME, GET_DOGS_BY_ID } from "./constants";
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
        swal("Oops", "Hubo un error, por favor intentelo mas tarde!", "error")
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
        swal("Oops", "Hubo un error, por favor intentelo mas tarde!", "error")
      );
  };
}

export function getDogsById(id) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/dogs/${id}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        dispatch({ type: GET_DOGS_BY_ID, payload: data });
      })
      .catch(() =>
        swal("Oops", "Hubo un error, por favor intentelo mas tarde!", "error")
      );
  };
}
