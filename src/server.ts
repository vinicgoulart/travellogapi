import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';

import { authRouter } from './Routes/AuthRoute';
import { userRouter } from './Routes/UserRoute';
import { logRouter } from './Routes/LogRoute';
import { commentRouter } from './Routes/CommentRoute';

dotenv.config();
const app: Express = express();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.URI, () => {
    console.log(`Connected to DB`);
});

var maxAge = 60*60*24*1000;
const sessionOptions = {
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: maxAge }
};

app.use(session(sessionOptions));

app.use(express.json());

app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/log', logRouter);
app.use('/comment', commentRouter);

app.listen(process.env.PORT || 9000, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
});
