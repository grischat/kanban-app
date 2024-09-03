import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { type Board } from '../components/SharedTypes/SharedTypes';
import storage from 'redux-persist/lib/storage';

type State = { currentBoard: Board<string>; allBoards: Board<string>[] };

type AddBoardAction = { type: 'addBoard'; payload: Board<string> };
type EditBoardAction = { type: 'editBoard'; payload: Board<string> };
type DeleteBoardAction = { type: 'deleteBoard'; payload: Board<string> };
type AddColumnAction = { type: 'addColumn'; payload: { columns: string[] } };
type SelectBoardAction = { type: 'selectBoard'; payload: Board<string> };

type ActionBoard =
    | AddBoardAction
    | EditBoardAction
    | DeleteBoardAction
    | SelectBoardAction;

type ActionColumn = AddColumnAction;

type ActionTheme = {
    type: 'switchTheme';
    payload: { theme: string; toggled: boolean };
};

const initialState = {
    currentBoard: { boardName: 'Dummy', columns: [] },
    allBoards: [],
};

const boardsColumnsReducer = (
    state: State = initialState,
    action: ActionBoard | ActionColumn
) => {
    if (action.type === 'addBoard') {
        const newBoard: Board<string> = {
            boardName: action.payload.boardName,
            columns: [...action.payload.columns],
        };

        return {
            ...state,
            currentBoard: newBoard,
            allBoards: [...state.allBoards, newBoard], // Add the new board to the array
        };
    }

    if (action.type === 'editBoard') {
        const editedCurrentBoard: Board<string> = {
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

    if (action.type === 'deleteBoard') {
        const selectedBoard = {
            boardName: action.payload.boardName || '',
            columns: [...action.payload.columns],
        };

        const updatedBoards = state.allBoards.filter(
            (board) =>
                board.boardName !== selectedBoard.boardName &&
                board.boardName !== null
        );

        const isBoardExisting =
            updatedBoards.length > 0 ? updatedBoards[0] : null;

        return {
            ...state,
            currentBoard: isBoardExisting,
            allBoards: updatedBoards,
        };
    }

    if (action.type === 'addColumn') {
        return {
            ...state,
            currentBoard: {
                ...state.currentBoard,
                columns: [
                    ...state.currentBoard.columns,
                    ...action.payload.columns,
                ],
            }, // For the first we are updating current board locally
            allBoards: state.allBoards.map((board) =>
                board.boardName === state.currentBoard.boardName
                    ? {
                          ...board,
                          columns: [
                              ...board.columns,
                              ...action.payload.columns,
                          ],
                      }
                    : board
            ), //Update an updated column of the current picked board in ALL boards store
        };
    }
    if (action.type === 'selectBoard') {
        const selectedBoard = {
            boardName: action.payload.boardName || '',
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
    state = { theme: 'light', toggled: false },
    action: ActionTheme
) => {
    if (action.type === 'switchTheme') {
        return {
            theme: action.payload.theme,
            toggled: action.payload.toggled,
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
    boardsColumnsReducer,
    switchThemeReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
export const clearPersistedState = () => {
    persistor.purge();
};
