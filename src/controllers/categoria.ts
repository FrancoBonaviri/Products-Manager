import { Request, Response } from 'express';
import { Categoria } from '../models/categoria';
import { v4 as uuid } from 'uuid';
import { errorMonitor } from 'nodemailer/lib/mailer';


class categoriaController {


    static getAll = () => {
        
    }

    static geyByCodigo = () => {
        
    }

    static getById = () => {

    }

    static create =  async( req: Request, res: Response ) => {
        
        const { nombre, descripcion, estado } = req.body;

        // Genero el codigo unico ->
        const codigo = uuid();

        const categoria = {
            nombre,
            descripcion, 
            estado,
            codigo
        }


        try {


            const catDb = await Categoria.create( categoria )

            res.json({
                ok: true,
                message: 'Categoria creada',
                categoria: catDb
            });


        } catch (error) {
            res.json({
                ok: false,
                err: error.message
            })
        }

    }


    static update = () => {

    }


    static setBanner = () => {
        
    }


}


export default categoriaController;