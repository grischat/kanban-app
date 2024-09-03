import { useSelector, useDispatch } from "react-redux";

import Switch from "@mui/material/Switch";
import "./ThemeBtn.scss";
import lightIcon from "../../../assets/icon-light-theme.svg";
import darkIcon from "../../../assets/icon-dark-theme.svg";
export default function ThemeBtn() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.switchThemeReducer.theme);
  const toggle = useSelector((state) => state.switchThemeReducer.toggled);
  const handleThemeSwitch = () => {
    dispatch({
      type: "switchTheme",
      payload: {
        theme: theme === "light" ? "dark" : "light",
        toggled: !toggle,
      },
    });
  };

  return (
    <div className={`themeBtn__container-${theme}`}>
      <div className="themeBtn__content">
        <img className="themeBtn__logo" src={lightIcon} alt="" />
        <Switch onClick={() => handleThemeSwitch()} checked={toggle} />
        <img className="themeBtn__logo" src={darkIcon} alt="" />
      </div>
    </div>
  );
}
