# Deployment Guide for GitHub Repo Tree Visualizer

## Option 1: Vercel (Recommended - Easiest)

### Prerequisites
- Install Vercel CLI: `npm i -g vercel`
- GitHub account

### Steps:
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose to link to existing project or create new
   - Your app will be deployed to `https://your-project.vercel.app`

3. **For production:**
   ```bash
   vercel --prod
   ```

### Benefits:
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Serverless functions for backend
- ✅ Global CDN
- ✅ Easy custom domains

---

## Option 2: Railway

### Steps:
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add environment variables if needed
4. Deploy automatically

### Benefits:
- ✅ Free tier available
- ✅ Easy GitHub integration
- ✅ Automatic deployments

---

## Option 3: Render

### Steps:
1. Go to [render.com](https://render.com)
2. Connect your GitHub repository
3. Choose "Web Service" for backend
4. Choose "Static Site" for frontend
5. Configure build commands

### Benefits:
- ✅ Free tier available
- ✅ Easy setup
- ✅ Automatic deployments

---

## Option 4: Heroku

### Prerequisites:
- Install Heroku CLI
- Create Heroku account

### Steps:
1. **Install Heroku CLI:**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   ```

2. **Login:**
   ```bash
   heroku login
   ```

3. **Create app:**
   ```bash
   heroku create your-app-name
   ```

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Benefits:
- ✅ Free tier available
- ✅ Easy scaling
- ✅ Good documentation

---

## Option 5: DigitalOcean App Platform

### Steps:
1. Go to [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)
2. Connect your GitHub repository
3. Configure build settings
4. Deploy

### Benefits:
- ✅ Good performance
- ✅ Easy scaling
- ✅ Global CDN

---

## Environment Variables (if needed)

If you need to add environment variables for any platform:

```bash
# For Vercel
vercel env add NODE_ENV production

# For Railway/Render/Heroku
# Add through their web interfaces
```

---

## Custom Domain Setup

### Vercel:
1. Go to your project dashboard
2. Settings → Domains
3. Add your domain
4. Update DNS records

### Other platforms:
- Follow platform-specific instructions
- Usually in Settings → Domains section

---

## Post-Deployment Checklist

- [ ] Test the deployed application
- [ ] Verify API endpoints work
- [ ] Check if GitHub repo cloning works
- [ ] Test with different repository URLs
- [ ] Set up custom domain (optional)
- [ ] Configure environment variables if needed
- [ ] Set up monitoring/analytics (optional)

---

## Troubleshooting

### Common Issues:

1. **CORS errors:**
   - Backend CORS is already configured
   - Check if API URL is correct

2. **Git clone fails:**
   - Some platforms have limitations on file system operations
   - Consider using GitHub API instead of git clone

3. **Build fails:**
   - Check if all dependencies are in package.json
   - Verify Node.js version compatibility

4. **API not found:**
   - Ensure routes are configured correctly
   - Check if backend is deployed properly

---

## Recommended: Vercel Deployment

For the easiest deployment experience, I recommend Vercel:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Your app will be live at:** `https://your-project.vercel.app`

The configuration files I've created will handle the routing between your React frontend and Express backend automatically. 