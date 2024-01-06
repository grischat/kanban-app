import "./AddColumnBtn.scss";
export default function AddColumnBtn({ btnText, onClick, className }) {
  return (
    <>
      <button type="button" className={className} onClick={onClick}>
        {btnText}
      </button>
    </>
  );
}
