import { CustomError } from "../errors/CustomError";

export class User {
    
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: string,
    ) {}

    public getId = (): string => this.id;
    public getName = (): string => this.name;
    public getEmail = (): string => this.email;
    public getPassword = (): string => this.password;
    public getRole = (): string => this.role;
};

export const stringToUserRole = (input: string): USER_ROLES => {
    if (input === "NORMAL") {
        return USER_ROLES.NORMAL;
    } else if (input === "ADMIN") {
        return USER_ROLES.ADMIN;
    } else {
        throw new CustomError(422, "Invalid user role");
    };
};

export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
};