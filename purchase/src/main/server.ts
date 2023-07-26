import app from "./app";
import normalizePort from "./utils/normalizePort";

const port = normalizePort(process.env.PORT || "3003");
app.httpServer.listen(port, () => console.log("App rodando"));