import './AddColumnBtn.scss';

type AddColumnBtnProps = {
    btnText: string;
    onClick: () => void;
    className: string;
};

export default function AddColumnBtn({ btnText, onClick, className }: AddColumnBtnProps) {
    return (
        <>
            <button type="button" className={className} onClick={onClick}>
                {btnText}
            </button>
        </>
    );
}
