import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: {
        type: [{
            _id: { type: Schema.Types.ObjectId, ref: 'products', required: true },
            quantity: { type: Schema.Types.Number, required: true }
        }],
        default: [],
        required: true,
    }
})

export default mongoose.model(cartCollection, cartSchema);
