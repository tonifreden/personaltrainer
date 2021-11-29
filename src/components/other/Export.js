import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CancelTwoTone, CheckCircleTwoTone, Download } from '@mui/icons-material';

export default function Export(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        props.exportCustomers();
        handleClose();
    };

    return (
        <div>
            <Button
                color="success"
                variant="contained"
                onClick={handleClickOpen}
                endIcon={<Download />}>
                Export...
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Export all customers to a CSV file?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Clicking "Confirm" will start the download.
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