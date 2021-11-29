import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Alert, Snackbar } from '@mui/material';

import dayjs from 'dayjs';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import DeleteTraining from "./DeleteTraining";

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState("success");

    useEffect(() => {
        fetchTrainings();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = trainingId => {
        fetch(`https://customerrest.herokuapp.com/api/trainings/${trainingId}`, { method: "DELETE" })
        .then(response => {
            if (response.ok) {
                fetchTrainings();
                setMsg("Training deleted");
                setSeverity("success");
                setOpen(true);
            } else {
                setMsg("Delete unsuccessful");
                setSeverity("error");
                setOpen(true);
            }
        })
        .catch(err => console.error(err));
    }

    const columns = [
        {
            headerName: "Date & time",
            valueGetter: params => {
                return dayjs(params.data.date).format("DD/MM/YYYY HH:mm");
            },
            sortable: true,
            filter: true,
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            field: "activity",
            sortable: true,
            filter: true,
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            headerName: "Duration (min)",
            field: "duration",
            sortable: true,
            filter: true,
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            headerName: "Customer",
            valueGetter: params => {
                return params.data.customer !== null ? params.data.customer.firstname + " " + params.data.customer.lastname : "";
            },
            sortable: true,
            filter: true,
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            headerName: "",
            field: "id",
            sortable: false,
            filter: false,
            width: 120,
            cellRendererFramework: params => <DeleteTraining deleteTraining={deleteTraining} training={params} />
        }
    ];

    return(
        <div>
            <div className="ag-theme-material" style={{marginTop: 30, height: 593, width: "50%", marginLeft: "auto", marginRight: "auto"}}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={trainings}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                />
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity={severity} variant="filled">{msg}</Alert>
            </Snackbar>
        </div>
    )
}