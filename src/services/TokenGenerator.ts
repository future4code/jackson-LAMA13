import * as jwt from "jsonwebtoken";
import { USER_ROLES } from "../model/User";

export class TokenGenerator {
    
    public generateToken(payload: AuthenticationData): string {
        return jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN as string
            }
        );
    };
        
    public getTokenData(token: string): AuthenticationData {
        return jwt.verify(
            token,
            process.env.JWT_KEY as string
        ) as AuthenticationData;
    };
}     

export type AuthenticationData = {
    id: string,
    role: USER_ROLES
};