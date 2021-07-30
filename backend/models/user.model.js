import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
      name: {
        type: String,
        trim: true,
        required: true,
        unique:true,
      },
      about:{
        type: String,
        trim:true,
      },
      email: {
        type: String,
        trim: true,
        required: true,
        unique:true,
      },
      photo:{
        data: Buffer,
        contentType: String,
      },
      password: {
        type: String,
        required: true,
      },
      github: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      photo: {
        data: Buffer,
        contentType: String
      },        
      updated: Date,
      following: [{type:mongoose.Schema.ObjectId, ref:'User'}],
      followers: [{type: mongoose.Schema.ObjectId, ref:'User'}],
      created: {
        type: Date,
        default: Date.now
    }
})
export default mongoose.model('User',UserSchema);