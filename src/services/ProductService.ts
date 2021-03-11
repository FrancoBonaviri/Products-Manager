import { Producto } from '../models/producto';
import { DetalleVenta } from '../models/detalleVenta';
import { v4 as uuid } from 'uuid';



export default class ProductService {

    static isValidStockProduct = async( product_code: string, cant_solicitud: number ) => {
        
        const productDetalle = await Producto.findOne({ codigo: product_code });
        if( productDetalle?.stock && productDetalle?.stock >= cant_solicitud ) {
            return true;
        }
        else {
            throw new Error(`El producto ${ product_code } no posee stock suficiente. Actualize la solicitud de venta o incremente el stock.`);
        }

    }


    static creteDetalleVenta = async( detalles: any[], estado: string ) => {
        const detallesDb = [];
        const detallesCode: any = [];

        try {
            
            
            if( estado !== 'Solicitud'){
                await Promise.all( 
                    detalles.map( async( item: any ) => {
                       await ProductService.isValidStockProduct( item.producto, item.cantidad );
                    })
                )        
            }
    
            await Promise.all( 
                detalles.map( async( item: any ) => {
    
                    const code = uuid();
                    
                    const detalle = await DetalleVenta.create({...item, codigo: code});
                    
                    if( estado !== 'Solicitud'){
                        const product = await Producto.findOne({ codigo: item.producto });
                        if( product ){
                            await Producto.findOneAndUpdate({codigo: item.producto}, { stock: product.stock - item.cantidad});
                        }
                    }

                    detallesDb.push(detalle);
                    detallesCode.push(code);
    
                })
            )
    
    
            return detallesCode;
        } catch (error) {
            throw new Error( error.message );
        }
    }


    static getDetallesVenta = async ( detalles: string[] ) => {
        
        const detallesDb: any[] = [];

        await Promise.all( 
            detalles.map( async (item) => {
                const detalle = await DetalleVenta.findOne({ codigo: item });
                detallesDb.push( detalle ); 
            })
        )

        return detallesDb;


    }



}