const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const { connectiondb } = require("./db/connect");
app.use(cors());
app.use(express.json());

dotenv.config();
connectiondb()
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(`${process.env.PORT}`, () => {
  console.log("server listen");
});
