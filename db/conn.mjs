import { MongoClient } from "mongodb";

// Add your MongoDb connection string below
const uri = "mongodb+srv://pmishr15:1WyumRo4gXF9UI51@cluster0.sjvjaed.mongodb.net/";

const client = new MongoClient(uri);


// Establish the MongoDB connection
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error(e);
  }
}

// Call the connection function
connectToMongoDB().catch(console.error);
export const db = client.db("Marketplace");
