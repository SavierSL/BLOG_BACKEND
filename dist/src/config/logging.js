"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timeStamp = () => {
    return new Date().toISOString();
};
const info = (namespace, message, object) => {
    if (object) {
        console.log(`[${timeStamp()}] [INFO] [${namespace}] ${message}`, object);
    }
    else {
        console.log(`[${timeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};
const warn = (namespace, message, object) => {
    if (object) {
        console.warn(`[${timeStamp()}] [WARN] [${namespace}] ${message}`, object);
    }
    else {
        console.warn(`[${timeStamp()}] [WARN] [${namespace}] ${message}`);
    }
};
const error = (namespace, message, object) => {
    if (object) {
        console.error(`[${timeStamp()}] [ERROR] [${namespace}] ${message}`, object);
    }
    else {
        console.error(`[${timeStamp()}] [ERROR] [${namespace}] ${message}`);
    }
};
const debug = (namespace, message, object) => {
    if (object) {
        console.debug(`[${timeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
    }
    else {
        console.debug(`[${timeStamp()}] [DEBUG] [${namespace}] ${message}`);
    }
};
exports.default = {
    info,
    warn,
    error,
    debug,
};
//# sourceMappingURL=logging.js.map