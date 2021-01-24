import { connectToDatabase } from "../../util/mongodb";

export default async function database(req, res) {
  try {
    console.log("Connected correctly to server");

    const { db } = await connectToDatabase();

    const dest = db.collection("readings");
    const clients = await db.collection("clients").find({}).limit(20).toArray();

    const readings = clients.map((client) => ({
      clientId: client._id,
      reading: Math.floor(Math.random() * Math.floor(100)),
      timestamp: new Date().getTime(),
    }));
    dest.insertMany(readings);
  } catch (err) {
    console.log(err.stack);
  }
  return res.json({ message: "OK" });
}
