import { Response, Request, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import { Categoria } from '../models/categoria';
import { validationResult } from 'express-validator';
import { Producto } from '../models/producto';



export const validBannerCat = async( req: Request, res: Response, next: NextFunction) => {
  
    if( !(req.files && req.files.banner ) ){
        res.json({
            ok: false,
            message: 'Tiene que enviar un archivo'
        });
        return;
    }
    
    const banner  = req.files.banner as UploadedFile;
    
    const cat_code = req.params.code;

    const cat = await Categoria.findOne({ codigo: cat_code, estado: true });

    if( !cat ) {
        res.json({
            ok: false,
            err: 'Categoria invalida'
        });
        return; 
    } 

    req.body.cat = cat;

    next();

}

export const BodyValidator = ( req: Request, res: Response, next: NextFunction ) => {

    const errors = validationResult( req );

    console.log(errors);
    if( !errors.isEmpty() ){
        return res.json({
            ok: false,
            errors: errors.array()
        });
    }
    

    next();
}

export const addImageProduct = async ( req: Request, res: Response, next: NextFunction ) => {

    if ( !req.files?.file ){
        return res.json({
            ok: false,
            err: 'Debe cargar una imagen con el nombre "file" '
        })
    }



    const product_code = req.params.code;


    const product = await Producto.findOne({ codigo: product_code, estado: true });


    if( !product ){
        return res.json({
            ok: false,
            err: 'Producto Invalido'
        });
    }

    req.body.producto = product;

    next();


}

export const isValidCat = async ( req: Request, res: Response, next: NextFunction ) => {

    const code = req.params.code;

    const cat = await Categoria.findOne({ codigo: code, estado : true });

    if( !cat ){
        return res.json({
            ok: false,
            err: 'Categoria invalida'
        });
    }

    next();

}

export const isValidImageProduct = async ( req: Request, res: Response, next: NextFunction ) => {
    
    const code = req.params.code;
    const imageName = req.params.image;

    const product = await Producto.findOne({ codigo: code, estado : true });

    if( !product ){
        return res.json({
            ok: false,
            err: 'Producto invalida'
        });
    }

    if( product.imagenes.indexOf(imageName) < 0 ){
        return res.json({
            ok: false,
            err: 'La imagen no pertenece al producto'
        });
    }

    req.body.producto = product;

    next(); 
}