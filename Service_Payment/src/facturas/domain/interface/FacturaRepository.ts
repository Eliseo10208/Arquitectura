import { Factura } from "../entities/Factura";
export interface FacturaRepository{
    createFactura(
        idFactura: number,
        idpago:number
    ):Promise<Factura | null>
}   