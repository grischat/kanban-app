import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import { useState } from "react";
import { useSelector } from "react-redux";
import DeleteBoardBtn from "./DeleteBoardBtn/DeleteBoardBtn";
import BoardModal from "../../BoardModal/BoardModal";
import threeDots from "../../../assets/icon-vertical-ellipsis.svg";
import "./EditBoardBtn.scss";
export default function EditBoardBtn() {
  const [open, setOpen] = useState(false);
  const handleOpenClose = () => setOpen(!open);
  const theme = useSelector((state) => state.switchThemeReducer.theme);
  const currentBoard = useSelector(
    (state) => state.createColumnsReducer.currentBoard
  );
  return (
    <Dropdown open={open}>
      <MenuButton className="editBoards__btn" onClick={handleOpenClose}>
        <img src={threeDots} alt="three dots menu icon" />
      </MenuButton>
      <Menu className={`editBoards-${theme}`}>
        <MenuItem id="editBoards__item">
          <BoardModal
            mode={"edit"}
            initialValues={{
              boardName: currentBoard.boardName,
              columns: currentBoard.columns || [""],
            }}
            buttonText={"Edit Board"}
          />
          <DeleteBoardBtn />
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
