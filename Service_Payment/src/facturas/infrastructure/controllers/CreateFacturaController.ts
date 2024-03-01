import { Request,Response } from "express";
import { CreateFacturaUseCase } from "../../aplication/MethodsFacturas/CreateFacturaUseCase";


export class CreateFactureController{
    constructor(readonly createFactureUseCase:CreateFacturaUseCase){}
    async run (req: Request, res:Response):Promise <void>{
        const data = req.body;
        try {
            const factura = await this.createFactureUseCase.run(
                data.idFactura,
                data.pagoid
            )
            if(factura)
            res.status(201).send({
                status:"succes",
                data:{
                    idFactura: factura.idFactura,
                    pagoid: factura.pagoid
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