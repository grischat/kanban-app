import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import './CloseModal.scss';
import { useSelector } from 'react-redux';
import {
    type RootStateTheme,
    type BackgroundStyle,
} from '../SharedTypes/SharedTypes';

type CloseModalProps = {
    open: boolean;
    onClose: () => void;
    handleCancelClick: () => void;
    handleConfirmClick: () => void;
};

export default function CloseModal({
    open,
    onClose,
    handleCancelClick,
    handleConfirmClick,
}: CloseModalProps) {
    const theme = useSelector(
        (state: RootStateTheme) => state.switchThemeReducer.theme
    );

    const lightBg: BackgroundStyle = {
        backgroundColor: '#fff',
    };
    const darkBg: BackgroundStyle = {
        backgroundColor: '#2B2C37',
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={
                    theme === 'light' ? { style: lightBg } : { style: darkBg }
                }
            >
                <DialogTitle className={`dialog__header`}>
                    Confirmation
                </DialogTitle>
                <DialogContent className={`dialog__content`}>
                    Are you sure you want to close the window? All unsaved
                    changes will be lost.
                </DialogContent>
                <DialogActions style={{ flexDirection: 'column' }}>
                    <Button className="confirmBtn" onClick={handleConfirmClick}>
                        Confirm
                    </Button>
                    <Button
                        className={`cancelBtn-${theme}`}
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
