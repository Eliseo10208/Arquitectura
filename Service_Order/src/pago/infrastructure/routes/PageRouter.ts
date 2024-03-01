import express from 'express'
import { createPagoController } from "../DependenciesPago";
export const pagosRouter = express.Router()

pagosRouter.post(
    "/",
    createPagoController.run.bind(createPagoController)
)