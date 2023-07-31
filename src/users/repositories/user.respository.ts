import { User } from "../models/user.model";
import { Repository } from "typeorm";
import dataBaseConfigService from "../../shared/db/entity-manager";


export class UserRepository extends Repository<User> {
    constructor() {
        super(User, dataBaseConfigService.getEntityManager());
    }

    public async findByEmail(email: string) {
        return await this.findOneBy({ email: email });
    }

    
    
}