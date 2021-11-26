import React, { useState } from 'react';
import '../App.css';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { AccessibilityNew, AssessmentOutlined, FitnessCenter, Today } from '@mui/icons-material';
import Calendar from './Calendar';
import Statistics from './Statistics';

export default function NavigationTabs() {

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
                <Tab value="customers" label="Customers" icon={<AccessibilityNew />} />
                <Tab value="trainings" label="Trainings" icon={<FitnessCenter />} />
                <Tab value="calendar" label="Calendar (placeholder)" icon={<Today />} />
                <Tab value="statistics" label="Statistics (placeholder)" icon={<AssessmentOutlined />} />
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