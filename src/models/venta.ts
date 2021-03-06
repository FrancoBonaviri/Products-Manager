import { Schema, model, Document } from 'mongoose';


const ventaSchema = new Schema({

    codigo: {
        type: String,
        required: [true, 'El codigo es requerido']
    },
    detalles: {
        type: [String]
    },
    solicitante: {
        type: String,
        required: [true, 'El codigo del solicitante es necesario']
    },
    fechaPedido: {
        type: Date,
        required: [true, 'La fecha es requerida']
    },
    fechaConfirmacion: {
        type: Date
    },
    fechaDespacho: {
        type: Date
    },
    estado: {
        type: String,
        required: [ true, 'El estado es necesario' ]
    }
    
});

export enum estadoVenta {
    Solicitud,
    SinEnvio,
    Finalizada
};


interface Iventa extends Document {
    codigo: string;
    detalles: [string];
    solicitante: string;
    fechaPedido: string;
    fechaConfirmacion: string;
    fechaDespacho: string;
    estado: string;
}

export const Venta = model<Iventa>('Venta', ventaSchema);




