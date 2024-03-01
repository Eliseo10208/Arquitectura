import { Request,Response } from "express";
import { CreatePagoUseCase } from "../../application/MethodsPagos/CreatePagosUseCase";

export class CreatePagoController{
    constructor(readonly createPagoUseCase : CreatePagoUseCase){}
    async run(req: Request, res:Response):Promise<void>{
        const data = req.body;
        try {
            const pago = await this.createPagoUseCase.run(
                data.idPago,
                data.cantidad,
                data.concepto
            )
            if(pago) console.log(pago)
            res.status(201).send({
                status:"succes",
                data:{
                    idPago: pago?.idPago,
                    cantidad:pago?.cantidad,
                    concepto: pago?.concepto
                }
               
        })
           
        } catch (error) {
            res.status(204).send({
                status:"error",
                data:"Ocurrio un error",
                mesagges:error
            })
        }
    }
}