import KanbanBoard from "./components/KanbanBoard";
import CreateColumnModal from "./components/CreateColumnModal/CreateColumnModal";
function App() {
  return (
    <>
      <CreateColumnModal />
      <KanbanBoard></KanbanBoard>
    </>
  );
}

export default App;
