import { useState } from 'react'
import RandomCat from './pages/RandomCat'
import TagSearch from './pages/TagSearch'
import './App.css'

function App() {
  const [tab, setTab] = useState<'random' | 'search'>('random')

  return (
    <div>
      <nav style={{ padding: 10, borderBottom: '1px solid #ccc' }}>
        <button onClick={() => setTab('random')}>Random Cat</button>
        <button onClick={() => setTab('search')}>Search by Tag</button>
      </nav>
      {tab === 'random' ? <RandomCat /> : <TagSearch />}
    </div>
  )
}

export default App
