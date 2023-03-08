"use strict";
// @generated by protoc-gen-es v1.0.0 with parameter "target=ts"
// @generated from file user.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const protobuf_1 = require("@bufbuild/protobuf");
/**
 * @generated from message Person
 */
class Person extends protobuf_1.Message {
    constructor(data) {
        super();
        /**
         * @generated from field: int32 id = 1;
         */
        this.id = 0;
        /**
         * @generated from field: string userName = 2;
         */
        this.userName = "";
        protobuf_1.proto3.util.initPartial(data, this);
    }
    static fromBinary(bytes, options) {
        return new Person().fromBinary(bytes, options);
    }
    static fromJson(jsonValue, options) {
        return new Person().fromJson(jsonValue, options);
    }
    static fromJsonString(jsonString, options) {
        return new Person().fromJsonString(jsonString, options);
    }
    static equals(a, b) {
        return protobuf_1.proto3.util.equals(Person, a, b);
    }
}
exports.Person = Person;
Person.runtime = protobuf_1.proto3;
Person.typeName = "Person";
Person.fields = protobuf_1.proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "userName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
]);
//# sourceMappingURL=user_pb.js.map