"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNode = void 0;
class ListNode {
    constructor(_value, _next) {
        this._value = _value;
        this._next = _next;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    get next() {
        return this._next;
    }
    set next(next) {
        this._next = next;
    }
}
exports.ListNode = ListNode;
//# sourceMappingURL=ListNode.js.map