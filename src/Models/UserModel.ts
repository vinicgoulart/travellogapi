import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

interface User{
    username: String,
    email: String,
    password: String,
    description?: String
};

const schema = new Schema<User>({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    }
});

schema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(error, salt){
        if(error) return next(error);
        // @ts-ignore
        bcrypt.hash(user.password, salt, function(error, hash){
            if(error) return next(error);

            user.password = hash;
            next();
        });
    });
});

export const userSchema = mongoose.model('User', schema);
