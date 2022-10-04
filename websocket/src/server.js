import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug"); // pug에 view engine 설정
app.set("views", __dirname + "/public/views"); // express에 template이 어디 있는지 지정
app.use("/public", express.static(__dirname + "/public")); // public url을 생성해 유저에게 파일 공유

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("room", (room, done) => {
    socket.join(room);
    console.log(socket.rooms);
    done();
    socket.to(room).emit("welcome");
  });
});

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("message", message);
  });
});

const handleListen = () => console.log(`listening on http://localhost:3001`);
httpServer.listen(3001, handleListen); // 포트열기 // http
