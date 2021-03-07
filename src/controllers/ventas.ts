import { Request, Response } from 'express'

class ventasController {

    static create = async ( req: Request, res: Response ) => {
        
        const { detalles, solicitante } = req.body;


        return res.json({
            ok: true,
            message: 'Te amo bebe'
        });

        

    }

}


export default ventasController;