import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'

export default function MovieSearch() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    setPage(1)
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(
      'http://localhost:3001/api/movies/search?q=' +
        encodeURIComponent(query) +
        '&page=' +
        page +
        '&pageSize=12',
    )
      .then((res) => {
        if (!res.ok) throw new Error('Request failed with status ' + res.status)
        return res.json()
      })
      .then((json) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [query, page])

  return (
    <div style={{ padding: 20 }}>
      <h2>Search Movies</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="title or genre, e.g. shadow"
      />

      {loading && <p>Loading...</p>}
      {!loading && error && <p role="alert">Failed to load: {error}</p>}
      {!loading && !error && data && (
        <>
          {data.items.length === 0 ? (
            <p>No movies found.</p>
          ) : (
            <div className="movie-grid">
              {data.items.map((movie: any) => (
                <MovieCard
                  key={movie.id}
                  movie={{ ...movie, posterUrl: 'http://localhost:3001' + movie.posterUrl }}
                />
              ))}
            </div>
          )}
          <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
