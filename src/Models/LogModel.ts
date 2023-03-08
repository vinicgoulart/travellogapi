import mongoose, { Schema } from "mongoose";

interface log{
    title: String,
    description: String,
    dateOfTravel?: String,
    place: String,
    idUser: String,
    imgUrl: String
};

const schema = new Schema<log>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateOfTravel: {
        type: Date,
        required: false
    },
    place: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
});

export const logSchema = mongoose.model('log', schema);
