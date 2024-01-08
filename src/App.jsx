import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import EmptyBoard from "./components/EmptyBoard/EmptyBoard";
import "./App.scss";
function App() {
  const theme = useSelector((state) => state.switchThemeReducer.theme);
  const boardColumns = useSelector(
    (state) => state.createColumnsReducer.currentBoard.columns
  );
  const noColumns = boardColumns === null || boardColumns === undefined || boardColumns.length === 0;

  return (
    <div className={`app__container-${theme}`}>
      <Header></Header>
    
      {noColumns ? <EmptyBoard /> : <KanbanBoard />}
    </div>
  );
}

export default App;
