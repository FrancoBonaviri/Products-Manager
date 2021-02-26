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
    imagenes: {
        type: [ { type: String } ],
        required: [ false ],
        default: ['default-product.jpg']
    },
    categoria: {
        type: Schema.Types.ObjectId,
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


interface Iproducto extends Document {
    nombre: string;
    descripcion: string;
    stock: number;
    precio: number;
    imagenes: [string];
    categoria: Schema.Types.ObjectId;
    estado: boolean;
    codigo: string

    isDisponible(): boolean
}


export const Producto = model<Iproducto>('Producto', productSchema);
