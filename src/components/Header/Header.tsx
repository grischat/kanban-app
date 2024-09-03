import logo from '../../assets/logo-mobile.svg';
import EditBoardBtn from '../Buttons/EditBoardBtn/EditBoardBtn';
import DropdownMenuBoards from './DropdownMenuBoards/DropdownMenuBoards';
import { useSelector } from 'react-redux';
import '../Header/Header.scss';
import {
    type RootStateBoards,
    type RootStateTheme,
} from '../SharedTypes/SharedTypes';

export default function Header() {
    
    const boardData = useSelector(
        (state: RootStateBoards) => state.boardsColumnsReducer
    );
    const theme = useSelector(
        (state: RootStateTheme) => state.switchThemeReducer.theme
    );

    const currentBoardName = boardData?.currentBoard?.boardName || '';

    return (
        <div
            className="header__container"
            style={
                theme === 'light'
                    ? { backgroundColor: '#fff' }
                    : { backgroundColor: '#2B2C37' }
            }
        >
            <img id="header__logo" src={logo} alt="App logo" />
            <div className="header__boardList">
                <h2 id="header__boardName-selected">{currentBoardName}</h2>
                <DropdownMenuBoards />
                <EditBoardBtn />
            </div>
        </div>
    );
}
