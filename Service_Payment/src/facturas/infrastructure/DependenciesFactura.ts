import { CreateFacturaUseCase } from "../aplication/MethodsFacturas/CreateFacturaUseCase";
import { CreateFactureController } from "./controllers/CreateFacturaController";
import { MysqlFacturaRepository } from "./repository/MysqlFacturaRepository";
import { NotificationNewFactura } from "./serviceRabbitMQ/NotificationNewFactura";
import { NotificationFacturaUseCase} from '../aplication/services/NotificationNewFactura';
import { SocketIO } from "./services/socket.io";
const socketIO = new SocketIO();


export const mysqlFacturaRepository =  new MysqlFacturaRepository();
export const servicesNotification = new NotificationNewFactura();
export const serviceNotificationUseCase = new NotificationFacturaUseCase(
    servicesNotification
)
export const createFacturaUseCase =  new CreateFacturaUseCase(
    mysqlFacturaRepository,serviceNotificationUseCase,socketIO
)
export const createFacturaController = new CreateFactureController(
    createFacturaUseCase
)