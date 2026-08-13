import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'

export default function RandomMovie() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [movie, setMovie] = useState<any>(null)

  useEffect(() => {
    getAnother()
  }, [])

  function getAnother() {
    setLoading(true)
    setError('')
    fetch('http://localhost:3001/api/movies/random')
      .then((res) => {
        if (!res.ok) throw new Error('Request failed with status ' + res.status)
        return res.json()
      })
      .then((data) => {
        setMovie({ ...data, posterUrl: 'http://localhost:3001' + data.posterUrl })
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Random Movie</h2>
      {loading && <p>Loading...</p>}
      {!loading && error && <p role="alert">Failed to load: {error}</p>}
      {!loading && !error && movie && (
        <div>
          <MovieCard movie={movie} />
          <p>{movie.plot}</p>
        </div>
      )}
      <button onClick={getAnother}>Another movie</button>
    </div>
  )
}
