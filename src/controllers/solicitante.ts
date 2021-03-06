import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express';
import { Solicitante } from '../models/solicitante';

class solicitanteController {

    static create = async ( req: Request, res: Response ) => {

        const { nombre, apellido, email, telefono, codArea, codigoProvincia, codigoLocalidad, calle, altura, piso, codigoPostal } = req.body;


        if( !(email || telefono) ){
            return res.json({
                ok: false,
                err: 'Debe especificar el email o telefono del solicitante'
            });
        }

        const codigo = uuid();

        const solicitante: any = {
            nombre,
            apellido,
            email,
            telefono,
            codArea,
            codigoProvincia,
            codigoLocalidad,
            calle,
            altura,
            piso,
            codigoPostal,
            codigo
        }


        try {
            
            const solicitanteDb = await Solicitante.create(solicitante);

            return res.json({
                ok: true, 
                solicitante: solicitanteDb
            });


        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }


    };

    static update = async ( req: Request, res: Response ) => {
        
        const code = req.params.code; 

        const { nombre, apellido, email, telefono, codArea, codigoProvincia, codigoLocalidad, calle, altura, piso, codigoPostal } = req.body;

        
        const solicitante: any = {
            nombre,
            apellido,
            email,
            telefono,
            codArea,
            codigoProvincia,
            codigoLocalidad,
            calle,
            altura,
            piso,
            codigoPostal
        }

        Object.keys(solicitante).forEach( key => !solicitante[key] ? delete solicitante[key] : {} );


        try {
            
            const solicitanteDb = await Solicitante.findOneAndUpdate( { codigo: code }, solicitante, { new: true } );

            if( !solicitanteDb ) {
                return res.json({
                    ok: false,
                    err: 'Solicitante invalido'
                });
            };

            return res.json({
                ok: true,
                solicitante: solicitanteDb
            });


        } catch (error) {
            
            res.json({
                ok: false,
                err: error.message
            })
        }

    };

}


export default solicitanteController;