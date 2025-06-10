const express = require('express');
const simpleGit = require('simple-git');
const treeify = require('treeify');
const rimraf = require('rimraf');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Helper: Recursively build a tree object from a directory
function buildTree(dirPath) {
  const stats = fs.statSync(dirPath);
  if (!stats.isDirectory()) return path.basename(dirPath);
  const tree = {};
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const fileStats = fs.statSync(fullPath);
    if (fileStats.isDirectory()) {
      tree[file] = buildTree(fullPath);
    } else {
      tree[file] = null;
    }
  });
  return tree;
}

app.post('/api/tree', async (req, res) => {
  const { repoUrl } = req.body;
  if (!repoUrl) return res.status(400).json({ error: 'Missing repoUrl' });

  // Create a temp dir
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'repo-'));
  const repoName = 'repo';
  const repoPath = path.join(tempDir, repoName);

  try {
    // Shallow clone
    await simpleGit().clone(repoUrl, repoPath, ['--depth', '1']);
    // Build tree
    const treeObj = buildTree(repoPath);
    const asciiTree = treeify.asTree(treeObj, true);
    // Cleanup
    rimraf.sync(tempDir);
    res.json({ tree: asciiTree });
  } catch (err) {
    rimraf.sync(tempDir);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
}); 