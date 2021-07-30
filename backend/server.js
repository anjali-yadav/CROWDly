import express from 'express';
import connectDb from './config/db';
import cors from 'cors';
import passport from 'passport';
//confuguring dotenv
import dotenv from 'dotenv';
dotenv.config()

//connecting to database
connectDb();

// console.log(process.env.JWT_KEY);

const app = express();
app.use(express.json());
app.use(cors());

//mounting userRoutes and authroutes
//import routes
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', postRoutes);

//Passport middleware
app.use(passport.initialize());
//Passport config
import passportConfig from "./config/passport";
passportConfig(passport)
// require('./config/passport')(passport);

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to node server</h1>');
})

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message})
    }else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err)
    }
})
    
const port = process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on ${port}`);
})
