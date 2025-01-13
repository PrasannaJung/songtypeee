const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController"); // Adjust the path if needed

router.post("/add", songController.addSong);
router.get("/names", songController.getAllSongNames);
router.get("/search", songController.searchSongs);

router.get("/:id", songController.getSongById);

module.exports = router;
