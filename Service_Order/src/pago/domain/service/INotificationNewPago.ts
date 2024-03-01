import { Pago } from "../entities/Pago";

export interface INotificationNewPago {
    sendNotification(pago:Pago):Promise<boolean>;
}