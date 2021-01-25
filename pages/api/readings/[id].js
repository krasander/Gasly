import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from "mongodb";

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  const { db } = await connectToDatabase();
  const readings = await db
    .collection("readings")
    .find({ clientId: new ObjectID(id) })
    .limit(24)
    .toArray();

  var result = [];
  for (let index = 0; index < readings.length; index++) {
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += readings[index].readings[i].reading;
    }
    result.push({ timestamp: readings[index].timestamp, reading: sum });
  }
  console.log("rec: ", result);
  res.json({ readings: result });
}
