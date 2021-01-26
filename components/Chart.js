import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";

/**
 * Display the consumption over the last 24 hours
 * @param {*} param0
 */
export default function Chart({ client, activeClientData }) {
  const theme = useTheme();
  if (!client || !activeClientData) {
    return <div>Select client</div>;
  }
  activeClientData.reverse();
  var readings = [];
  for (let index = 0; index < activeClientData.length; index++) {
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += activeClientData[index].readings[i].reading;
    }
    // Convert timestamp into human readable format
    var date = new Date(activeClientData[index].timestamp);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();

    var formattedTime = hours + ":" + minutes.substr(-2);
    readings.push({
      timestamp: formattedTime,
      reading: sum,
    });
  }
  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={readings}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="timestamp" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Reading
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="reading"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
