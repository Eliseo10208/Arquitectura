import express, { Express } from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

const app: Express = express();
const port: number = 3005;

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
  console.log('api-ws-corriendo en el puerto 3005');
});

const io: Server = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://54.237.83.120","http://34.199.77.210:80"] // Aquí debes agregar la URL de origen de tu aplicación cliente
  }
});

io.on('connection', socket => {
  socket.on('payment', pago => {
    console.log('payment success and sended to client: ', pago);
    io.emit('payment-processed', pago);
  });

  socket.on("connect_error", (error) => {
    console.error("Error de conexión:", error);
  });

  socket.on("disconnect", (reason) => {
    console.error("Desconectado:", reason);
  });
});
