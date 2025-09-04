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
  const [excludeGitFiles, setExcludeGitFiles] = useState(true)
  const [excludeAssetsContents, setExcludeAssetsContents] = useState(true)
  const [excludeImagesContents, setExcludeImagesContents] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTree('')

    try {
      const response = await axios.post('/api/tree', { 
        repoUrl, 
        excludeGitFiles,
        excludeAssetsContents,
        excludeImagesContents
      })
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
    document.body.classList.toggle('dark-mode')
  }

  return (
    <>
      <div className="container">
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
            <small style={{ color: '#666', fontSize: '0.8rem', textAlign: 'center' }}>
              Use link format 'github.com/name/repo'
            </small>
          </div>
          
          <div className="options-group">
            <div className="checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={excludeGitFiles}
                  onChange={(e) => setExcludeGitFiles(e.target.checked)}
                />
                <span>Exclude .git files and folders</span>
              </label>
            </div>
            <div className="checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={excludeAssetsContents}
                  onChange={(e) => setExcludeAssetsContents(e.target.checked)}
                />
                <span>Hide assets folder contents</span>
              </label>
            </div>
            <div className="checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={excludeImagesContents}
                  onChange={(e) => setExcludeImagesContents(e.target.checked)}
                />
                <span>Hide images folder contents</span>
              </label>
            </div>
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
      </div>
      
      <footer className="footer">
        <p>
          <a href="https://github.com/Griffinxaxa/file-structure-visualization/tree/main" target="_blank" rel="noopener noreferrer">
            GitHub Repository
          </a>
        </p>
      </footer>
    </>
  )
}

export default App
