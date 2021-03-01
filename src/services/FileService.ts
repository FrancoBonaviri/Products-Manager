import { FileUpload } from '../interfaces/fileUpload';
import path from 'path';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { Response } from 'express';

const valid_files_types = [ 'png' , 'jpg' , 'jpeg' , 'gif' ]; 


export default class FileService {




    static saveBannerCategoria = ( file: FileUpload, cat_code: string, fileName: string ) => {
        return new Promise<any> ( (resolve, reject) => {
            try {
                
                const folder = FileService.getCatFolder(cat_code);
    
                const name = FileService.getUniqueName( fileName );
    
                file.mv(`${ folder }/${ name }`, (err: any) => {
                    if( err ){ 
                        reject( err ); 
                        return;
                    }
    
                    resolve( name );
                    
                });

            } catch (error) {
                reject( error );
            }


        });
    }




    static getCatFolder = ( cat_code: string ) => {
        const pathCatFolder = path.resolve(__dirname, '../images', cat_code );

        if ( !fs.existsSync(pathCatFolder) ){
            fs.mkdirSync( pathCatFolder );
        }

        return pathCatFolder;
    }



    static deleteCategoriaFolder = ( cat_code: string, banner: string ) => {
        return new Promise<void> ( (resolve, reject) => {
            
            const full_path = path.resolve(__dirname, '../images', cat_code );
    
            fs.unlink(`${ full_path }/${ banner }`, (err) => {
                if( err ){
                    reject()
                    return;
                }
                resolve();
            });

        })
    }

    static getCategoriaImage = ( cat_code: string, imgName: string ) => {

        const fullPath = path.resolve(__dirname, '../images', cat_code, imgName);

        if( fs.existsSync( fullPath ) ){
            return fullPath;
        }

        return path.resolve(__dirname, '../assets', 'No-Image-Found.png');

    }

    static getUniqueName = ( fileName: string ) => {
        const nombreArr = fileName.split('.');
        const extencion = nombreArr[ nombreArr.length - 1 ];

        if( valid_files_types.indexOf(extencion) < 0 ){
            throw new Error('Formato de archivo invalido');
        }


        const uniqueId = uuid();

        return `${uniqueId}.${extencion}`
    }



}