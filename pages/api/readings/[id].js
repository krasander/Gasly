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
    .limit(20)
    .toArray();

  res.json({ readings: readings });
}
