import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useUIStore } from "../store/useWords"; // Import the updated store
import "./styles/AddSong.css";
import { addSongApi, searchSongsApi, getSongByIdApi } from "../Api/Api"; // Import required APIs
import { useWordsStore } from "../store/useWords"; // Import your words store

const AddSong = () => {
  const {
    isPopupOpen,
    openPopup,
    closePopup,
    startSearching,
    stopSearching,
    isSearchPopupOpen,
  } = useUIStore();
  const setWordsFromLyrics = useWordsStore((state) => state.setWordsFromLyrics); // Function to set words in TypingArea
  const [songName, setSongName] = useState("");
  const [songLyrics, setSongLyrics] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);

  // Handle adding a new song
  const handleAddSong = () => {
    const newSong = { songName, songLyrics };
    addSongApi(newSong)
      .then((response) => {
        console.log("Song added successfully:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error adding song:",
          error.response?.data || error.message,
        );
      });
    closePopup();
    setSongName("");
    setSongLyrics("");
  };

  // Handle search input changes
  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    // Fetch search results
    searchSongsApi(query)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching search results:",
          error.response?.data || error.message,
        );
      });
  };

  // Handle song selection from search results
  const handleSelectSong = (selectedSong) => {
    setSearchQuery(selectedSong.songName); // Set the search bar to the selected song name
    stopSearching(); // Close the search popup

    // Fetch the full song details, including lyrics
    getSongByIdApi(selectedSong._id)
      .then((response) => {
        const { songLyrics } = response.data;
        setSongLyrics(songLyrics); // Set lyrics in AddSong component
        setWordsFromLyrics(songLyrics); // Update TypingArea with lyrics
      })
      .catch((error) => {
        console.error(
          "Error fetching song by ID:",
          error.response?.data || error.message,
        );
      });
  };

  return (
    <>
      <div className='w-full max-w-4xl mx-auto px-4 flex items-center gap-4 mb-6'>
        {/* Search Button */}
        <button
          onClick={startSearching}
          className='px-4 py-2 text-sm text-white hover:text-yellow-200 transition-colors'
        >
          Search Songs
        </button>
        <button
          onClick={openPopup}
          className='px-4 py-2 text-sm text-white hover:text-yellow-200 transition-colors'
        >
          Add song
        </button>
      </div>

      {/* Search Popup */}
      {isSearchPopupOpen &&
        ReactDOM.createPortal(
          <div className='popup-overlay'>
            <div className='popup-container'>
              <h2 className='popup-header'>Search Songs</h2>
              <input
                type='text'
                value={searchQuery}
                onChange={handleSearchInput}
                className='popup-input'
                placeholder='Search for songs here'
              />
              <div className='search-results'>
                {searchResults.map((song) => (
                  <div
                    key={song._id}
                    onClick={() => handleSelectSong(song)}
                    className='p-2 text-white hover:bg-gray-700 cursor-pointer'
                  >
                    {song.songName}
                  </div>
                ))}
              </div>
              <div className='popup-buttons'>
                <button
                  onClick={() => setIsSearchPopupOpen(false)}
                  className='popup-button-cancel'
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* Add Song Popup */}
      {isPopupOpen &&
        ReactDOM.createPortal(
          <div className='popup-overlay'>
            <div className='popup-container'>
              <h2 className='popup-header'>Add a New Song</h2>
              <div>
                <label>Song Name</label>
                <input
                  type='text'
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                  className='popup-input'
                />
              </div>
              <div>
                <label>Song Lyrics</label>
                <textarea
                  value={songLyrics}
                  onChange={(e) => setSongLyrics(e.target.value)}
                  className='popup-textarea'
                />
              </div>
              <div className='popup-buttons'>
                <button onClick={closePopup} className='popup-button-cancel'>
                  Cancel
                </button>
                <button onClick={handleAddSong} className='popup-button-add'>
                  Add
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default AddSong;
