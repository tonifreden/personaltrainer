import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Button } from '@mui/material';
// import Snackbar

import dayjs from 'dayjs';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const columns = [
        {
            headerName: "Date & time",
            valueGetter: params => {
                return dayjs(params.data.date).format("DD.MM.YYYY HH:mm");
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
            field: "emt",
            sortable: false,
            filter: false,
            width: 120,
            cellRendererFramework: params => <Button size="small" color="error">Delete</Button> // only a "placeholder" for now
            // cellRendererFramework: params => <Button size="small" color="error" onClick={() => deleteCustomer(params.value)}>Delete</Button>
        }
    ];

    return(
        <div className="ag-theme-material" style={{marginTop: 30, height: 593, width: "50%", marginLeft: "auto", marginRight: "auto"}}>
            <AgGridReact
                columnDefs={columns}
                rowData={trainings}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
        </div>
    )
}