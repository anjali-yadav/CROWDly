// const mongoose = require('mongoose')
import mongoose from 'mongoose'
const connectDb = () =>{
    mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: "true",
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    // serverSelectionTimeoutMS: 1000,
    })
    mongoose.connection.on("error", err => {
    console.log("err", err)
    })
    mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
    })
}
export default connectDb