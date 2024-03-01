import express from 'express';
import { createFacturaController } from '../DependenciesFactura';
export const facturaRouter = express.Router()

facturaRouter.post(
    '/',
    createFacturaController.run.bind(createFacturaController)
)