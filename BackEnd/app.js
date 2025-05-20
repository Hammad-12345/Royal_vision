const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const { connectiondb } = require("./db/connect");
const authroute = require("./mvc/route/authroutes")

const allowedOrigins = [
  "http://localhost:3000",
  "https://overlandsolutions.net/",
];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // if you're sending cookies or auth headers
}));
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
