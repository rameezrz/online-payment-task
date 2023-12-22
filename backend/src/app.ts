
// global dependencies
import * as dotenv from 'dotenv';
dotenv.config();  // initialise environment variables using a local .env file

// project dependencies

// set express app
import express from 'express';
const app = express();

// middlewares
app.use(express.json());

// routes

export default app;