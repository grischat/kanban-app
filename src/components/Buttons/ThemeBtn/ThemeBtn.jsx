import { useSelector, useDispatch } from "react-redux";

export default function ThemeBtn() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.switchThemeReducer.theme);
  const handleThemeSwitch = () => {
    dispatch({
      type: "switchTheme",
      payload: { theme: theme === "light" ? "dark" : "light" },
    });
  };
  return (
    <>
      <button onClick={handleThemeSwitch} type="button">
        Switch theme
      </button>
    </>
  );
}
