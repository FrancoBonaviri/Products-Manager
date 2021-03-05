import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { Producto } from '../models/producto';

import { UploadedFile } from 'express-fileupload';
import FileService from '../services/FileService';




class productoController {


    static create = async ( req: Request, res: Response ) => {

        const { nombre, descripcion, stock, precio, categoria, estado, costo } = req.body;

        const codigo = uuid();

        const product = {
            nombre, 
            descripcion,
            stock, 
            precio, 
            categoria, 
            estado,
            costo,
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

        const { nombre, descripcion, stock, precio, categoria, estado, costo } = req.body;

        const producto: any = {
            nombre, 
            descripcion, 
            stock,
            precio,
            categoria,
            costo,
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
        
        const code = req.params.code;

        const file  = req.files?.file as UploadedFile;

        const beforeFiles = req.body.producto.imagenes;

        try {
            
            const fileName = await FileService.saveImageCategoria( code, file.name, file);

            const newArrayFiles = [ ...req.body.producto.imagenes, fileName ];

            await Producto.findOneAndUpdate({ codigo: code }, { imagenes: newArrayFiles });

            return res.json({
                Ok: true,
                message: 'Imagen cargada con exito'
            });


        } catch (error) {
            
            return res.json({
                ok: false,
                err: error.message
            });
        }


    };

    static deleteImageProduct = async ( req: Request, res: Response ) => {

        const code = req.params.code;

        const imageName = req.params.image;

        console.log(req.body.producto);
        const beforeFiles = req.body.producto.imagenes;

        try {
            
            FileService.deleteProductImage(code, imageName);

            const newFiles = beforeFiles.filter( (file: any) => file != imageName );

            const productDB = await Producto.findOneAndUpdate({codigo: code}, { imagenes: newFiles }, {new: true});

            return res.json({
                ok: true,
                producto: productDB
            });

        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });   
        }
        

    };

    static deleteProduct = async ( req: Request, res: Response ) => {

        const code = req.params.code;

        try {
            
            const product = await Producto.findOneAndDelete({ codigo: code });

            if( !product ){
                return res.json({
                    ok: false,
                    err: "El producto es invalido"
                });
            }

            product.imagenes.forEach( image => {
                FileService.deleteProductImage( code, image );
            });

            return res.json({
                ok: true,
                message: 'Producto eliminado'
            });


        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }

    };


    
    //#region loads

    static getByCodigo = async( req: Request, res: Response ) => {

        const code = req.params.code;

        try {

            const product = await Producto.findOne({ codigo: code, estado: true });

            if( !product ){
                return res.json({
                    ok: false,
                    err: 'Producto no encontrado'
                });
            };

            return res.json({
                ok: true,
                producto: product
            });

            
        } catch (error) {

            return res.json({
                ok: false,
                err: error.message
            });            
        }


    };

    static getByCategoria = async ( req: Request, res: Response ) => {
        const code = req.params.code;

        try {
            
            const products = await Producto.find({ categoria: code, estado: true});

            return res.json({
                ok: true,
                productos: products
            });

        } catch (error) {

            return res.json({
                ok: false,
                err: error.message
            });   
        }

    };

    static getImage = async ( req: Request, res: Response ) => {

        const imageName = req.params.image;

        const code = req.params.code;
        
        try {
            
            const imagePath = FileService.getProductImage( code, imageName );

            return res.sendFile( imagePath );


        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });   
        }


    }


    //#endregion



}




export default productoController;