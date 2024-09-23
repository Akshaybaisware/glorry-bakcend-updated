const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    videonumber: {
        type: String, // Corrected type
    },
    url: {
        type: String, // Added URL field
        required: true
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        submitted: {
            type: Boolean,
            default: false
        },
        userSubmissions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Video', VideoSchema);