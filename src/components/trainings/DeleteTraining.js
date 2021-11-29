import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip, Typography, Zoom } from '@mui/material';
import { CancelTwoTone, CheckCircleTwoTone, DeleteTwoTone } from '@mui/icons-material';

export default function DeleteTraining(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        props.deleteTraining(props.training.value);
        handleClose();
    };

    return (
        <div>
            <Tooltip
                TransitionComponent={Zoom}
                enterDelay={300}
                leaveDelay={200}
                title={<Typography fontSize={15}>Delete training</Typography>}
                placement="left"
                arrow>
                <IconButton
                    color="error"
                    onClick={handleClickOpen}>
                    <DeleteTwoTone />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Delete this training?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deleting this training will delete it for good.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={handleConfirm} endIcon={<CheckCircleTwoTone />}>Confirm</Button>
                    <Button color="error" onClick={handleClose} endIcon={<CancelTwoTone />}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}