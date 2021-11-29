import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Alert, Snackbar, Toolbar } from '@mui/material';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import DeleteCustomer from "./DeleteCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "../trainings/AddTraining";
import Export from "../other/Export";


export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState("success");
    
    const [gridApi, setGridApi] = useState(null);
    
    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    const exportCustomers = () => {
        const csvParams = {
            fileName: "customers.csv",
            columnKeys: [
                "firstname",
                "lastname",
                "streetaddress",
                "postcode",
                "city",
                "email",
                "phone"
            ]
        }
        gridApi.exportDataAsCsv(csvParams);
        setMsg("CSV file exported")
        setSeverity("success");
        setOpen(true);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleClose = () => {
        setOpen(false);
    }

    const fetchCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = customerUrl => {
        fetch(customerUrl, { method: "DELETE" })
        .then(response => {
            if (response.ok) {
                fetchCustomers();
                setMsg("Customer deleted");
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

    const addCustomer = customer => {
        fetch("https://customerrest.herokuapp.com/api/customers",
            {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(customer)
            }
        )
        .then(response => {
            if (response.ok) {
                fetchCustomers();
                setMsg("Customer added");
                setSeverity("success");
                setOpen(true);
            } else {
                setMsg("Add unsuccessful");
                setSeverity("error");
                setOpen(true);
            }
        })
        .catch(err => console.error(err));
    }

    const editCustomer = (url, updatedCustomer) => {
        fetch(url, 
            {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(updatedCustomer)
            }
        )
        .then(response => {
            if (response.ok) {
                fetchCustomers();
                setMsg("Customer updated");
                setSeverity("info");
                setOpen(true);
            } else {
                setMsg("Update unsuccessful");
                setSeverity("error");
                setOpen(true);
            }
        })
        .catch(err => console.error(err));
    }

    const addTraining = training => {
        fetch("https://customerrest.herokuapp.com/api/trainings",
            {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(training)
            }
        )
        .then(response => {
            if (response.ok) {
                fetchCustomers();
                setMsg("Training added");
                setSeverity("success");
                setOpen(true);
            } else {
                setMsg("Add unsuccessful");
                setSeverity("error");
                setOpen(true);
            }
        })
        .catch(err => console.error(err));
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
            field: "links.0.href",
            sortable: false,
            filter: false,
            width: 80,
            cellRendererFramework: params => <AddTraining addTraining={addTraining} customer={params} />
        },
        {
            headerName: "",
            field: "links.0.href",
            sortable: false,
            filter: false,
            width: 80,
            cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} customer={params} />
        },
        {
            headerName: "",
            field: "links.0.href",
            sortable: false,
            filter: false,
            width: 80,
            cellRendererFramework: params => <DeleteCustomer deleteCustomer={deleteCustomer} customer={params} />
        },
    ]

    return (
        <div>
            <Toolbar>
                <AddCustomer addCustomer={addCustomer} />
                <Toolbar sx={{marginLeft: "auto"}}>
                    <Export exportCustomers={exportCustomers} />
                </Toolbar>
            </Toolbar>
            <div className="ag-theme-material" style={{marginTop: 30, height: 593, width: "86%", marginLeft: "auto", marginRight: "auto"}}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={customers}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                    onGridReady={onGridReady}
                />
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity={severity} variant="filled">{msg}</Alert>
            </Snackbar>
        </div>
    );
}