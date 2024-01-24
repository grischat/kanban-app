import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import Column from "../Column/Column";

export default function KanbanBoard() {
  const boardData = useSelector((state) => state.createColumnsReducer);
  const theme = useSelector((state) => state.switchThemeReducer.theme);
  if (
    !boardData ||
    !boardData.currentBoard ||
    !boardData.currentBoard.columns
  ) {
    return null;
  }

  const { columns } = boardData.currentBoard;

  return (
    <DragDropContext>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          position: "relative",
          top: "4rem",
          width: "100%",
          backgroundColor: theme === "light" ? "#e4ebfa" : "#222223",
        }}
      >
        {columns.map((column, index) => (
          <Column key={index} title={column} id={index} tasks={[]} />
        ))}
      </div>
    </DragDropContext>
  );
}
