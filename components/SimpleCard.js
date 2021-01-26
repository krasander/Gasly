import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
 * Displays total daily consumption of the selected client.
 * @param {*} param0 
 */
export default function SimpleCard({ activeClientData }) {
  const classes = useStyles();
  if (!activeClientData) {
    return <div>Select client</div>;
  }
  var totalConsumption = 0;
  // Iterate over all readings and sum all values
  for (let index = 0; index < activeClientData.length; index++) {
    for (let i = 0; i < 10; i++) {
      totalConsumption += activeClientData[index].readings[i].reading;
    }
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Total daily consumption
        </Typography>
        <Typography variant="h3" component="h2">
          {totalConsumption}
        </Typography>
      </CardContent>
    </Card>
  );
}
