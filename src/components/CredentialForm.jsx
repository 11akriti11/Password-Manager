import { useState } from 'react'

function CredentialForm({ addCredential }) {
  const [website, setWebsite] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)

  const generatePassword = () => {
    let charset = ''
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeNumbers) charset += '0123456789'
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}'

    let genPass = ''
    for (let i = 0; i < length; i++) {
      genPass += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(genPass)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!website || !username || !password) return
    addCredential({ website, username, password })
    setWebsite('')
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add New Credential</h2>
      <input placeholder="Website" value={website} onChange={e => setWebsite(e.target.value)} />
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

      <div className="generator-settings">
        <label>
          Length: <input type="number" min="8" value={length} onChange={e => setLength(e.target.value)} />
        </label>
        <label><input type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} /> a-z</label>
        <label><input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} /> A-Z</label>
        <label><input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} /> 0-9</label>
        <label><input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} /> Symbols</label>
      </div>

      <div className="form-buttons">
        <button type="button" onClick={generatePassword}>Generate</button>
        <button type="submit">Save</button>
      </div>
    </form>
  )
}

export default CredentialForm
