import { useDispatch, useSelector } from 'react-redux';
import { type RootStateColumns } from '../../../SharedTypes/SharedTypes';
import './DeleteBoardBtn.scss';

export default function DeleteBoardBtn() {
    const dispatch = useDispatch();
    const currentBoard = useSelector(
        (state: RootStateColumns) => state.boardsColumnsReducer.currentBoard
    );

    const handleDeleteBoard = () => {
        dispatch({ type: 'deleteBoard', payload: currentBoard });
    };

    return (
        <>
            <button
                className="delete__button"
                onClick={handleDeleteBoard}
                type="button"
            >
                Delete Board
            </button>
        </>
    );
}
