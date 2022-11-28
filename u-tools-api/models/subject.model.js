const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const SubjectSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    uv: {
        type: String,
        required: true,
    },
    correlative: {
        type: String,
        required: true
    },

    state: {
        type: Boolean,
        default: false
    },

    hidden: {
        type: Boolean,
        default: false
    }


}, {timestamps: true});

module.exports = Mongoose.model("Subject", SubjectSchema);




