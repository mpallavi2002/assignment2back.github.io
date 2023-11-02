import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import products from "./routes/product.mjs";

const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors());
app.use(express.json());
app.use("/product", products);

// start the Express server
app.listen(PORT, () => {
  console.log("application running");
});
// Global error handling
app.use((err, _req, res, next) => {
  console.error(err);
  res.status(500).send("Uh oh! An unexpected error occured.")
})

