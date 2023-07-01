import express from "express";
import cors, { CorsOptions } from "cors";
import http from "http";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

class App {
    public app: express.Application;
    public httpServer: http.Server<
        typeof http.IncomingMessage,
        typeof http.ServerResponse
    >;

    public io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

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
        this.io = new Server(this.httpServer, {
            cors: {
                origin: "*",
            },
        });
        this.app.use(express.json());
    }

    private routes() {
    }
}

export default new App();