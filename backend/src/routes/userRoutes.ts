import express from 'express';
import * as UserController from '../controllers/userController';

const router = express.Router();

// Route to sign up a new user
router.post('/signup', UserController.signUp);

// Route to login user
router.post('/login', UserController.login);

// Add more routes as needed

export default router;
