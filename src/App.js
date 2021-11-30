import React, { useState } from 'react';
import './App.css';
import CustomerList from './components/customers/CustomerList';
import TrainingList from './components/trainings/TrainingList';
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { AccessibilityNew, AssessmentOutlined, FitnessCenter, Today } from '@mui/icons-material';
import Calendar from './components/other/Calendar';
import Statistics from './components/other/Statistics';

export default function App() {

  const [tab, setTab] = useState("customers");

  const tabChange = (event, value) => {
    setTab(value);
  }

  return (
    <div className="App">
      <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ marginRight: 20 }}>
                Personal Trainer
              </Typography>
              <Tabs value={tab} onChange={tabChange} textColor="inherit" TabIndicatorProps={{style: {background: "white"}}}>
                <Tab value="customers" label="Customers" icon={<AccessibilityNew />} />
                <Tab value="trainings" label="Trainings" icon={<FitnessCenter />} />
                <Tab value="calendar" label="Calendar" icon={<Today />} />
                <Tab value="statistics" label="Statistics" icon={<AssessmentOutlined />} />
              </Tabs>
            </Toolbar>
          </AppBar>
        {tab === "customers" && <CustomerList />}
        {tab === "trainings" && <TrainingList />}
        {tab === "calendar" && <Calendar />}
        {tab === "statistics" && <Statistics />}
    </div>
  );
}