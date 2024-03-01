import { Pago } from "../entities/Pago";

export interface PagoRepository{
        createPago(
            idPago: number,
            cantidad: number,
            concepto:string

        ):Promise<Pago | null>
}

