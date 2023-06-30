import express from 'express';
import cookieParser from "cookie-parser";

import cartRouter from '../routes/cartRouter.js';
import productRouter from '../routes/productRouter.js';
import sessionRouter from '../routes/sessionRouter.js';
import userRouter from '../routes/userRouter.js';
import roleRouter from '../routes/roleRouter.js';
import mongoStore from "connect-mongo";
import session from "express-session";

import errorHandler from '../middlewares/errorHandler.js';

class AppExpress
{
    init()
    {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cookieParser());
        this.app.use(session({
            store: mongoStore.create({
              mongoUrl: process.env.MONGO_DB_URI,
              ttl: 50
            }),
            secret: 'CoderS3cR3tC0D3',
            resave: false,
            saveUninitialized: false
        }));
    }

    build()
    {
        this.app.use('/api/sessions', sessionRouter);
        this.app.use('/api/users', userRouter);
        this.app.use('/api/roles', roleRouter);
        this.app.use("/api/products", productRouter);
        this.app.use("/api/carts", cartRouter);
        this.app.use(errorHandler);
    }

    listen()
    {
      return this.app.listen(process.env.NODE_PORT, () => {
        console.log(`Server listening on port ${process.env.NODE_PORT}`);
      });
      
    }
}

export default AppExpress;
