import { NotificationNewFactura } from "../../infrastructure/serviceRabbitMQ/NotificationNewFactura";
import { Factura } from "../../domain/entities/Factura";

export class NotificationFacturaUseCase{
    constructor(readonly serviceNotification:NotificationNewFactura){}
    async run(factura:Factura){
        await this.serviceNotification.sendNotification(factura)
    }
}