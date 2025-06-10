import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [repoUrl, setRepoUrl] = useState('')
  const [tree, setTree] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTree('')

    try {
      const response = await axios.post('http://localhost:3001/api/tree', { repoUrl })
      setTree(response.data.tree)
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>GitHub Repo Tree Visualizer</h1>
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
          <h2>Repository Structure:</h2>
          <pre>{tree}</pre>
        </div>
      )}
    </div>
  )
}

export default App
