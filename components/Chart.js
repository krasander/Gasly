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


export default function Chart({ client, activeClientData }) {
  const theme = useTheme();
  if (!client || !activeClientData) {
    return <div>Select client</div>;
  }

  var readings = [];
  for (let index = 0; index < activeClientData.length; index++) {
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += activeClientData[index].readings[i].reading;
    }
    readings.push({ "timestamp": activeClientData[index].timestamp, "reading": sum });
  }
  console.log("after parsing: ", readings);
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
