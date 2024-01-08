import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ThemeBtn from "../../Buttons/ThemeBtn/ThemeBtn";
import dropdownIconDown from "../../../assets/icon-chevron-down.svg";
import dropdownIconUp from "../../../assets/icon-chevron-up.svg";
import "./DropdownMenuBoards.scss";

export default function DropdownMenuBoards() {
  const [open, setOpen] = useState(false);
  const handleOpenClose = () => setOpen(!open);
  const allBoards = useSelector(
    (state) => state.createColumnsReducer.allBoards
  );
  const theme = useSelector((state) => state.switchThemeReducer.theme);
  const dispatch = useDispatch();
  const handleSelectedItem = (board) => {
    dispatch({
      type: "selectBoard",
      payload: { boardName: board.boardName, columns: board.columns },
    });
  };
  return (
    <Dropdown onOpenChange={handleOpenClose}>
      <MenuButton className="boardsMenu__btn">
        <img
          src={open ? dropdownIconUp : dropdownIconDown}
          alt="dropdown icon button"
        />
      </MenuButton>
      <Menu className={`boardsMenu-${theme}`}>
        <p>{`ALL BOARDS (${allBoards.length})`}</p>
        {allBoards.map((el, index) => (
          <MenuItem
            onClick={() => handleSelectedItem(el)}
            className="boardsMenu__item"
            key={index}
          >
            {el.boardName}
          </MenuItem>
        ))}
        <ThemeBtn />
      </Menu>
    </Dropdown>
  );
}
