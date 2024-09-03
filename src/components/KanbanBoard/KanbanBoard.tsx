import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import Column from '../Column/Column';
import { type RootStateColumns } from '../SharedTypes/SharedTypes';

export default function KanbanBoard() {
  
    const boardData = useSelector(
        (state: RootStateColumns) => state.boardsColumnsReducer
    );

    if (
        !boardData ||
        !boardData.currentBoard ||
        !boardData.currentBoard.columns
    ) {
        return null;
    }

    const { boardName, columns } = boardData.currentBoard;

    return (
        <DragDropContext>
            <h2 style={{ textAlign: 'start' }}>{boardName}</h2>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: 'auto',
                    height: 'auto',
                }}
            >
                {columns.map((column: string, index) => (
                    <Column key={index} title={column} id={index} tasks={[]} />
                ))}
            </div>
        </DragDropContext>
    );
}
