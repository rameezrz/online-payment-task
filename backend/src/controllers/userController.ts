import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';

const saltRounds = 10;
const secretKey = 'yourSecretKey'; // Replace with a secure secret key for JWT


// Sign up a new user
export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  
        // Set the token in the user's browser cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3600 * 1000 }); // maxAge is in milliseconds
  
        // Send a response with only essential user details
        res.json({ message: 'Login successful', userId: user._id, email: user.email });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

