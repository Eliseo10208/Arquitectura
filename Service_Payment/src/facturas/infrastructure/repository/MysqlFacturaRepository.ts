import {query} from '../../../database/mysql'
import { Factura } from '../../domain/entities/Factura'
import { FacturaRepository } from '../../domain/interface/FacturaRepository'

export class MysqlFacturaRepository implements FacturaRepository{
    async createFactura(
        idFactura: number, 
        pagoid: number
        ): Promise<Factura | null> {

        const sql = 'INSERT INTO facturas(idFactura,pagoid) VALUES (?,?)'
        const params:any[]= [idFactura,pagoid];
        try {
            const [idFactura,pagoid]: any = params;
            const factura: Factura = new Factura(idFactura,pagoid);
            const [result] :any = await query(sql, params);
            return factura;
        } catch (error) {
            return null;
        }
    }
}