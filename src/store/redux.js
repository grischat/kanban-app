import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialState = {
  currentBoard: { boardName: null, columns: null },
  allBoards: [],
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
      }, // For the first we are updating current board locally
      allBoards: state.allBoards.map((board) =>
        board.boardName === state.currentBoard.boardName
          ? {
              ...board,
              columns: [...board.columns, ...action.payload.columns],
            }
          : board
      ), //Update an updated column of the current picked board in ALL boards store
    };
  }
  if (action.type === "selectBoard") {
    const selectedBoard = {
      boardName: action.payload.boardName,
      columns: [...action.payload.columns],
    };
    return {
      ...state,
      currentBoard: selectedBoard,
      allBoards: [...state.allBoards],
    };
  }
  return state;
};

const switchThemeReducer = (
  state = { theme: "light", toggled: false },
  action
) => {
  if (action.type === "switchTheme") {
    return {
      theme: action.payload.theme,
      toggled: action.payload.toggled,
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
export const clearPersistedState = () => {
  persistor.purge();
};
