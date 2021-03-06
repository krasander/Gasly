import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

/**
 * This will display the total daily consumption of all readers combined for one client
 * @param {activeClientData} param0 
 */
export default function SimpleCard({ activeClientData }) {
  const classes = useStyles();
  if (!activeClientData) {
    return <div>Select client</div>;
  }

  // Sum all the readings
  let readerData = [];
  for (let index = 0; index < 10; index++) {
    let sum = 0;
    for (let i = 0; i < activeClientData.length; i++) {
      sum += activeClientData[i].readings[index].reading;
    }
    readerData.push({ readerId: index + 1, sumReading: sum }); // readerIds are from 1-10
  }
  
  return (
    <Card className={classes.root}  style={{ overflow: "auto" }}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Total consumption of individual readers
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Reader</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {readerData.map((reading) => (
              <TableRow key={reading.readerId}>
                <TableCell>{reading.readerId}</TableCell>
                <TableCell>{reading.sumReading}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
