import React, { useState } from 'react';

interface Gig {
  id: number;
  artist: string;
  date: string;
  location: string;
  description: string;
}

interface Artist {
  id: number;
  name: string;
}

const App = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [newGig, setNewGig] = useState<Gig>({
    id: 0,
    artist: '',
    date: '',
    location: '',
    description: '',
  });

  const handleSearch = () => {
    const filteredGigs = gigs.filter((gig) =>
      gig.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setGigs(filteredGigs);
  };

  const handlePostGig = () => {
    setGigs([...gigs, newGig]);
    setNewGig({
      id: 0,
      artist: '',
      date: '',
      location: '',
      description: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gig Finder</h1>
      <div className="flex flex-wrap justify-between mb-4">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for an artist"
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-sm text-gray-700"
        />
        <button
          onClick={handleSearch}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap justify-between mb-4">
        <select
          value={selectedArtist?.name}
          onChange={(e) =>
            setSelectedArtist(
              artists.find((artist) => artist.name === e.target.value)
            )
          }
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pl-10 text-sm text-gray-700"
        >
          <option value="">Select an artist</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.name}>
              {artist.name}
            </option>
          ))}
        </select>
        {selectedArtist && (
          <button
            onClick={() =>
              setNewGig({ ...newGig, artist: selectedArtist.name })
            }
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Post a gig
          </button>
        )}
      </div>
      {selectedArtist && (
        <form className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={newGig.date}
            onChange={(e) => setNewGig({ ...newGig, date: e.target.value })}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            value={newGig.location}
            onChange={(e) => setNewGig({ ...newGig, location: e.target.value })}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={newGig.description}
            onChange={(e) => setNewGig({ ...newGig, description: e.target.value })}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
          <button
            onClick={handlePostGig}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Post gig
          </button>
        </form>
      )}
      <ul>
        {gigs.map((gig) => (
          <li key={gig.id} className="mb-4">
            <h2 className="text-xl font-bold">{gig.artist}</h2>
            <p className="text-sm text-gray-700">
              {gig.date} - {gig.location}
            </p>
            <p className="text-sm text-gray-700">{gig.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;