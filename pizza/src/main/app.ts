import express from "express";
import cors, { CorsOptions } from "cors";
import http from "http";
import pizzaRoutes from './routes/pizza.routes'
import categoryRoutes from './routes/category.routes'
import sizeRoutes from './routes/size.routes'
import ingredientRoutes from './routes/ingredient.routes'
import pizzaSizeRoutes from './routes/pizza-size.routes'
import pizzaIngredientRoutes from './routes/pizza-ingredient.routes'

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
        this.app.use('/size', sizeRoutes)
        this.app.use('/ingredient', ingredientRoutes)
        this.app.use('/category', categoryRoutes)
        this.app.use('/pizza-size', pizzaSizeRoutes)
        this.app.use('/pizza-ingredient', pizzaIngredientRoutes)
    }
}

export default new App();