//index.js file

//1. importing express
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./database/database");
const cors = require("cors");
const morgan = require("morgan");
// const fileUpload = require("express-fileupload");
// const morgan = require("morgan");

//2. creating an express application
const app = express();
//Json Config
app.use(express.json());
app.use(morgan("dev"));
//File upload config
// app.use(fileUpload());

//make a public folder access to outside
app.use(express.static("./public"));

//CORS Config
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.use(morgan("dev"));

//connecting to database
connectDB();

// 3. defining the port
const PORT = process.env.PORT;

//4. creating a test route or endpoint
app.get("/test", (req, res) => {
  res.send("Test Api is Working...!");
});

app.get("/login", (req, res) => {
  res.send("Test Api is Working...!");
});

// const esewaRoutes = require("./routes/esewa");
const userRoute = require("./routes/userroute");
const songRoute = require("./routes/songroute");

//configuring  Routes
app.use("/api/user", userRoute);
app.use("/api/songs", songRoute);
// app.use('/api/products', require('./routes/productRoutes'));
// app.use("/api", esewaRoutes);

// const reviewRoutes = require('./routes/reviewRoutes');
// app.use('/api/reviews', reviewRoutes);

// // Add this line for review routes
// app.use('/api/reviews', require('./routes/reviewRoutes'));

//5. starting the server
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});

module.exports = app;
