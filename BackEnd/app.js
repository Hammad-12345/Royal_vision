const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const { connectiondb } = require("./db/connect");
const authroute = require("./mvc/route/authroutes")
app.use(cors());
app.use(express.json());

dotenv.config();
connectiondb()
app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/register",(req,res)=>
{
  res.send("register is in process");
})

app.use("/auth", authroute);
app.listen(`${process.env.PORT}`, () => {
  console.log("server listen");
});
