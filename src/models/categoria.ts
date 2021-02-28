import { Schema, model, Document } from 'mongoose';


const categoriaSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre de la categoria es necesario']
    },
    descripcion: {
        type: String,
        required: false,
    },
    codigo: {
        type: String,
        required: [true, 'Debe indicar un codigo']
    },
    estado: {
        type: Boolean,
        required: false,
        default: true
    },
    banner: {
        type: String,
    }

});

categoriaSchema.method('toJSON', function() {
    const { __v, ...data } = this._doc;
    return data;
});


interface Icategoria extends Document {
    nombre: string;
    descripcion: string;
    codigo: string;
    estado: boolean
    banner: string
}


export const Categoria = model<Icategoria>('Categoria', categoriaSchema);