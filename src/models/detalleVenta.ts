import { Schema, model, Document } from 'mongoose';


const detalleVentaSchema = new Schema({

    codigo: {
        type: String,
        reequired: [true, 'El codigo es requerido']
    },
    producto: {
        type: String,
        required: [true, 'El producto es necesario']
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es necesaria' ]
    }

});

interface IdetalleVenta extends Document {
    codigo: string;
    producto: string;
    cantidad: string;
}


export const DetalleVenta = model<IdetalleVenta>('DetalleVenta', detalleVentaSchema);