import {
  GET_DOGS,
  GET_DOGS_BY_NAME,
  GET_DOGS_BY_ID,
  GET_TEMPERAMENTS,
} from "./constants";
const initialState = {
  dogs: {},
  dogID: {},
  temperaments: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS: {
      return {
        ...state,
        dogs: action.payload,
      };
    }
    case GET_DOGS_BY_NAME: {
      return {
        ...state,
        dogs: action.payload,
      };
    }
    case GET_DOGS_BY_ID: {
      return {
        ...state,
        dogID: action.payload,
      };
    }
    case GET_TEMPERAMENTS: {
      return {
        ...state,
        temperaments: action.payload,
      };
    }
    default:
      return state;
  }
}
export default rootReducer;
