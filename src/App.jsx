import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import CredentialForm from './components/CredentialForm'
import CredentialList from './components/CredentialList'

function App() {
  const [credentials, setCredentials] = useState(() => {
    return JSON.parse(localStorage.getItem('credentials')) || []
  })

  useEffect(() => {
    localStorage.setItem('credentials', JSON.stringify(credentials))
  }, [credentials])

  const addCredential = (cred) => {
    setCredentials(prev => [...prev, cred])
  }

  return (
    <div className="app">
      <Navbar />
      <div style={{ display: 'flex', padding: '20px', gap:'20px' }}>
        <div style={{ flex: 1 }}>
          <CredentialForm addCredential={addCredential} />
        </div>
        <div style={{ flex: 1 }}>
          <CredentialList credentials={credentials} setCredentials={setCredentials} />
        </div>
      </div>
    </div>
  )
}

export default App
