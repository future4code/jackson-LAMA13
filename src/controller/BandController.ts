import { Request, Response } from "express";
import bandBusiness from "../business/BandBusiness";

export class BandController {
    
    public async registerBand(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization as string;
            const {name, genre, responsible} = req.body;

            await bandBusiness.registerBand(name, genre, responsible, token);

            res.status(201).send("Band successfully created!");
        } catch (error) {
            const { statusCode, message } = error;
            res.status(statusCode || 400).send({ message });
        };
    };
};

export default new BandController();