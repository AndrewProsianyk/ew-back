const mongoose = require("mongoose");
require("dotenv").config();

const Car = require("../models/car");
const carsData = require("./carsData.json"); // поклади JSON сюди

const { DB_HOST } = process.env;

const importData = async () => {
  try {
    await mongoose.connect(DB_HOST);
    await Car.deleteMany(); // (опційно) очищає колекцію перед заливкою
    await Car.insertMany(carsData);
    console.log("✅ Cars imported successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Import failed", error);
    process.exit(1);
  }
};

importData();
// {
//   "_id": {
//     "$oid": "6818f3234459d5f0c0783591"
//   },
//   "year": 2020,
//   "price": 25000,
//   "mileage": 15000,
//   "location": "New York",
//   "transmission": "Automatic",
//   "bodyType": "Sedan",
//   "__v": 0
// }
