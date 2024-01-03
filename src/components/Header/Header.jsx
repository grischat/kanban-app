import logo from "../../assets/logo-mobile.svg";
import CreateColumnModal from "../CreateColumnModal/CreateColumnModal";
import { useSelector } from "react-redux";
import "../Header/Header.scss";
export default function Header() {
  const boardData = useSelector((state) => state.createColumnsReducer);
 
  return (
    <div className="header__container">
      <img id="header__logo" src={logo} alt="App logo" />
      <h2 id="header__boardName-selected">{boardData !== undefined ? boardData.boardName : ''}</h2>
      <CreateColumnModal />
    </div>
  );
}
