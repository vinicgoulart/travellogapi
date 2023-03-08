import mongoose, { Schema } from "mongoose";

interface comment{
    logId: String,
    comment: String
    dateOfComment: Date,
    idUser: String,
    likes?: Number
};

const schema = new Schema<comment>({
    logId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    dateOfComment: {
        type: Date,
        default: Date.now()
    },
    idUser: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
        required: false
    }
});

export const commentSchema = mongoose.model('comment', schema);
