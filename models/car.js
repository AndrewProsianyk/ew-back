const { Schema, model } = require("mongoose");

const carSchema = Schema({
  image: String,
  title: String,
  price: Number,
  date: String,
  year: Number,
  mileage: Number,
  location: String,
  fuelType: String,
  transmission: String,
  condition: String,
  verified: Boolean,
  favorite: Boolean,
  bodyType: String,
});

const Car = model("Car", carSchema);

module.exports = Car;
