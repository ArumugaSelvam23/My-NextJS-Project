import { MongoClient } from "mongodb";
// /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://arumugaselvam23052003:upNHtSHxrCnpZtqf@cluster0.c3kmlvl.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({ message: "meetup inserted!" });
  }
}
export default handler;

// arumugaselvam23052003
// upNHtSHxrCnpZtqf
