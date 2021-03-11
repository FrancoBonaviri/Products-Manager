import { Request, Response } from 'express'
import { DetalleVenta } from '../models/detalleVenta';
import { v4 as uuid } from 'uuid';
import { estadoVenta, Venta } from '../models/venta';
import { Producto } from '../models/producto';
import ProductService from '../services/ProductService';

class ventasController {

    static create = async ( req: Request, res: Response ) => {
        
        const { detalles, solicitante, estado } = req.body;


        try {

            const detallesCode = await ProductService.creteDetalleVenta( detalles, estado );

            const codigo = uuid();
            
            const venta = {
                codigo,
                detalles: [ ...detallesCode ],
                solicitante,
                estado,
                fechaPedido: new Date(),
                fechaConfirmacion: (Number(estadoVenta[estado]) != estadoVenta.Solicitud) ? new Date() : undefined,
                fechaDespacho: (Number(estadoVenta[estado]) == estadoVenta.Finalizada) ? new Date() : undefined,
            }

            const ventaDb = await Venta.create( venta );
            
            return res.json({
                ok: true,
                venta: ventaDb
            })            

        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }
        

    }


    static confirmarVenta = async( req: Request, res: Response ) => {

        const code = req.params.code;


        try {
            
            const venta: any = await Venta.findOne( { codigo: code } );

            if( !venta ){
                return res.json({
                    ok: false,
                    err: 'Venta invalida'
                });
            }

            const estado = estadoVenta[ venta.estado ];

            if( ( Number(estado) != estadoVenta.Solicitud ) ){
                return res.json({
                    ok: false,
                    err: 'No se puede confirmar una venta que no este en estado Solicitud.'
                });
            }
            

            const detalles = await ProductService.getDetallesVenta( venta.detalles )

            await Promise.all( 
                detalles.map( async( item: any ) => {
                   await ProductService.isValidStockProduct( item.producto, item.cantidad );
                })
            )    

            await Promise.all( 
                detalles.map( async( item: any ) => {
                    const product = await Producto.findOne({ codigo: item.producto });
                    if( product ){
                        await Producto.findOneAndUpdate({codigo: item.producto}, { stock: product.stock - item.cantidad});
                    }
                })
            )   

            const updatedBody: any = {
                fechaConfirmacion: new Date,
                estado: 'SinEnvio'
            }

            const ventaDb = await Venta.findOneAndUpdate({ codigo: code }, updatedBody, { new: true });

            return res.json({ 
                ok: true,
                venta: ventaDb
            });

        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }

    }

    static finalizar = async( req: Request, res: Response) => {
        const code = req.params.code;


        try {
            
            const venta: any = await Venta.findOne({ codigo: code });

            if( !venta ){
                return res.json({
                    ok: false,
                    err: 'Venta invalida'
                });
            }

            const estado = estadoVenta[ venta.estado ];

            if( ( Number(estado) != estadoVenta.SinEnvio ) ){
                return res.json({
                    ok: false,
                    err: 'No se puede confirmar una venta que no este pendiente de envio.'
                });
            }


            const updatedObject: any = {
                fechaDespacho: new Date,
                estado: 'Finalizada'
            }

            const ventaDb = await Venta.findOneAndUpdate( { codigo: code }, updatedObject, { new: true } );

            return res.json({
                ok: false,
                venta: ventaDb
            });


        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }




    static getByCodigo = async ( req: Request, res: Response ) => {

        const code = req.params.code;

        try {
    
            const venta = await Venta.findOne({ codigo: code });

            if( !venta ) {
                return res.json({
                    ok: false,
                    err: 'Venta invalida'
                });
            }

            return res.json({
                ok: true,
                venta
            });
            
        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }

    static getAll = async ( req: Request, res: Response ) => {

        const page = Number(req.query.page) || 1;
        let skip = page - 1;
        skip = skip * 20; 
        
        try {
    
            const ventas = await Venta.find().skip( skip ).limit(20).exec();


            console.log(ventas.length);
        
            return res.json({
                ok: true,
                page,
                ventas
            });
            
        } catch (error) {
        
            return res.json({
                ok: false,
                err: error.message
            });
        }


    }

}


export default ventasController;