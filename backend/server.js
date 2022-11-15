require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");

//Express App
const app = express();

//Middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use( '/api/workouts' , workoutRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //Listen For Request
    app.listen(process.env.PORT, () => {
      console.log("Listening", process.env.PORT ,"and Connected to MongoDB");
    });
  })
  .catch((error) => {
    console.log(error);
  });

