import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
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
//redux-persist
const persistConfig = {
  key: 'root',
  storage,
};
const rootReducer = combineReducers({
  createColumnsReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);



