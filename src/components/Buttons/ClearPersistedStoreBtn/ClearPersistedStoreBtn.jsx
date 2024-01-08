import { clearPersistedState } from "../../../store/redux";

const ClearPersistedStoreBtn = () => {
  const handleClearPersistedState = () => {
    clearPersistedState();
  };

  return (
    <button onClick={handleClearPersistedState}>Clear Persisted State</button>
  );
};

export default ClearPersistedStoreBtn;
