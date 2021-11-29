import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import enGb from '@fullcalendar/core/locales/en-gb';
import dayjs from "dayjs";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { CheckCircleTwoTone } from "@mui/icons-material";

export default function Calendar() {
    const [open, setOpen] = useState(false);
    const [trainings, setTrainings] = useState([]);
    const [info, setInfo] = useState(null);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data.map(training => {
            return {
                "title": training.activity + " / " + training.customer.firstname + " " + training.customer.lastname,
                "start": training.date,
                "end": dayjs(training.date).add(training.duration, "minute").toISOString(),
                "extendedProps": {
                    "customerPhone": training.customer.phone,
                    "customerEmail": training.customer.email
                }
            }
        })))
        .catch(err => console.error(err));
    };

    const handleClickOpen = (training) => {
        setInfo(training);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div style={{marginTop: 30, width: "86%", marginLeft: "auto", marginRight: "auto"}}>
            <FullCalendar
                plugins={[ timeGridPlugin, dayGridPlugin ]}
                initialView="timeGridWeek"
                height={700}
                allDaySlot={false}
                navLinks={true}
                headerToolbar={{
                    left: "prevYear prev,next nextYear today",
                    center: "title",
                    right: "timeGridDay,timeGridWeek,dayGridMonth"
                }}
                buttonText={{
                    today: 'Today',
                    month: 'Month',
                    week: 'Week',
                    day: 'Day',
                  }}
                locale={enGb}
                weekNumbers={true}
                weekNumberCalculation="local"
                eventTimeFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    meridiem: false
                }}
                events={trainings}
                eventClick={(info) => {
                    handleClickOpen(info.event);
                }}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {info !== null ? info.title : ""}
                </DialogTitle>
                <DialogContent>
                    <b>{info !== null ? dayjs(info.start).format("ddd DD/MM/YYYY") : ""}</b><br/>
                    {info !== null ? dayjs(info.start).format("HH:mm") : ""} - {info !== null ? dayjs(info.end).format("HH:mm") : ""}
                    <DialogContentText>
                        <br/><b>Contact info:</b><br/>
                        Phone: {info !== null ? info.extendedProps.customerPhone : ""}<br/>
                        Email: {info !== null ? info.extendedProps.customerEmail : ""}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={handleClose} endIcon={<CheckCircleTwoTone />}>Got it!</Button>
                </DialogActions>
            </Dialog>
            <br/>
            <div>
                Try clicking the events for more info!
            </div>
        </div>
    );
}