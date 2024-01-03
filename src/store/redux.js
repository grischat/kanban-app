import { createStore, combineReducers } from "redux";


const createColumnsReducer = (
  state = { boardName: null, columns: null },
  action
) => {
  if (action.type === "addBoard") {
    
    return {
      boardName: action.payload.boardName,
      columns: [...action.payload.columns],
    };
  }
  return state;
};

const store = createStore(
  combineReducers({
    createColumnsReducer,
    
  })
);


export default store;
