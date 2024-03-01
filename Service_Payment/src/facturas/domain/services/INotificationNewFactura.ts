import { Factura } from "../entities/Factura";

export interface INotificationNewFactura {
    sendNotification(factura:Factura):Promise<boolean>;
}