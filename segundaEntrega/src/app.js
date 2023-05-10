import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from "./routes/cartRouter.js";
import mongoose from "mongoose";

void(async()=>{
    try {

        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        });

        const app  = express();

        app.use(express.json());
        app.use(express.urlencoded({extended : true}));
        app.use(express.static('./public'))

        app.use("/api/products", productRouter);
        app.use("/api/carts", cartRouter);

        const port = process.env.PORT || 8080;
        
        app.listen(port, ()=>{
        console.log(`Servidor escuchando en puerto ${port}`)
        })

    } catch (error) {
        throw new Error(error);
    }
})();
