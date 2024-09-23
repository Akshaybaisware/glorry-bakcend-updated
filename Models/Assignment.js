const mongoose = require('mongoose');

// const new_assignmentSchema = new mongoose.Schema({
//     name: {
//         type: String,
//     },
//     address: {
//         type: String,
//     },
//     pinCode: {
//         type: String,
//     },
//     jobFunctional: {
//         type: String,
//     },
//     phone: {
//         type: String,
//     },
//     annualRevenue: {
//         type: String,
//     },
//     cleanCode: {
//         type: String,
//     },
//     reference_assignment: {
//         type: String,
//     },
//     userId: {
//         type: String,
//     },
//     status: { type: String },
// }, {
//     timestamps: true
// });

const new_assignmentSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    phonenumber: {
        type: String,
    },
    licencenumber: {
        type: String,
    },
    ip: {
        type: String,
    },
    zipcode: {
        type: String,
    },
    reference_assignment: {
        type: String,
    },
    userId: {
        type: String,
    },
    status: { type: String },
}, {
    timestamps: true
});
module.exports = mongoose.model('new_Assignment', new_assignmentSchema);