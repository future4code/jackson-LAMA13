import userDatabase, { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../errors/CustomError";
import { stringToUserRole, User } from "../model/User";
import hashManager, { HashManager } from "../services/HashManager";
import idGenerator, { IdGenerator } from "../services/IdGenerator";
import tokenGenerator, { TokenGenerator } from "../services/TokenGenerator";

export class UserBusiness {
    
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenGenerator: TokenGenerator,
        private userDatabase: UserDatabase
    ) {};
    
    public async signup (
        name: string,
        email: string,
        password: string,
        role: string
    ) {
        try {
            if (!name || !email || !password || !role) {
                throw new CustomError(422, "Missing input");
            };

            if (!email.includes("@")) {
                throw new CustomError(422, "Invalid e-mail");
            };

            if (password.length < 6) {
                throw new CustomError(422, "Your password must have more than 6 characters");
            };

            const id = this.idGenerator.generateId();
            const cypherPassword = await this.hashManager.hash(password);

            await this.userDatabase.createUser(
                new User(id, name, email, cypherPassword, stringToUserRole(role.toUpperCase()))
            );

            const token = this.tokenGenerator.generateToken({
                id,
                role: stringToUserRole(role.toUpperCase())
            });

            return {token};
        } catch (error) {
            if (error.message.includes("for key 'email'")) {
                throw new CustomError(409, "Email already in use");
            };
    
            throw new CustomError(error.statusCode, error.message);
        };
    };

    public async login (email: string, password: string) {
        try {
            if(!email || !password) {
                throw new CustomError(422, "Missing input");
            };

            if (!email.includes("@")) {
                throw new CustomError(422, "Invalid e-mail");
            };

            const user = await this.userDatabase.getUserByEmail(email);

            if (!user) {
                throw new CustomError(401, "Invalid credentials.");
            };

            const isPasswordCorrect = this.hashManager.hashCompare(password, user.getPassword());

            if (!isPasswordCorrect) {
                throw new CustomError(401, "Invalid credentials.");
            };

            const token = this.tokenGenerator.generateToken({
                id: user.getId(),
                role: stringToUserRole(user.getRole())
            });

            return {token};
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        };
    };
};

export default new UserBusiness(
    idGenerator,
    hashManager,
    tokenGenerator,
    userDatabase
);