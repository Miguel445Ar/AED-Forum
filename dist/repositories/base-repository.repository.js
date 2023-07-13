"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
class BaseRepository {
    constructor(tableName) {
        this.tableName = tableName;
    }
    save(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield dbConnection_1.default).query(`INSERT INTO ${this.tableName} ${model.toQuery()}`);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield dbConnection_1.default).query(`SELECT * FROM ${this.tableName}`);
        });
    }
    saveAll(models) {
        return __awaiter(this, void 0, void 0, function* () {
            let queries = "";
            models.forEach((model) => { queries = queries.concat(`INSERT INTO ${this.tableName} ${model.toQuery()};`); });
            return yield (yield dbConnection_1.default).execute(queries);
        });
    }
    getNewId() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield dbConnection_1.default).query(`SELECT MAX(id)+1 AS NEW_ID FROM ${this.tableName}`);
        });
    }
    complete() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield dbConnection_1.default).commit();
        });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base-repository.repository.js.map