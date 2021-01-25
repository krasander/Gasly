import { connectToDatabase } from "../../util/mongodb";

export default async function database(req, res) {
  try {
    console.log("Connected correctly to server");

    const { db } = await connectToDatabase();

    const dest = db.collection("readings");
    const clients = await db.collection("clients").find({}).limit(20).toArray();

    var totalReadings = [];
    for (let index = 0; index < clients.length; index++) {
      var arr = [];
        for (let i = 1; i <= 10; i++) {
          arr.push({ "readerId": i, "reading": Math.floor(Math.random() * Math.floor(100)) });
      }
      totalReadings.push({"clientId": clients[index]._id, "readings": arr, "timestamp": new Date().getTime()});
    }
    dest.insertMany(totalReadings);
    console.log("inserted: ", totalReadings);
    // const readings = clients.map((client) => ({
    //   clientId: client._id,
    //   reading: Math.floor(Math.random() * Math.floor(100)),
    //   timestamp: new Date().getTime(),
    // }));
    // dest.insertMany(readings);
  } catch (err) {
    console.log(err.stack);
  }
  return res.json({ message: "OK" });
}
