import { Request, Response } from "express";
import userBusiness from "../business/UserBusiness";

export class UserController {

    public async signup(req: Request, res: Response): Promise<void> {
        try {
            const {name, email, password, role} = req.body;

            const result = await userBusiness.signup(
                name,
                email,
                password,
                role
            );

            res.status(201).send(result)
        } catch (error) {
            const { statusCode, message } = error;
            res.status(statusCode || 400).send({ message });
        };
    };

    public async login (req: Request, res: Response): Promise<void> {
        try {
            const {email, password} = req.body;

            const result = await userBusiness.login(email, password);
            
            res.status(200).send(result);
        } catch (error) {
            const { statusCode, message } = error;
            res.status(statusCode || 400).send({ message });  
        };
    };
};

export default new UserController()