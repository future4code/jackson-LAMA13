import { User } from "../model/User";
import BaseDatabase from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    
    protected tableName: string = "lama_users";
    
    private toModel(dbModel?: any): User | undefined {
        return (
            dbModel &&
            new User (
                dbModel.id,
                dbModel.name,
                dbModel.email,
                dbModel.password,
                dbModel.role,
            )
        );
    };

    public async createUser(user: User): Promise<void> {
        try {
            await BaseDatabase.connection(this.tableName)
            .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            });
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        };
    };

    public async getUserByEmail(email: string): Promise<User | undefined> {
        try {
            const result = await BaseDatabase.connection(this.tableName)
            .select("*")
            .where({email});

            return this.toModel(result[0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        };
    };
};

export default new UserDatabase();