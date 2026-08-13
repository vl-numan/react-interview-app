export default function MovieCard({ movie }: { movie: any }) {
  return (
    <div className="movie-card">
      <img src={movie.posterUrl} alt={movie.title} width={150} height={225} loading="lazy" />
      <h3>{movie.title}</h3>
      <p>
        {movie.year} · {movie.genre} · ⭐ {movie.rating.toFixed(1)} · {movie.runtimeMinutes} min
      </p>
    </div>
  )
}
