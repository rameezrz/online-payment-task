"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
require('dotenv').config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGO_DB_URI)
    .then(() => console.log("Mongodb connected"));
// Use the user routes
app.use("/users", userRoutes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map