// const MongoClient = require('mongodb').MongoClient;
//   const uri = "mongodb+srv://gasly:<catapultlabs>@cluster0.xfdzk.mongodb.net/<sample_mflix>?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, { useNewUrlParser: true });
//   client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
//   });

import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {

  const { db } = await connectToDatabase();

  const movies = await db

    .collection("movies")

    .find({})

    .sort({ metacritic: -1 })

    .limit(20)

    .toArray();

  res.json(movies);

};