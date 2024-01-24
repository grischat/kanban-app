import Task from "../Task/Task";
import { Droppable } from "react-beautiful-dnd";
import "./Column.scss";

export default function Column({ title, tasks, id }) {
  return (
    <div className="column__container">
      <p className="column__title">{title}</p>
      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Task key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
