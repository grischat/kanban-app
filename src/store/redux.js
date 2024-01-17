import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialState = {
  currentBoard: { boardName: "Dummy", columns: null },
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

  if (action.type === "editBoard") {
    const editedCurrentBoard = {
      boardName: action.payload.boardName,
      columns: [...action.payload.columns],
    };
    const updatedAllBoards = state.allBoards.map((board, index) =>
      index ===
      state.allBoards.findIndex(
        (b) => b.boardName === state.currentBoard.boardName
      )
        ? editedCurrentBoard
        : board
    );

    return {
      ...state,
      currentBoard: editedCurrentBoard,
      allBoards: updatedAllBoards,
    };
  }

  if (action.type === "deleteBoard") {
    const selectedBoard = {
      boardName: action.payload.boardName || "",
      columns: [...action.payload.columns],
    };

    const updatedBoards = state.allBoards.filter(
      (board) =>
        board.boardName !== selectedBoard.boardName && board.boardName !== null
    );

    const isBoardExisting = updatedBoards.length > 0 ? updatedBoards[0] : null;

    return {
      ...state,
      currentBoard: isBoardExisting,
      allBoards: updatedBoards,
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
      boardName: action.payload.boardName || "",
      columns: [...action.payload.columns] || [],
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
