import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Button } from '@mui/material';
// import Snackbar

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        {
            headerName: "First name",
            field: "firstname",
            sortable: true,
            filter: true,
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            headerName: "Last name",
            field: "lastname",
            sortable: true,
            filter: true,
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            headerName: "Street address",
            field: "streetaddress",
            sortable: true,
            filter: true,
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            headerName: "Postal code",
            field: "postcode",
            sortable: true,
            filter: true,
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            field: "city",
            sortable: true,
            filter: true,
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            field: "email",
            sortable: true,
            filter: true,
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            field: "phone",
            sortable: true,
            filter: true,
            cellStyle: {
                textAlign: "left"
            }
        },
        {
            headerName: "",
            field: "links.0.href", // tästä Juhan meili, jos tarvitsee jeesiä
            sortable: false,
            filter: false,
            width: 120,
            cellRendererFramework: params => <Button size="small" color="error">Delete</Button> // only a "placeholder" for now
            // cellRendererFramework: params => <Button size="small" color="error" onClick={() => deleteTraining(params.value)}>Delete</Button>
        },
        {
            headerName: "",
            field: "links[0].href",
            sortable: false,
            filter: false,
            width: 120,
            // cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} customer={params} />
        },
    ]

    return(
        <div className="ag-theme-material" style={{marginTop: 30, height: 593, width: "86%", marginLeft: "auto", marginRight: "auto"}}>
            <AgGridReact
                columnDefs={columns}
                rowData={customers}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
        </div>
    )
}