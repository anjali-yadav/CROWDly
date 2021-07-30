// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwT = require("passport-jwt").ExtractJwT;
// const mongoose = require("mongoose");
import pkg from 'passport-jwt'
const {Strategy, ExtractJwt} = pkg;
// const {ExtractJwt} = pkg.ExtractJwt;
const JwtStrategy = Strategy;

import mongoose from "mongoose"

const User = mongoose.model("User");
import dotenv from "dotenv"
dotenv.config();
// const key=process.env.JWT_KEY;
const uri=process.env.MONGO_URI;

const opts = {};
// opts.jwtFromRequest = ExtractJwT.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = process.env.JWT_KEY;

const passportconfig= (passport) => {
    passport.use(
        new JwtStrategy(opts,(jwt_payload,done)=>{
            User.findById(jwt_payload.id)
            .then(user=>{
                if(user) {
                    return done(null,user);
                }
                return done(null,false);
            })
            .catch(err=>console.log(err));
        })
    );
};
export default passportconfig;