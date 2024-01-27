import React, {useState, useEffect} from 'react'

const PopularMovies = () => {
  const [movieData, setMovieData] = useState([])
  const [searchInput, setSearchInput] = useState([])
  const [activePage, setActivePage] = useState('Popular')

  useEffect(() => {
    const getPopularMoviesURL =
      'https://api.themoviedb.org/3/movie/popular?api_key=b0c5333050f9fa66124a9eeef3d0b547&language=en-US&page=1'

    fetch(getPopularMoviesURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setMovieData(data.results)
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <div>
      <h2>movieDB</h2>
      <h2>Popular</h2>
      <h2>Top Rated</h2>
      <h2>Upcoming</h2>
      <nav>
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </nav>
      <section>
        {movieData.map(movie => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{`Rating: ${movie.vote_average}`}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            {/* Conditional rendering of "View Details" button based on active page */}
            {activePage === 'Popular' ||
            activePage === 'Top Rated' ||
            activePage === 'Upcoming' ? (
              <button
                onClick={() => console.log(`View details for ${movie.title}`)}
              >
                View Details
              </button>
            ) : null}
          </div>
        ))}
      </section>
    </div>
  )
}

export default PopularMovies
