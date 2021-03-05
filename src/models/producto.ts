import { Schema, model, Document } from 'mongoose';


const productSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre del producto es necesario']
    },
    descripcion: {
        type: String,
        required: false,
    },
    stock: {
        type: Number,
    },
    precio: {
        type: Number,
        required: [true, 'Debe indicar un precio']
    },
    costo: {
        type: Number,
        required: [true, 'Debe indicar un costo']
    },
    imagenes: {
        type: [ { type: String } ],
        required: [ false ]
    },
    categoria: {
        type: String,
        required: [ true, 'Debe indicar una categoria al producto']
    },
    estado: {
        type: Boolean,
        required: false,
        default: true
    },
    codigo: {
        type: String,
        required: true,
    }

})


productSchema.method('isDisponible', function(): boolean {
    return this.stock > 0
})


productSchema.method('toJSON', function() {
    const { __v, ...data } = this._doc;
    return data;
});


interface Iproducto extends Document {
    nombre: string;
    descripcion: string;
    stock: number;
    precio: number;
    imagenes: [string];
    categoria: string;
    estado: boolean;
    codigo: string

    isDisponible(): boolean
}


export const Producto = model<Iproducto>('Producto', productSchema);
