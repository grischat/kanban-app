import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialState = {
  currentBoard: { boardName: null, columns: null },
  allBoards: [], // New array to store all created boards
};

const createColumnsReducer = (state = initialState, action) => {
  if (action.type === "addBoard") {
    
    const newBoard = {
      boardName: action.payload.boardName,
      columns: [...action.payload.columns],
    };

    return {
      ...state,
      currentBoard: newBoard,
      allBoards: [...state.allBoards, newBoard], // Add the new board to the array
    };
  }
  if (action.type === "addColumn") {
    return {
      ...state,
      currentBoard: {
        ...state.currentBoard,
        columns: [...state.currentBoard.columns, ...action.payload.columns],
      },
      allBoards: state.allBoards.map((board) =>
        board.boardName === state.currentBoard.boardName
          ? {
              ...board,
              columns: [...board.columns, ...action.payload.columns],
            }
          : board
      ),
    };
  }
  return state;
};

const switchThemeReducer = (state = { theme: "dark" }, action) => {
  if (action.type === "switchTheme") {
    return {
      theme: action.payload.theme,
    };
  }
  return state;
};
//redux-persist
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  createColumnsReducer,
  switchThemeReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
