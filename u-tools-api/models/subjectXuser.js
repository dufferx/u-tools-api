const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const userXsubjectSchema = new Schema({
    subject_id: {
        type: String,
        required: true,
    },

    nota: {
        type: String,
        required: true,
    }
    
});

module.exports = Mongoose.model("subjectX", userXsubjectSchema);