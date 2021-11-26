import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip, Typography, Zoom } from '@mui/material';
import { CancelTwoTone, CheckCircleTwoTone, EditTwoTone } from '@mui/icons-material';

export default function EditCustomer(props) {
    const customerInitialState = {
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    };

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState(customerInitialState);

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.data.firstname,
            lastname: props.customer.data.lastname,
            streetaddress: props.customer.data.streetaddress,
            postcode: props.customer.data.postcode,
            city: props.customer.data.city,
            email: props.customer.data.email,
            phone: props.customer.data.phone
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.editCustomer(props.customer.value, customer);
        handleClose();
    };

    const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            handleSave();
        };
    };

    const inputChanged = e => {
        setCustomer({...customer, [e.target.name]: e.target.value});
    };

    return (
        <div>
            <Tooltip
                TransitionComponent={Zoom}
                enterDelay={300}
                leaveDelay={200}
                title={<Typography fontSize={15}>Edit customer</Typography>}
                placement="left"
                arrow>
                <IconButton
                    color="info"
                    onClick={handleClickOpen}>
                    <EditTwoTone />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={inputChanged}
                        label="First name"
                        fullWidth
                        variant="outlined"
                        onKeyPress={handleEnterKey}
                        />
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={inputChanged}
                        label="Last name"
                        fullWidth
                        variant="outlined"
                        onKeyPress={handleEnterKey}
                        />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={inputChanged}
                        label="Street address"
                        fullWidth
                        variant="outlined"
                        onKeyPress={handleEnterKey}
                        />
                    <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={inputChanged}
                        label="Postal code"
                        fullWidth
                        variant="outlined"
                        onKeyPress={handleEnterKey}
                        />
                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={inputChanged}
                        label="City"
                        fullWidth
                        variant="outlined"
                        onKeyPress={handleEnterKey}
                        />
                    <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={inputChanged}
                        label="Email"
                        fullWidth
                        variant="outlined"
                        onKeyPress={handleEnterKey}
                        />
                    <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={inputChanged}
                        label="Phone"
                        fullWidth
                        variant="outlined"
                        onKeyPress={handleEnterKey}
                        />
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={handleSave} endIcon={<CheckCircleTwoTone />}>Save</Button>
                    <Button color="error" onClick={handleClose} endIcon={<CancelTwoTone />}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}