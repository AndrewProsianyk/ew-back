const express = require("express");
const router = express.Router();
const Car = require("../../models/car");

router.get("/", async (req, res) => {
  try {
    const {
      make,
      model,
      location,

      fuelTypes,
      transmissionTypes,
      bodyTypes,

      minPrice,
      maxPrice,
    } = req.query;

    const filter = {};

    if (make) filter.title = { $regex: `^${make}\\b`, $options: "i" };
    if (model) filter.title = { $regex: `\\b${model}\\b`, $options: "i" };
    if (location) filter.location = location;
    if (fuelTypes) filter.fuelType = { $in: fuelTypes.split(",") };
    if (transmissionTypes)
      filter.transmission = { $in: transmissionTypes.split(",") };
    if (bodyTypes) filter.bodyType = { $in: bodyTypes.split(",") };
    if (minPrice || maxPrice)
      filter.price = {
        ...(minPrice && { $gte: +minPrice }),
        ...(maxPrice && { $lte: +maxPrice }),
      };

    const cars = await Car.find(filter);
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/latest", async (req, res) => {
  try {
    const cars = await Car.find().sort({ date: -1 }).limit(4);
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/recommended", async (req, res) => {
  try {
    const cars = await Car.aggregate([{ $sample: { size: 4 } }]);
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/cars/:id/favorite
router.patch("/:id/favorite", async (req, res) => {
  try {
    const { favorite } = req.body;

    if (typeof favorite !== "boolean") {
      return res.status(400).json({ message: "Invalid favorite value" });
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { favorite },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(updatedCar);
  } catch (err) {
    console.error("Error updating favorite:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
