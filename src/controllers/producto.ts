import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { Producto } from '../models/producto';
import { producto } from '../interfaces/producto';
import { json } from 'body-parser';




class productoController {


    static create = async ( req: Request, res: Response ) => {

        const { nombre, descripcion, stock, precio, categoria, estado } = req.body;

        const codigo = uuid();

        const product = {
            nombre, 
            descripcion,
            stock, 
            precio, 
            categoria, 
            estado,
            codigo
        }


        try {
            
            const productDb = await Producto.create(product);

            return res.json({
                ok: false,
                Producto: productDb
            });
        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }

    }

    static update = async ( req: Request, res: Response ) => {

        const product_code = req.params.code;

        const { nombre, descripcion, stock, precio, categoria, estado } = req.body;

        const producto: any = {
            nombre, 
            descripcion, 
            stock,
            precio,
            categoria,
            estado
        };

        Object.keys( producto ).forEach( key => (producto[key] === undefined )? delete producto[key] : {});
        
        try {
            
            const productDb = await Producto.findOneAndUpdate({ codigo: product_code }, producto, { new: true });

            return res.json({
                ok: true,
                Producto: productDb
            });

        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }

    };

    static addImageProduct = async ( req: Request, res: Response ) => {

    };

    static deleteImageProduct = async ( req: Request, res: Response ) => {

    };

    static deleteProduct = async ( req: Request, res: Response ) => {

    };


    
    //#region loads

    static getByCodigo = async( req: Request, res: Response ) => {

    };

    static getByCategoria = async ( req: Request, res: Response ) => {

    };


    //#endregion



}




export default productoController;