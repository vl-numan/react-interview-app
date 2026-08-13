import { useState } from 'react'
import RandomMovie from './pages/RandomMovie'
import MovieSearch from './pages/MovieSearch'
import './App.css'

function App() {
  const [tab, setTab] = useState<'random' | 'search'>('random')

  return (
    <div>
      <nav style={{ padding: 10, borderBottom: '1px solid #ccc' }}>
        <button onClick={() => setTab('random')}>Random Movie</button>
        <button onClick={() => setTab('search')}>Search Movies</button>
      </nav>
      {tab === 'random' ? <RandomMovie /> : <MovieSearch />}
    </div>
  )
}

export default App
