import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip, Typography, Zoom } from '@mui/material';
import { CancelTwoTone, CheckCircleTwoTone, DeleteTwoTone } from '@mui/icons-material';

export default function DeleteCustomer(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        props.deleteCustomer(props.customer.value);
        handleClose();
    };

    return (
        <div>
            <Tooltip
                TransitionComponent={Zoom}
                enterDelay={300}
                leaveDelay={200}
                title={<Typography fontSize={15}>Delete customer</Typography>}
                placement="left"
                arrow>
                <IconButton
                    color="error"
                    onClick={handleClickOpen}>
                    <DeleteTwoTone />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Delete this customer?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deleting this customer will also delete all of their trainings.
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