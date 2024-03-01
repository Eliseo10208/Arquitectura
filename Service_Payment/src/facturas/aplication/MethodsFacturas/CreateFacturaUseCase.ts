import {json} from 'stream/consumers';
import { Factura } from '../../domain/entities/Factura';
import { FacturaRepository } from '../../domain/interface/FacturaRepository';
import { NotificationFacturaUseCase } from '../services/NotificationNewFactura';
import { ISocketIOInterface } from '../../domain/services/Isocket.io';

export class CreateFacturaUseCase{
    constructor(
        readonly FacturaRepository:FacturaRepository,
        readonly notification: NotificationFacturaUseCase,
        readonly socket:ISocketIOInterface
    ){}
    async run(
        idFactura:number,
        pagoid:number
    ):Promise<Factura | null>{
        try {
            const factura = await this.FacturaRepository.createFactura(
                idFactura,
                pagoid
            )
            if(factura)this.notification.run(factura)
            this.socket.emit("payment", factura);

            return factura;
        } catch (error) {
            return null;
        }
    }
}