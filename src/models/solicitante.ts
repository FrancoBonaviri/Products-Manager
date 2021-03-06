import { Schema, model, Document } from 'mongoose';

const solicitanteSchema = new Schema({

    codigo: {
        type: String,
        required: [true, 'El Codigo es requerido']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es requerido']
    },
    email: {
        type: String,
    },
    telefono: {
        type: String,
    },
    codArea: {
        type: String,
    },
    codigoProvincia: {
        type: String,
    },
    codigoLocalidad: {
        type: String,
    },
    calle: {
        type: String,
    },
    altura: {
        type: String,
    },
    piso: {
        type: String,
    },
    codigoPostal: {
        type: String,
    }
});

interface Isolicitante extends Document {
    codigo: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    corArea: string;
    codigoProvincia: string;
    codigoLocalidad: string;
    calle: string;
    altura: string;
    piso: string;
    codigoPostal: string;
}

export const Solicitante = model<Isolicitante>('Solicitante', solicitanteSchema);