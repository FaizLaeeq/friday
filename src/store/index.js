import { legacy_createStore } from "redux";

const initialState = { params: "", data: [], url: "" };

const globalReducer = (state = initialState, action) => {
  if (action.type === "SETPARAM")
    return {
      ...state,
      params: action.payload,
      url: `https://api.github.com/users/${action.payload}/repos?type=all&sort=updated`,
    };
  if (action.type === "SETDATA")
    return {
      ...state,
      data: action.payload,
    };
  else return state;
};

const store = legacy_createStore(globalReducer);

export default store;
