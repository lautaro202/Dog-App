import { GET_DOGS, GET_DOGS_BY_NAME, GET_DOGS_BY_ID } from "./constants";
const initialState = {
  dogs: {},
  dogID: {},
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
    default:
      return state;
  }
}
export default rootReducer;
