import express from "express";
import cors, { CorsOptions } from "cors";
import http from "http";
import stripeRoutes from './routes/stripeRoutes'
import * as dotenv from 'dotenv'
import orderRoutes from './routes/orderRoutes'

class App {
    public app: express.Application;
    public httpServer: http.Server<
        typeof http.IncomingMessage,
        typeof http.ServerResponse
    >;

    public constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);

        this.middleware();
        this.routes();
    }

    private enableCors() {
        const options: CorsOptions = {
            methods: "GET,PUT,POST,DELETE,PATCH",
            origin: "*",
        };
        this.app.use(cors(options));
    }

    private middleware() {
        dotenv.config()
        this.enableCors();
    }

    private routes() {
        this.app.use('/stripe', stripeRoutes)
        this.app.use('/order', orderRoutes)
    }
}

export default new App();