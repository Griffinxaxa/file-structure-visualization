# Railway Deployment Guide

Since Vercel is requiring authentication, here's how to deploy to Railway instead:

## Step 1: Deploy to Railway

1. **Go to [railway.app](https://railway.app)**
2. **Sign up/Login with GitHub**
3. **Click "New Project"**
4. **Choose "Deploy from GitHub repo"**
5. **Select your repository**
6. **Railway will automatically detect it's a Node.js app**

## Step 2: Configure Environment Variables (if needed)

Railway will automatically install dependencies and start your app. The `package.json` I created will handle everything.

## Step 3: Get Your URL

Railway will give you a URL like: `https://your-app-name.railway.app`

## Step 4: Test Your App

Your app will be live and accessible without any authentication issues!

---

## Alternative: Render.com

If Railway doesn't work, try [render.com](https://render.com):

1. **Go to render.com**
2. **Sign up with GitHub**
3. **Create new Web Service**
4. **Connect your repository**
5. **Set build command:** `npm install && npm run build`
6. **Set start command:** `npm start`
7. **Deploy!**

---

## Alternative: Heroku

1. **Install Heroku CLI:**
   ```bash
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

---

## Your App is Ready!

Once deployed, you'll have a live URL that you can share with people who are interested in your GitHub Repo Tree Visualizer!

The app will work exactly the same as locally - just enter any GitHub repository URL and it will generate the file structure tree. 