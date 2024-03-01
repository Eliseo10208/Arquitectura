import { query } from "../../../database/mysql";
import { Pago } from "../../domain/entities/Pago";
import { PagoRepository } from "../../domain/interface/PagoRepository";

export class MysqlPagoRepository implements PagoRepository{

    async createPago(
        idPago: number,
        cantidad: number,
        concepto: string): Promise<Pago | null> {
            const sql = "INSERT INTO pagos(idPago,cantidad,concepto) VALUES(?,?,?)"
            const params:any[] =  [idPago,cantidad,concepto];
            try {
                const [idPago, cantidad, concepto]: any = params;
                const pago: Pago = new Pago(idPago, cantidad, concepto);
                const [result] :any = await query(sql, params);
                
               
                return pago;

            } catch (error) {
                return null;
            } 
    }
}