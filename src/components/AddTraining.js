import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Tooltip, Typography, Zoom } from '@mui/material';
import { AddCircleTwoTone, CancelTwoTone, CheckCircleTwoTone } from '@mui/icons-material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import 'dayjs/locale/fi';
import dayjs from "dayjs";

export default function AddTraining(props) {
    const trainingInitialState = {
        date: "",
        activity: "",
        duration: "",
        customer: ""
    };

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState(trainingInitialState);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleClickOpen = () => {
        setTraining({
            date: selectedDate,
            activity: "",
            duration: "",
            customer: props.customer.data.links[0].href
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTraining(trainingInitialState);
    };

    const handleSave = () => {
        props.addTraining(training);
        handleClose();
        setTraining(trainingInitialState);
    };

    const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            handleSave();
        };
    };

    const inputChanged = e => {
        setTraining({...training, [e.target.name]: e.target.value});
    };

    const dateChanged = date => {
        setSelectedDate(date);
        setTraining({...training, date});
    }

    return (
        <div>
            <Tooltip
                TransitionComponent={Zoom}
                enterDelay={300}
                leaveDelay={200}
                title={<Typography fontSize={15}>Add training</Typography>}
                placement="left"
                arrow>
                <IconButton
                    color="success"
                    onClick={handleClickOpen}>
                    <AddCircleTwoTone />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    New training for {props.customer.data.firstname + " " + props.customer.data.lastname}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="activity"
                            value={training.activity}
                            onChange={inputChanged}
                            label="Activity"
                            fullWidth
                            variant="outlined"
                            onKeyPress={handleEnterKey}
                            />
                        <LocalizationProvider dateAdapter={AdapterDayjs} locale={dayjs.locale("fi")}>
                            <DateTimePicker
                                margin="dense"
                                name="date"
                                value={training.date}
                                onChange={date => dateChanged(date)}
                                label="Date & time"
                                fullWidth
                                renderInput={(props) => <TextField {...props} onKeyPress={handleEnterKey} />}
                            />
                        </LocalizationProvider>
                        <TextField
                            margin="dense"
                            name="duration"
                            value={training.duration}
                            onChange={inputChanged}
                            label="Duration (min)"
                            fullWidth
                            variant="outlined"
                            onKeyPress={handleEnterKey}
                            />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={handleSave} endIcon={<CheckCircleTwoTone />}>Save</Button>
                    <Button color="error" onClick={handleClose} endIcon={<CancelTwoTone />}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}