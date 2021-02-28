import { Response, Request, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import { Categoria } from '../models/categoria';
import { validationResult } from 'express-validator';



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

    const cat = await Categoria.findOne({ codigo: cat_code });

    if( !cat ) {
        res.json({
            ok: false,
            message: 'Categoria invalida'
        });
        return; 
    } 

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