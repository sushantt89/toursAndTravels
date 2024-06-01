import { combineReducers } from "redux";
import ToursStore from "../components/Featured-tours/reducer";

const rootReducer = combineReducers({
  toursStore: ToursStore,
});

export default rootReducer;
