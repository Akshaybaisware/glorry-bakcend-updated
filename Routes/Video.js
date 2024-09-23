const router = require("express").Router();
const { uploadVideoQuestions, getquestions, add_assignment, UpdateVideoCount } = require("../Controllers/Video");

router.post("/uploadvideoquestions", uploadVideoQuestions);
router.post("/getquestions", getquestions);
router.post("/addassignment", add_assignment);

router.post("/updatevideocount", UpdateVideoCount)

module.exports = router;