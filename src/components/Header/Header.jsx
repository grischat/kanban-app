import logo from "../../assets/logo-mobile.svg";

import DropdownMenuBoards from "./DropdownMenuBoards/DropdownMenuBoards";
import { useSelector } from "react-redux";
import "../Header/Header.scss";

export default function Header() {
  const boardData = useSelector((state) => state.createColumnsReducer);
  const theme = useSelector((state) => state.switchThemeReducer.theme);
  return (
    <div
      className="header__container"
      style={
        theme === "light"
          ? { backgroundColor: "#fff"}
          : { backgroundColor: "#2B2C37" }
      }
    >
      <img id="header__logo" src={logo} alt="App logo" />
      <div className="header__boardList">
        <h2 id="header__boardName-selected">
          {boardData !== undefined ? boardData.currentBoard.boardName : ""}
        </h2>
        <DropdownMenuBoards />
      </div>
      
      
    </div>
  );
}
