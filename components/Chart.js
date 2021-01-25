import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import useSWR from 'swr'

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data1 = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];


export default function Chart({ client }) {
  const theme = useTheme();
  if (!client) {
    return<div>Select client</div>;
  }
  
  const clientId = client._id;
  
  const { data, error } = useSWR(`/api/readings/${clientId}`);

  console.log("Received data: ", data);
  console.log(error);
  
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const readingData = data["readings"].map((reading) => ({
    time: reading["timestamp"].toString(10),
    amount: reading["reading"]
  }));

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={readingData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
