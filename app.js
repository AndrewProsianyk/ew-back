const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/api/auth");
const wordsRouter = require("./routes/api/words");
const themesRouter = require("./routes/api/themes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/words", wordsRouter);
app.use("/api/themes", themesRouter);
app.post("/test", (req, res) => {
  console.log("Request received from frontend:", req.body);
  res.json({
    message: `Ok, let's talk about ${req.body}`,
    receivedData: req.body,
  });
});
app.get("/test/getAllChats", (req, res) => {
  res.json({
    message: `Ok, let's talk about ${req.body}`,
    receivedData: req.body,
  });
});
app.use("/api/smth", () => {});

app.use((req, res) => {
  res.status(404).json({ message: "Not found!" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
