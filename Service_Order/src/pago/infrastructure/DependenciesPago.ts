import { CreatePagoUseCase } from "../application/MethodsPagos/CreatePagosUseCase";
import { CreatePagoController } from "./controllers/CreatePagoController";
import { NotificationPagoUseCase } from '../application/services/NotificationNewPago'
import { NotificationNewPago } from './servicesRabbitMQ/NotificationNewPago';

import { MysqlPagoRepository } from "./repository/MysqlPagoRepository";
export const mysqlPagoRepository = new MysqlPagoRepository();


export const servicesNotification = new NotificationNewPago();
export const serviceNotificationUseCase = new NotificationPagoUseCase(
    servicesNotification
)


export const createPagoUseCase = new CreatePagoUseCase(
    mysqlPagoRepository,serviceNotificationUseCase
)
export const createPagoController = new CreatePagoController(
    createPagoUseCase
)
