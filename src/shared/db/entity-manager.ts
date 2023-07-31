import { DataSource, QueryRunner } from "typeorm";
import { EntityManager } from "typeorm/entity-manager/EntityManager";

class DataBaseConfigService {
    private entityManager?: EntityManager;
    constructor() {
        this.entityManager = null;
    }
    public getEntityManager() {
        return this.entityManager;
    }
    public setEntityManager(datasource?: DataSource, queryRunner?: QueryRunner) {
        this.entityManager = new EntityManager(datasource, queryRunner);
    }
}

export default new DataBaseConfigService();