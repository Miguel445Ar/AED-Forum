"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityManager_1 = require("typeorm/entity-manager/EntityManager");
class DataBaseConfigService {
    constructor() {
        this.entityManager = null;
    }
    getEntityManager() {
        return this.entityManager;
    }
    setEntityManager(datasource, queryRunner) {
        this.entityManager = new EntityManager_1.EntityManager(datasource, queryRunner);
    }
}
exports.default = new DataBaseConfigService();
//# sourceMappingURL=entity-manager.js.map