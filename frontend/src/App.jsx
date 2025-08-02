import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [repoUrl, setRepoUrl] = useState('')
  const [tree, setTree] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [showCopyNotification, setShowCopyNotification] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTree('')

    try {
      const response = await axios.post('/api/tree', { repoUrl })
      setTree(response.data.tree)
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tree)
      .then(() => {
        setShowCopyNotification(true)
        setTimeout(() => setShowCopyNotification(false), 2000)
      })
      .catch(err => {
        console.error('Failed to copy:', err)
      })
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark-mode')
  }

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <h1>GitHub Repo Tree Visualizer</h1>
        <button 
          className="theme-toggle"
          onClick={toggleDarkMode}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Enter GitHub repo URL (e.g., https://github.com/username/repo)"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Generate Tree'}
        </button>
      </form>
      
      {error && <div className="error">{error}</div>}
      
      {tree && (
        <div className="tree-container">
          <div className="tree-header">
            <h2>Repository Structure:</h2>
            <button 
              className="copy-button"
              onClick={copyToClipboard}
            >
              📋 Copy
            </button>
          </div>
          <pre>{tree}</pre>
        </div>
      )}

      {showCopyNotification && (
        <div className="copy-notification">
          Copied to clipboard!
        </div>
      )}
    </div>
  )
}

export default App
