import { Band } from "../model/Band";
import BaseDatabase from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {

    protected tableName: string = "lama_bands";

    private toModel(dbModel?: any): Band | undefined{
        return (
            dbModel &&
            new Band (
                dbModel.id,
                dbModel.name,
                dbModel.genre,
                dbModel.responsible
            )
        );
    };

    public async createBand(band: Band): Promise<void> {
        try {
            await BaseDatabase.connection(this.tableName)
            .insert({
                id: band.getId(),
                name: band.getName(),
                music_genre: band.getGenre(),
                responsible: band.getResponsible()
            });
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        };
    };
};

export default new BandDatabase();