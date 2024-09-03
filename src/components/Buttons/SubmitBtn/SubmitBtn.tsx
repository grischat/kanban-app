import '../SubmitBtn/SubmitBtn.scss'

type SubmitBtnProps = {
  onClick: () => void
  btnText: string
}

export default function SubmitBtn({onClick, btnText}: SubmitBtnProps) {
  return (
    <>
      <button type="submit" className="button-submit" onClick={onClick}>
        {btnText}
      </button>
    </>
  )
}
