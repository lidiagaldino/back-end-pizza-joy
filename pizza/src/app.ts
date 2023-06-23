import express from "express";
import cors, { CorsOptions } from "cors";
import http from "http";
import pizzaRoutes from './routes/pizzaRoutes'

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
        this.enableCors();
        this.app.use(express.json());
    }

    private routes() {
        this.app.use('/pizza', pizzaRoutes)
    }
}

export default new App();