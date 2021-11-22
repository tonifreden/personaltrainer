import React, { useState } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';

function App() {

  const [tab, setTab] = useState('customers');

  const tabChange = (event, value) => {
    setTab(value);
  }

  return (
    <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ mr: 20 }}>
              Personal Trainer
            </Typography>
            <Tabs value={tab} onChange={tabChange} textColor="inherit" TabIndicatorProps={{style: {background: "white"}}}>
              <Tab value="customers" label="Customers" />
              <Tab value="trainings" label="Trainings" />
            </Tabs>
          </Toolbar>
        </AppBar>
      {tab === "customers" && <CustomerList />}
      {tab === "trainings" && <TrainingList />}
    </div>
  );
}

export default App;
