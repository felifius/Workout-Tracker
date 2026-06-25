import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import workoutRouter from './routes/workoutRouter.js';
import './modules/Exercises.js';
import {connectDB} from "./db.js";



dotenv.config();

const app = express();
const PORT = 3000;
const secret = process.env.SECRET;

app.use(express.json());


app.use('/', authRouter);
app.use('/', workoutRouter);


connectDB();

//Abre o servidor
app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`);
});

