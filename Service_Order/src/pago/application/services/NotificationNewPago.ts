import { NotificationNewPago } from "../../infrastructure/servicesRabbitMQ/NotificationNewPago";
import { Pago } from "../../domain/entities/Pago";

export class NotificationPagoUseCase{
    constructor(readonly serviceNotification:NotificationNewPago){}
    async run(pago:Pago){
        await this.serviceNotification.sendNotification(pago)
    }
}