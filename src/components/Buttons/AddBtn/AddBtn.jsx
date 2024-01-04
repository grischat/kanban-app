import "../AddBtn/AddBtn.scss";
export default function AddBtn({ btnText, onClick }) {
  return (
    <>
      <button type="button" className="button-add" onClick={onClick}>
        {btnText}
      </button>
    </>
  );
}
