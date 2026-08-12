import { useEffect, useState } from 'react'

// NOTE: intentionally written as a quick one-off — nothing shared here.
export default function RandomCat() {
  const [loading, setLoading] = useState(true)
  const [imgUrl, setImgUrl] = useState('')
  const [caption, setCaption] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch('https://cataas.com/cat?json=true')
      .then((res) => res.json())
      .then((data) => {
        setImgUrl('https://cataas.com/cat/' + data.id)
        setCaption(data.tags ? data.tags.join(', ') : 'no tags')
        setLoading(false)
      })
  }, [])

  function getAnother() {
    setLoading(true)
    fetch('https://cataas.com/cat?json=true')
      .then((res) => res.json())
      .then((data) => {
        setImgUrl('https://cataas.com/cat/' + data.id)
        setCaption(data.tags ? data.tags.join(', ') : 'no tags')
        setLoading(false)
      })
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Random Cat</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <img src={imgUrl} width={300} />
          <p>Tags: {caption}</p>
        </div>
      )}
      <button onClick={getAnother}>Another cat</button>
    </div>
  )
}
