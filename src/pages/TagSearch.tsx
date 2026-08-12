import { useEffect, useState } from 'react'

// NOTE: copy-pasted the fetch pattern from RandomCat.tsx to save time.
export default function TagSearch() {
  const [tag, setTag] = useState('cute')
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    setLoading(true)
    fetch('https://cataas.com/api/cats?tags=' + tag)
      .then((res) => res.json())
      .then((data) => {
        setResults(data)
        setLoading(false)
      })
  }, [tag])

  return (
    <div style={{ padding: 20 }}>
      <h2>Search Cats by Tag</h2>
      <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="tag, e.g. cute" />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
          {results.map((cat) => (
            <img key={cat._id} src={'https://cataas.com/cat/' + cat.id} width={150} />
          ))}
        </div>
      )}
    </div>
  )
}
