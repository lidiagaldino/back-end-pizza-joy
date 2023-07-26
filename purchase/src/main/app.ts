import express from "express";
import cors, { CorsOptions } from "cors";
import http from "http";
import * as dotenv from 'dotenv'
import paymentRoutes from './routes/payment.routes'
import orderRoutes from './routes/order.routes'


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
        dotenv.config({
            path: '../../.env'
        })
        this.enableCors();
    }

    private routes() {
        this.app.use('/stripe', paymentRoutes)
        this.app.use('/order', express.json(), orderRoutes)
    }
}

export default new App();