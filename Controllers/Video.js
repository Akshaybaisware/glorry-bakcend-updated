const { model } = require("mongoose");
const VideoSchema = require("../Models/VideSchema");
const User = require("../Models/User");

const uploadVideoQuestions = async(req, res) => {
    try {
        const { videonumber, url, questions } = req.body;

        if (!videonumber || !url || !questions) {
            return res.status(400).json({ error: 'All fields are required' });
        }


        // const questionSet = new Set(questions.map(question => question.question));
        // if (questionSet.size !== questions.length) {
        //     return res.status(400).json({ error: 'Questions must be unique' });
        // }

        const videoData = {
            videonumber,
            url,
            questions
        };

        const newVideo = await VideoSchema.findOneAndUpdate({ url: url },
            videoData, { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(201).json(newVideo);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving the video data' });
    }
};
const getquestions = async(req, res) => {
    try {
        const { videonumber, userId } = req.body;

        // Find the video
        const video = await VideoSchema.findOne({ videonumber });
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        // Filter out submitted questions for the current user
        const filteredQuestions = video.questions.filter(question => !question.submitted || !question.userSubmissions.includes(userId));

        // Limit to 80 questions
        const limitedQuestions = filteredQuestions.slice(0, 80);

        res.status(200).json(limitedQuestions);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the questions', msg: error.message });
    }
};


const add_assignment = async(req, res) => {
    try {
        const { userId, questionId } = req.body;

        // Check if all required fields are provided
        // ...

        // Update total assignments (if needed)
        const user = await User.findById(userId);
        if (user) {
            if (user.submittedAssignmentCount < 400) {
                user.submittedAssignmentCount += 1;
            }
            user.pendingAssignmentCount -= 1;
            await user.save();
        }

        // Update the submitted field and add the user's ID to the userSubmissions array for the specific question
        const video = await VideoSchema.findOneAndUpdate({ "questions._id": questionId }, // Find the video with the specified question
            { $set: { "questions.$.submitted": true }, "questions.$.userSubmissions": userId }, // Update the submitted field and add the user's ID to the userSubmissions array for the matched question
            { new: true } // Return the updated document
        );


        res.status(201).json({
            message: "Assignment added successfully",
            video: video // Optionally, you can send back the updated video
        });
    } catch (error) {
        console.error("Error adding assignment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const UpdateVideoCount = async(req, res) => {
    try {
        const { videonumber, userId } = req.body;

        // Update the videonumber for the given userId
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, { videoNumber: videonumber }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Video count updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = {
    uploadVideoQuestions,
    getquestions,
    add_assignment,
    UpdateVideoCount
};