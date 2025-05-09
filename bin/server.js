const http = require("http");

const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
require("dotenv").config();
//march 2025
const { Server } = require("socket.io");
//--------------------------------------

const { DB_HOST, PORT = 3001 } = process.env;
const app = require("../app");

//march 2025
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Користувач підключився");

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`Користувач приєднався до чату ${chatId}`);
  });

  socket.onAny((event, ...args) => {
    console.log(`🔥 Отримано подію: ${event}`, args);
  });

  socket.on("sendMessage", ({ chatId, text, sender }) => {
    const message = { id: uuidv4(), chatId, text, sender };

    console.log("📩 Отримано повідомлення:", text);
    io.to(chatId).emit("receiveMessage", message);
  });

  socket.on("leaveChat", (chatId) => {
    socket.leave(chatId);
    console.log(`Користувач покинув чат ${chatId}`);
  });

  socket.on("disconnect", () => {
    console.log("Користувач відключився");
  });
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

//--------------------------------------

// mongoose
//   .connect(DB_HOST)
//   .then(() => app.listen(3001, () => console.log("Server started")))
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });
