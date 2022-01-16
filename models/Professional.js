const { Schema, model } = require('mongoose');

const profSchema = new Schema({
    uid: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    phonenumber: { type: Number },
    address: {
        strNumber: { type: Number },
        addressLine: { type: String },
        city: { type: String },
        zipCode: { type: Number }
    },
    profession: { type: String },
    role: { type: String }
});

module.exports = model('Professional', profSchema);