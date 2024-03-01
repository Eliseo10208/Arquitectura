import { json } from "stream/consumers";
import { Pago } from "../../domain/entities/Pago";
import { PagoRepository } from "../../domain/interface/PagoRepository";
import { NotificationPagoUseCase } from "../services/NotificationNewPago";
export class CreatePagoUseCase{
     constructor(
        readonly PagoRepository:PagoRepository,
        readonly notification: NotificationPagoUseCase
     ){}
    async run(
        idPagos:number,
        cantidad:number,
        concepto:string
    ):Promise <Pago | null>{
        try {
            const pago = await this.PagoRepository.createPago(
                idPagos,
                cantidad,
                concepto
                )
         if(pago)this.notification.run(pago)
             return pago;
        } catch (error) {
            return null;
        }
    }
}