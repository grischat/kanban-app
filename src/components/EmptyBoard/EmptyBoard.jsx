import { useSelector } from "react-redux";
import "./EmptyBoard.scss";
import BoardModal from "../BoardModal/BoardModal";

export default function EmptyBoard() {
  const theme = useSelector((state) => state.switchThemeReducer.theme);
  const boardName = useSelector(
    (state) => state.createColumnsReducer.currentBoard.boardName
  );
  console.log(boardName);
  return (
    <div
      className="emptyBoard__container"
      style={
        theme === "light"
          ? { backgroundColor: "#F4F7FD" }
          : { backgroundColor: "#20212C" }
      }
    >
      <h2 className="emptyBoard__text">
        This board is empty. Create a new <br /> column to get started.
      </h2>
      <div className="emptyBoard__button">
        <BoardModal
          mode="edit"
          initialValues={{
            boardName: boardName,
            columns: [""],
          }}
        />
        <p className="emptyBoard__btnText">+ Add New Column</p>
      </div>
    </div>
  );
}
