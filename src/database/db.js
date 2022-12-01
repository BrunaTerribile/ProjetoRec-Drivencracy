import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
try {
    await mongoClient.connect();
    console.log("MongoDB conectado com sucesso!");
  } catch (err) {
    console.log(err);
  }
  
  const db = mongoClient.db("Drivencracy");
  export const pollsCollection = db.collection("polls");
  export const optionsCollection = db.collection("options");
  export const choiceCollection = db.collection("choice");