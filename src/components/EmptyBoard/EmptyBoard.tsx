import { useSelector } from "react-redux";
import "./EmptyBoard.scss";

import CreateColumnModal from "../CreateColumnModal/CreateColumnModal";

export default function EmptyBoard() {
  const theme = useSelector((state) => state.switchThemeReducer.theme);
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
      <CreateColumnModal />
    </div>
  );
}
