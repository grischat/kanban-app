// Common types used in the project
export type BackgroundStyle = {
    backgroundColor: string;
};

//redux types
export type RootStateTheme = {
    switchThemeReducer: {
        theme: string;
    };
};

export type RootStateColumns = {
    boardsColumnsReducer: {
        currentBoard: {
            boardName: string;
            columns: any;
        };
    };
};
export type RootStateCurrentBoard = {
    boardsColumnsReducer: {
        currentBoard: Board<string>;
        allBoards: Board<string>[];
    };
};
export type RootStateBoards = {
    boardsColumnsReducer: {
        currentBoard: Board<string>;
        allBoards: Board<string>[];
    };
};
export type TaskType = {
    id: string;
    title: string;
};
export type Board<T> = { boardName: T; columns: T[] };
