import bandDatabase, { BandDatabase } from "../data/BandDatabase";
import { CustomError } from "../errors/CustomError";
import { Band } from "../model/Band";
import { USER_ROLES } from "../model/User";
import idGenerator, { IdGenerator } from "../services/IdGenerator";
import tokenGenerator, { AuthenticationData, TokenGenerator } from "../services/TokenGenerator";

export class BandBusiness {
    
    constructor(
        private idGenerator: IdGenerator,
        private tokenGenerator: TokenGenerator,
        private bandDatabase: BandDatabase
    ) {};

    public async registerBand (
        name: string,
        genre: string,
        resposible: string,
        token: string
    ): Promise<void> {
        try {
            const tokenData: AuthenticationData = this.tokenGenerator.getTokenData(token);

            if (tokenData.role !== USER_ROLES.ADMIN) {
                throw new CustomError(401, "Access denied");
            };
            
            if (!name || !genre || !resposible) {
                throw new CustomError(422, "Missing input.");
            };

            const id = this.idGenerator.generateId();

            await this.bandDatabase.createBand(
                new Band(id, name, genre, resposible)
            );
        } catch (error) {
            if (error.message.includes("for key 'name'")) {
                throw new CustomError(409, "Band name already exist.");
            };
    
            throw new CustomError(error.statusCode, error.message);
        };
    };

    public async getBandDetails(
        input: string
    ): Promise<Band | undefined> {
        try {
            if (!input) {
                throw new CustomError(422, "Missing input.");
            };

            const band = await this.bandDatabase.getBandDetailsByIdOrName(input);

            if (!band) {
                throw new CustomError(404, "Band not found.");
            };

            return band;
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        };
    };
};

export default new BandBusiness(
    idGenerator,
    tokenGenerator,
    bandDatabase
);