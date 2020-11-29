import express from "express";
import { bandRouter } from "./router/BandRouter";
import { userRouter } from "./router/UserRouter";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/bands", bandRouter);

const server = app.listen(3003, () => {
    if(server) {
        console.log("Server is running on port 3003.");
    } else {
        console.error("Failure upon starting server.")
    };
});