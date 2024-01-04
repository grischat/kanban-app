import '../BtnSubmit/SubmitBtn.scss'

export default function SubmitBtn({onClick, btnText}) {
  return (
    <>
      <button type="submit" className="button-submit" onClick={onClick}>
        {btnText}
      </button>
    </>
  )
}
