import { Request, Response } from 'express';
import { Categoria } from '../models/categoria';
import { v4 as uuid } from 'uuid';
import FileService from '../services/FileService';
import { UploadedFile } from 'express-fileupload';
import { body } from 'express-validator';



class categoriaController {


    static getAll = async( req: Request, res: Response ) => {
        
        try {
            
            const categorias = await Categoria.find({ estado : true });

            return res.json({
                ok: true,
                categorias
            });


        } catch (error) {

            return res.json({
                ok: false,
                err: error.message
            });

        }

    }

    static geyByCodigo = async( req: Request, res: Response ) => {
        try {
            
            const code = req.params.code;

            const categorias = await Categoria.find({ estado : true, codigo: code });

            return res.json({
                ok: true,
                categorias
            });


        } catch (error) {

            return res.json({
                ok: false,
                err: error.message
            });

        }
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

    static update = async( req: Request, res: Response ) => {

        const code = req.params.code;
        const { nombre, descripcion } = req.body;


        try {
            const cateDb = await Categoria.findOneAndUpdate({ codigo: code }, { nombre: nombre, descripcion: descripcion }, { new: true });
            

            if( !cateDb ){
                res.json({
                    ok: false,
                    err: 'La categoria no existe'
                });
            }

            return res.json({
                ok: true,
                categoria: cateDb
            });


        } catch (error) {
            res.json({
                ok: false,
                err: error.message
            })
        }
    }

    static setBanner = async ( req: Request, res: Response ) => {        
        
        const banner  = req.files?.banner as UploadedFile;
        
        const cat_code = req.params.code;

        try {

            const fileName = await FileService.saveBannerCategoria( banner, cat_code, banner.name );

            console.log(fileName);
            await Categoria.findOneAndUpdate({ codigo: cat_code }, { banner : fileName })

            return res.json({
                Ok: true,
                message: 'Imagen cargada con exito'
            });

        } catch (error) {

            return res.json({
                Ok: false,
                error: error.message
            });
        }

    }
    
    static delete = async ( req: Request, res: Response ) => {

        const code  = req.params.code;

        try {
            const cate = await Categoria.findOneAndDelete({ codigo: code })
            
            if( cate ){
                await FileService.deleteCategoriaFolder(cate.codigo, cate.banner);
            }




            return res.json({
                ok: true,
                message: 'Categoria Eliminada'
            });
            
        } catch (error) {
            return res.json({
                ok: false,
                error: error.message
            })
        }


    }

    static getImage = async ( req: Request, res: Response ) => {

        const code = req.params.code;

        const cat = await Categoria.findOne({ codigo: code });

        if( !cat ){
            return res.json({
                ok: false,
                message: 'Categoria invalida'
            });
        };


        const file = FileService.getCategoriaImage(cat.codigo, cat.banner);

        return res.sendFile( file );

    }


}


export default categoriaController;