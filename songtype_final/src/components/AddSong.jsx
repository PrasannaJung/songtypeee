import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useUIStore } from "../store/useWords"; // Import the updated store
import "./styles/AddSong.css";
import { addSongApi, searchSongsApi, getSongByIdApi } from "../Api/Api"; // Import required APIs
import { useWordsStore } from "../store/useWords"; // Import your words store

const AddSong = () => {
  const { isPopupOpen, openPopup, closePopup, startSearching, stopSearching } =
    useUIStore();
  const setWordsFromLyrics = useWordsStore((state) => state.setWordsFromLyrics); // Function to set words in TypingArea
  const [songName, setSongName] = useState("");
  const [songLyrics, setSongLyrics] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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
      setIsSearching(false);
      return;
    }

    // Fetch search results
    searchSongsApi(query)
      .then((response) => {
        setSearchResults(response.data);
        setIsSearching(true);
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
    setIsSearching(false); // Hide the search results box
    console.log("SONG SELECTED");

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
        {/* Search Bar */}
        <div
          className='relative flex-1'
          onBlur={() => {
            setTimeout(() => setIsSearching(false), 200); // Slight delay to ensure clicks register
          }}
          onFocus={() => {
            startSearching();
            if (searchQuery.trim()) setIsSearching(true);
          }}
        >
          <input
            type='text'
            value={searchQuery}
            onChange={handleSearchInput}
            className='w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:border-gray-400 transition-colors'
            placeholder='Search for songs here'
          />
          <div className='absolute right-3 top-1/2 -translate-y-1/2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-400'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='11' cy='11' r='8'></circle>
              <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
            </svg>
          </div>

          {/* Search Results Dropdown */}
          {isSearching && searchResults.length > 0 && (
            <div className='absolute top-full left-0 w-full bg-gray-800 border border-gray-600 rounded-md max-h-40 overflow-y-auto mt-2 z-50'>
              {searchResults.map((song) => (
                <div
                  key={song._id}
                  onMouseDown={() => handleSelectSong(song)} // Use onMouseDown to trigger before onBlur
                  className='p-2 text-white hover:bg-gray-700 cursor-pointer'
                >
                  {song.songName}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={openPopup}
          className='px-4 py-2 text-sm text-white hover:text-yellow-200 transition-colors'
        >
          Add song
        </button>
      </div>

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
