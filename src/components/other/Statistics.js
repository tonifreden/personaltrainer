import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import _ from 'lodash';

export default function Statistics() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    /**
     * The code starting from "_(data)" and ending in ".value()" - the range
     * of which is also pinpointed by comments - was obtained from here:
     * https://stackoverflow.com/a/45287338
     */
    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(_(data) // <-- Starting here...
            .groupBy("activity")
            .map((training, activity) => ({
                name: activity,
                duration: _.sumBy(training, "duration")
            }))
            .value())) // <-- ...ending here.
        .catch(err => console.error(err));
    };

    return (
        <div style={{marginTop: 30, height: 800, width: "86%", marginLeft: "auto", marginRight: "auto"}}>
            <ResponsiveContainer>
                <BarChart
                    data={trainings}
                    margin={{
                        left: 30,
                        bottom: 50
                    }}
                    barCategoryGap="20%"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" label={{ value: "Activities", fontSize: "1.5rem", position: "insideBottom", dy: 30 }} />
                    <YAxis label={{ value: "Total activity duration (min)", fontSize: "1.5rem", angle: -90, position: "insideLeft", dx: -25, dy: 150 }} />
                    <Tooltip separator=": " />
                    <Bar dataKey="duration" fill="#4595E3" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}