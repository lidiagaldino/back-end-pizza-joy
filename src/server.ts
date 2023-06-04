import express from "express";
import { router } from "./routes/routes";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors({ methods: "GET,PUT,POST,DELETE,PATCH", origin: "*" }));
app.use(router);
app.listen(8080, () => {
  console.log("Waiting Requisitions");
});
