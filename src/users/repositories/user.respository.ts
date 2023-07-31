import { User } from "../models/user.model";
import { EntityManager, Repository } from "typeorm";
import { datasource } from "../../shared/db/dbConnection";


export class UserRepository extends Repository<User> {
    constructor() {
        super(User, new EntityManager(datasource));
    }

    public async findByEmail(email: string) {
        return await this.findOneBy({ email: email });
    }

    
    
}