import express from "express";
import { db } from "../db/conn.mjs";
import { ObjectId } from "mongodb";


const router = express.Router();
router.get("/", async (req, res) => {
    res.send("Welcome to my marketplace application");
  });
  router.get("/products", async (req, res) => {
    let collection =  db.collection("product");
    let results = await collection.find({})
      .limit(50)
      .toArray();
  
    res.send(results).status(200);
  });
  
  
  // Get a single post
  router.get("/products/:id", async (req, res) => {
    let collection = await db.collection("product");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

  router.post("/products", async (req, res) => {
    try {
    let collection = await db.collection("product");
    let newDocument = req.body;
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
    }
    catch(error) {
      console.error(error);
       

    }
    
  });
  router.put("/products/:id", async(req, res)=> {
    try {
    let collection = await db.collection("product");
    const query = { _id: new ObjectId(req.params.id) }; 
    const update = { $set: req.body }; 

    const result = await collection.updateOne(query, update);
    res.send(result).status(200);
    }
    catch(err) {
      console.error(err);
    }
    

  });
  router.delete("/products/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const collection =await db.collection("product");
    let result = await collection.deleteOne(query);
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

  router.delete("/products", async(req, res)=> {
    let collection = await db.collection("product");
    let results = await collection.deleteMany({});
    res.send(results).statusMessage("All products has been deleted").status(200);
  })
  
  
export default router;



