import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import Column from "../Column/Column";

export default function KanbanBoard() {
  
  const boardData = useSelector((state) => state.createColumnsReducer);
  if (!boardData || !boardData.columns) {
    return null;
  }
  return (
    <DragDropContext>
      <h2 style={{ textAlign: "start" }}>
        {boardData.boardName ? boardData.boardName : ""}
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: "auto",
          height: "auto",
        }}
      >
        {boardData.columns !== undefined
          ? boardData.columns.map((column, index) => (
              <Column key={index} title={column} id={index} tasks={[]} />
            ))
          : null}
      </div>
    </DragDropContext>
  );
}
