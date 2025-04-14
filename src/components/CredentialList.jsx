import { useState } from 'react'

function CredentialList({ credentials, setCredentials }) {
  const [search, setSearch] = useState('')
  const [editIndex, setEditIndex] = useState(null)

  const filtered = credentials.filter(c =>
    c.website.toLowerCase().includes(search.toLowerCase())
  )

  const updateCred = (index, field, value) => {
    const updated = [...credentials]
    updated[index][field] = value
    setCredentials(updated)
  }

  const deleteCred = index => {
    const updated = credentials.filter((_, i) => i !== index)
    setCredentials(updated)
  }

  const copyPassword = pass => {
    navigator.clipboard.writeText(pass)
    alert('Password copied to clipboard!')
  }

  const toggleVisibility = id => {
    const el = document.getElementById(`password-${id}`)
    el.textContent = el.textContent === '********' ? el.dataset.real : '********'
  }

  return (
    <div>
      <input
        placeholder="Search by website..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
        style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filtered.map((cred, index) => (
          <div className="card" key={index} style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
            {editIndex === index ? (
              <>
                <input
                  value={cred.website}
                  onChange={e => updateCred(index, 'website', e.target.value)}
                  style={{ marginBottom: '8px', width: '100%', padding: '6px' }}
                />
                <input
                  value={cred.username}
                  onChange={e => updateCred(index, 'username', e.target.value)}
                  style={{ marginBottom: '8px', width: '100%', padding: '6px' }}
                />
                <input
                  value={cred.password}
                  onChange={e => updateCred(index, 'password', e.target.value)}
                  style={{ marginBottom: '8px', width: '100%', padding: '6px' }}
                />
                <button onClick={() => setEditIndex(null)}>✅ Done</button>
              </>
            ) : (
              <>
                <h3>{cred.website}</h3>
                <p>{cred.username}</p>
                <p>
                  <span id={`password-${index}`} data-real={cred.password}>********</span>
                </p>
                <div className="actions" style={{ marginTop: '10px' }}>
                  <button onClick={() => toggleVisibility(index)}>Show/Hide</button>
                  <button onClick={() => copyPassword(cred.password)}>Copy</button>
                  <button onClick={() => setEditIndex(index)}>Edit</button>
                  <button onClick={() => deleteCred(index)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CredentialList
