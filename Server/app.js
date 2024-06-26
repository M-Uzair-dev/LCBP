const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./Routes/authroute");
const gigRoute = require("./Routes/gigroute");
const planRoute = require("./Routes/planRoutes");
const requestroute = require("./Routes/requestroute");
const transactionsroute = require("./Routes/transactionsroute");
const withdrawroute = require("./Routes/withdrawroute");
const chatroute = require("./Routes/chatroute");
const classroute = require("./Routes/Classesroute");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Database connection error: " + err);
  });

app.use("/api/auth", authRoute);
app.use("/api/gig", gigRoute);
app.use("/api/plan", planRoute);
app.use("/api/request", requestroute);
app.use("/api/transactions", transactionsroute);
app.use("/api/withdraws", withdrawroute);
app.use("/api/chat", chatroute);
app.use("/api/class", classroute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
