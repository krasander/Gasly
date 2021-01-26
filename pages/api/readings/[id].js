import { connectToDatabase } from "../../../util/mongodb";
import { ObjectID } from "mongodb";

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  const { db } = await connectToDatabase();
  // Get the last 24 readings
  var readings = await db
    .collection("readings")
    .find({ clientId: new ObjectID(id) })
    .sort({$natural:-1}) // This gets the latest data
    .limit(24)
    .toArray();

  readings.reverse(); // Reverse it to get it in ascending order
  res.json({ readings: readings });
}
