import app from "./app";
import normalizePort from "./utils/normalizePort";
import './kafka/consumers'

const port = normalizePort(process.env.PORT || "3002");
app.httpServer.listen(port, () => console.log("App rodando"));