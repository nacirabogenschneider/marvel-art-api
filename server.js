const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.set("case sensitive routing", true);
app.use(cors(corsOptions));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const appAdminRouter = require("./routes/appAdmin");
const userRouter = require("./routes/appUser");
const herosRouter = require("./routes/heros");
const herosDescriptionRouter= require("./routes/herosDescription")

app.use("/api/admin", appAdminRouter);
app.use("/api/user", userRouter);
app.use("/api/heros", herosRouter);
app.use("/api/heros-description", herosDescriptionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});