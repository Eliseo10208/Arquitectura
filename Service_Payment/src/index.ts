import express from 'express';
import morgan from 'morgan';
import { Signale } from 'signale';
import * as dotenv from 'dotenv';
import cors from 'cors'; // Importar cors

import { facturaRouter } from './facturas/infrastructure/routes/FactureRouter';
const app = express();
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use("/facturas",facturaRouter);
app.use(cors());


const port:string | undefined = process.env.PORT ?? "3001";

const signale =  new Signale();

app.listen(3001,()=>{
    signale.success("Servidor corriendo en el puerto:", port)
})