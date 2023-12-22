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
exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const saltRounds = 10;
const secretKey = 'yourSecretKey'; // Replace with a secure secret key for JWT
// Sign up a new user
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const newUser = new User_1.default({ email, password: hashedPassword });
        yield newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.signUp = signUp;
// Login user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (passwordMatch) {
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
            // Set the token in the user's browser cookie
            res.cookie('token', token, { httpOnly: true, maxAge: 3600 * 1000 }); // maxAge is in milliseconds
            // Send a response with only essential user details
            res.json({ message: 'Login successful', userId: user._id, email: user.email });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.login = login;
//# sourceMappingURL=userController.js.map