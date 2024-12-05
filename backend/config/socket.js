const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie"); // Use the cookie library for parsing


let connectedUsers = {}; // In-memory store for userId -> socket.id mapping
let io;

const setupSocketIO = (server, app) => {
    io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173"],
            credentials: true, // Allow cookies to be sent during WebSocket handshake
        },
    });

    // Middleware to extract the JWT from cookies using cookie-parser
    io.use((socket, next) => {
        try {
            const cookies = cookie.parse(socket.handshake.headers.cookie || "");


            const token = cookies.token;

      if (!token) {
        throw new Error("Authentication error: Token not found");
      }

            const decoded = jwt.verify(token, process.env.SECRET);
            socket.userId = decoded._id.toString();
            next();
        } catch (error) {
            console.error("Authentication error:", error.message);
            next(new Error("Authentication error"));
        }
    });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        connectedUsers[socket.userId] = socket.id;
        console.log(`User registered: ${socket.userId} with socket ID: ${socket.id}`);

        socket.on("disconnect", () => {
            delete connectedUsers[socket.userId];
            console.log(`User disconnected: ${socket.userId}`);
        });
    });


    app.set("io", io);

  return io;
};

module.exports = { setupSocketIO, connectedUsers, getIo: () => io };