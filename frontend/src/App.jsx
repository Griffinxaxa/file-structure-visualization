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
        <div className="input-group">
          <label className="input-label">
            Enter a GitHub repository URL to visualize its file structure
          </label>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="e.g., https://github.com/username/repository"
            required
          />
          <small style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', textAlign: 'center' }}>
            Format: github.com/username/repo or https://github.com/username/repo
          </small>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Generating Tree...' : 'Generate Tree'}
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
              📋 Copy Tree
            </button>
          </div>
          <pre>{tree}</pre>
        </div>
      )}

      {showCopyNotification && (
        <div className="copy-notification">
          Copied to clipboard! 📋
        </div>
      )}

      <div className="info-section">
        <h3>About This Tool</h3>
        <p>
          The GitHub Repo Tree Visualizer helps you explore and understand the file structure of any public GitHub repository. 
          Simply enter a repository URL and get an instant visual representation of its directory structure.
        </p>
        
        <h3>How to Use</h3>
        <ul>
          <li><strong>Enter Repository URL:</strong> Use the format <code>github.com/username/repo</code> or the full HTTPS URL</li>
          <li><strong>Generate Tree:</strong> Click the button to create a visual representation of the repository structure</li>
          <li><strong>Copy & Share:</strong> Use the copy button to save the tree structure to your clipboard</li>
          <li><strong>Toggle Theme:</strong> Switch between light and dark modes using the theme button</li>
        </ul>
        
        <h3>Features</h3>
        <ul>
          <li><strong>🌳 Visual Tree Structure:</strong> See the complete file hierarchy at a glance</li>
          <li><strong>📋 Easy Copy:</strong> Copy the entire tree structure with one click</li>
          <li><strong>🌙 Dark Mode:</strong> Comfortable viewing in any lighting condition</li>
          <li><strong>📱 Responsive Design:</strong> Works perfectly on desktop, tablet, and mobile</li>
          <li><strong>⚡ Fast & Reliable:</strong> Quick generation using shallow Git cloning</li>
        </ul>
        
        <p style={{ marginTop: '20px', fontSize: '0.9rem', opacity: 0.8 }}>
          Perfect for documentation, code reviews, project exploration, and understanding repository organization.
        </p>
      </div>
    </div>
  )
}

export default App
