const mongoose = require('mongoose');

const totalAssignmentSchema = new mongoose.Schema({
    totalAssingment: {
        type: Number,
        default: 530
    },
    submittedAssingment: {
        type: Number,
        default: 0
    },
    pendingAssingment: {
        type: Number,
        default: 530
    }
}, { timestamps: true })


module.exports = mongoose.model("TotalAssignment", totalAssignmentSchema)