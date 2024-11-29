const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie"); // Use the cookie library for parsing

let connectedUsers = {}; // In-memory store for userId -> socket.id mapping

const setupSocketIO = (server, app) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173"], // Replace with your frontend URL
        },
    });

    // Middleware to extract the JWT from cookies using cookie-parser
    io.use((socket, next) => {
        try {
            // Parse cookies from the WebSocket handshake headers
            const cookies = cookie.parse(socket.handshake.headers.cookie || "");


            const token = cookies.jwt; // Replace 'jwt' with your cookie name

            if (!token) {
                throw new Error("Authentication error: Token not found");
            }

            // Verify the JWT
            const decoded = jwt.verify(token, process.env.SECRET); // Replace with your JWT secret
            socket.userId = decoded._id.toString(); // Attach userId to the socket object
            next();
        } catch (error) {
            console.error("Authentication error:", error.message);
            next(new Error("Authentication error"));
        }
    });

    // Handle connections
    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        // Store the user in the connected users map
        connectedUsers[socket.userId] = socket.id;
        console.log(`User registered: ${socket.userId} with socket ID: ${socket.id}`);

        // Handle disconnection
        socket.on("disconnect", () => {
            delete connectedUsers[socket.userId];
            console.log(`User disconnected: ${socket.userId}`);
        });
    });

    // Attach `io` to the app
    app.set("io", io);

    return io;
};

module.exports = { setupSocketIO, connectedUsers };
