import { Request, Response } from 'express';
import { Categoria } from '../models/categoria';
class categoriaController {


    static getAll = () => {
        
    }


    static getById = () => {

    }

    static create =  ( req: Request, res: Response ) => {
        
        const { nombre, descripcion, banner, estado } = req.body;

        const categoria = {
            nombre,
            descripcion, 
            banner,
            estado
        }

        try {


            const catDb = Categoria.create( categoria )

            res.json({
                ok: true,
                message: 'Categoria creada',
                categoria: catDb
            });


        } catch (error) {
            res.json({
                ok: false,
                err: error
            })
        }

    }


    static update = () => {

    }


}


export default categoriaController;