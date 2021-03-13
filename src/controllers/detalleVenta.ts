import { Request, Response } from 'express'
import { Venta, estadoVenta } from '../models/venta';
import ProductService from '../services/ProductService';
import { DetalleVenta } from '../models/detalleVenta';
import { producto } from '../interfaces/producto';
import { Producto } from '../models/producto';

class DetalleVentaController {

    static getByVenta = async ( req: Request, res: Response ) => {
        const ventaCode = req.params.code;



        try {
            
            const venta = await Venta.findOne({ codigo: ventaCode });

            if( !venta ){
                return res.json({
                    ok: false,
                    err: 'Venta invalida'
                });
            }

            const detalles = await ProductService.getDetallesVenta(venta.detalles);

            return res.json({
                ok: true,
                detalles
            });

        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });            

        }
    }

    static getByCode = async ( req: Request, res: Response ) => {
        const code = req.params.code;


        try {
            
            const detalle = await DetalleVenta.findOne({ codigo: code });

            if( !detalle ){
                return res.json({
                    ok: false,
                    err: 'Detalle invalido'
                });
            }

            return res.json({
                ok: true,
                detalle
            });

        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            })
        }


    }

    static update = async ( req: Request, res: Response ) => {

        const code = req.params.code;
        const ventaCode = req.params.ventaCode;

        const { producto, cantidad } = req.body;

        const updatedObject: any = { producto, cantidad };

        Object.keys( updatedObject ).forEach( key => (!updatedObject[key]) ? delete updatedObject[key] : {} );

        try {
            
            // valido venta y estado ->
            const venta: any  = await Venta.findOne({ codigo: ventaCode });
            if( !venta ){
                return res.json({
                    ok: false,
                    err: 'Venta invalida'
                });
            }
            const estado = estadoVenta[venta.estado];

            if(  Number(estado) != estadoVenta.Solicitud ){
                return res.json({
                    ok: false,
                    err: 'No se puede actualizar un detalle de una venta que no sea una solicitud'
                });
            }

            // valido el producto ->
            if( updatedObject.producto ) {
                const product = await Producto.findOne({ codigo: updatedObject.producto });

                if( !product ){
                    return res.json({
                        ok: false,
                        err: 'Producto invalido'
                    });
                }
            }

            const ok = venta.detalles.find( (item: any) => item == code );

            if( !ok ){
                return res.json({
                    ok: false,
                    err: 'El detalle no pertenece a la venta indicada'
                });
            };

            const detalleVentaDb = await DetalleVenta.findOneAndUpdate( { codigo: code }, updatedObject, { new: true } );

            if( !detalleVentaDb ){
                return res.json({
                    ok: false,
                    err: 'Detalle Invalido'
                });
            }


            return res.json({
                ok: true,
                Detalle: detalleVentaDb
            });

            
        } catch (error) {
            return res.json({
                ok: false,
                err: error.message
            });
        }
    }

    static delete = async ( req: Request, res: Response ) => {
        // TODO DELETE DETALLE VENTA

        const code = req.params.code;
        const ventaCode = req.params.ventaCode

        try {

            // valido venta y estado ->
            const venta: any  = await Venta.findOne({ codigo: ventaCode });
            if( !venta ){
                return res.json({
                    ok: false,
                    err: 'Venta invalida'
                });
            }
            const estado = estadoVenta[venta.estado];

            if(  Number(estado) != estadoVenta.Solicitud ){
                return res.json({
                    ok: false,
                    err: 'No se puede eliminar un detalle de una venta que no sea una solicitud'
                });
            }

            
            const ok = venta.detalles.find( (item: any) => item == code );

            if( !ok ){
                return res.json({
                    ok: false,
                    err: 'El detalle no pertenece a la venta indicada'
                });
            };

            const detalle = await DetalleVenta.findOneAndDelete({ codigo: code });

            if( !detalle ){
                return res.json({
                    ok: false,
                    err: 'Detalle invalido'
                })
            }

            const newDetalleVenta = venta.detalles.filter( (u: any) => u != detalle.codigo )
            console.log(newDetalleVenta);

            await Venta.findOneAndUpdate({ codigo: ventaCode }, { detalles: newDetalleVenta });


            return res.json({
                ok: true,
                message: 'Detalle eliminado'
            });



        } catch (error) {
            
        }


        // ELIMINAR DETALLE VENTA
        // ELIMINAR DETALLE VENTA DEL OBJECTO VENTA (PADRE)
    }


}


export default DetalleVentaController;

