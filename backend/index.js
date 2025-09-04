const express = require('express');
const simpleGit = require('simple-git');
const treeify = require('treeify');
const rimraf = require('rimraf');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the root directory (for deployed frontend)
app.use(express.static(path.join(__dirname, '..')));

// Helper: Recursively build a tree object from a directory
function buildTree(dirPath, excludeGitFiles = true) {
  const stats = fs.statSync(dirPath);
  if (!stats.isDirectory()) return path.basename(dirPath);
  const tree = {};
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    // Skip .git files and folders if excludeGitFiles is true
    if (excludeGitFiles && file === '.git') {
      return;
    }
    
    const fullPath = path.join(dirPath, file);
    const fileStats = fs.statSync(fullPath);
    if (fileStats.isDirectory()) {
      tree[file] = buildTree(fullPath, excludeGitFiles);
    } else {
      tree[file] = null;
    }
  });
  return tree;
}

app.post('/api/tree', async (req, res) => {
  const { repoUrl, excludeGitFiles = true } = req.body;
  if (!repoUrl) return res.status(400).json({ error: 'Missing repoUrl' });

  // Create a temp dir
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-'));
  const repoName = 'repo';
  const repoPath = path.join(tempDir, repoName);

  try {
    // Shallow clone
    await simpleGit().clone(repoUrl, repoPath, ['--depth', '1']);
    // Build tree
    const treeObj = buildTree(repoPath, excludeGitFiles);
    const asciiTree = treeify.asTree(treeObj, true);
    // Cleanup
    rimraf.sync(tempDir);
    res.json({ tree: asciiTree });
  } catch (err) {
    rimraf.sync(tempDir);
    res.status(500).json({ error: err.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Always start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app; 