import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import EmptyBoard from "./components/EmptyBoard/EmptyBoard";
import "./App.scss";
function App() {
  const theme = useSelector((state) => state.switchThemeReducer.theme);
  const boardColumns = useSelector(
    (state) => state.createColumnsReducer.columns
  );
  const noColumns =
    boardColumns.length === 0 ||
    boardColumns === null ||
    boardColumns === undefined;

  console.log(noColumns);
  return (
    <div className={`app__container-${theme}`}>
      <Header></Header>

      {noColumns ? <EmptyBoard /> : <KanbanBoard />}
    </div>
  );
}

export default App;
