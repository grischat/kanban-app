import { DragDropContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import Column from "./Column";

export default function KanbanBoard(  ) {
  const [completed, setCompleted] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [backlog, setIncomplete] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setIncomplete(json.filter((task) => !task.completed));
      });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    //DO NOTHING IF SOURCE AND DESTINATION IS THE SAME WAY
    if (source.droppableId === destination.droppableId) return;

    //REMOVE FROM SOURCE ARRAY

    if (source.droppableId === "completed") {
      setCompleted((prevCompleted) =>
        removeItemById(draggableId, prevCompleted)
      );
    } else if (source.droppableId === "inprogress") {
      setInProgress((prevInprogress) =>
        removeItemById(draggableId, prevInprogress)
      );
    } else {
      setIncomplete((prevIncompleted) =>
        removeItemById(draggableId, prevIncompleted)
      );
    }

    // GET ITEM

    const task = findItemById(draggableId, [
      ...backlog,
      ...inProgress,
      ...completed,
    ]);

    //ADD ITEM
    if (destination.droppableId === "backlog") {
      setIncomplete((prevIncompleted) => [
        ...prevIncompleted,
        { ...task, completed: !task.completed },
      ]);
    } else if (destination.droppableId === "inprogress") {
      setInProgress((prevInprogress) => [
        ...prevInprogress,
        { ...task, completed: !task.completed },
      ]);
    } else {
      setCompleted((prevCompleted) => [
        ...prevCompleted,
        { ...task, completed: task.completed },
      ]);
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "start" }}>PROGRESS BOARD</h2>
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
        <Column title={"BACKLOG"} tasks={backlog} id={"backlog"} />
        <Column title={"IN PROGRESS"} tasks={inProgress} id={"inprogress"} />
        <Column title={"DONE"} tasks={completed} id={"completed"} />
      </div>
      
    </DragDropContext>
  );
}
