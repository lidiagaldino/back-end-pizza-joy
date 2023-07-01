import { Socket } from 'socket.io'
import app from './app'
import IPayload from './interfaces/Jwt';
import jwt from 'jsonwebtoken'
import normalizePort from './utils/normalizePort';

const port = normalizePort(process.env.PORT || "3000");

app.io.on("connection", async (socket) => {
    console.log('NEW DELIVERYMAN IS ON' + socket.id);

    if (!socket.handshake.auth || !socket.handshake.auth.token) {
        console.log(socket.handshake.auth);
        socket.disconnect();
        return null;
    }

    let decoded: IPayload

    try {
        decoded = jwt.verify(socket.handshake.auth.token, "secret") as IPayload;

        if (decoded.modo != "DELIVERYMAN") {
            socket.disconnect()
            return null
        }

        socket.join(`deliveryman_${decoded.id}`)

    } catch (error) {
        socket.emit("InvalidToken", "token invalido");
        console.log("invalid");

        socket.disconnect();
        return null;
    }

})

app.httpServer.listen(port, () => console.log("App rodando"));