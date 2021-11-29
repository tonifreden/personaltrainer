import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { AddBoxTwoTone, CancelTwoTone, CheckCircleTwoTone } from '@mui/icons-material';
import React, { useState } from 'react';

export default function AddCustomer(props) {
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
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCustomer(customerInitialState);
    };

    const handleSave = () => {
        props.addCustomer(customer);
        handleClose();
        setCustomer(customerInitialState);
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
            <Button variant="contained" onClick={handleClickOpen} size="large" startIcon={<AddBoxTwoTone />}>
                Add customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New customer</DialogTitle>
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