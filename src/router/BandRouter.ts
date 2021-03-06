import express from "express";
import bandController from "../controller/BandController"

export const bandRouter = express.Router();

bandRouter.post("/register", bandController.registerBand);
bandRouter.get("/details/:idOrName", bandController.getBandDetails);