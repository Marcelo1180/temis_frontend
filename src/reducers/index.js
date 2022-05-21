import { combineReducers } from "redux";
import { shoppingReducer } from "../apps/pos/reducers/shoppingReducer";

const reducer = combineReducers({
  shopping: shoppingReducer,
});

export default reducer;
