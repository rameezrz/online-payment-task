"use strict";
/* index.ts */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// project dependencies
const app_1 = __importDefault(require("./app"));
const { SERVER_PORT } = process.env;
// app listening 
app_1.default.listen(SERVER_PORT, () => {
    console.info(`App running on port ${SERVER_PORT}`);
});
//# sourceMappingURL=index.js.map