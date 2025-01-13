const Song = require("../models/songModel");

exports.addSong = async (req, res) => {
  const { songName, songLyrics } = req.body;

  if (!songName || !songLyrics) {
    return res
      .status(400)
      .json({ message: "Song name and lyrics are required." });
  }

  try {
    const newSong = new Song({ songName, songLyrics });
    await newSong.save();
    res.status(201).json({ message: "Song added successfully", song: newSong });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add song", error: error.message });
  }
};

exports.getAllSongNames = async (req, res) => {
  try {
    const Song = await Song.find({}, { songName: 1, _id: 0 });
    res.status(200).json(Song);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch song names", error: error.message });
  }
};

exports.getSongById = async (req, res) => {
  const { id } = req.params;

  try {
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch song", error: error.message });
  }
};

exports.searchSongs = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Search query is required." });
  }

  try {
    const songs = await Song.find(
      { songName: { $regex: query, $options: "i" } },
      { songName: 1, _id: 1 }, // Only fetch songName
    );

    res.status(200).json(songs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to search songs", error: error.message });
  }
};
