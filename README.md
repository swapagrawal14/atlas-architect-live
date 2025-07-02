# Atlas Architect – Professional World-Building Toolkit

Atlas Architect is a professional and powerful world-building toolkit that empowers creative individuals—like storytellers, game masters, and fantasy authors—to bring their imaginary worlds to life.  
Design, visualize, and interact with unique worlds using modern web technologies.

---

## 🚀 Features

- **Interactive World Generation:** Generate unique, realistic terrains with adjustable parameters.
- **Intuitive Controls:** Easily tweak scale, seed, and octaves for endless variations.
- **Modern UI:** Clean, responsive design for desktop and mobile.
- **Ready for Expansion:** Easily add pins, biomes, and more story elements.

---

## 🛠️ Getting Started (Local Development)

1. **Clone the repository:**
git clone https://github.com/swapagrawal14/atlas-architect-live.git
cd atlas-architect-live


2. **Install dependencies:**
npm install


3. **Start the development server:**
npm run dev

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

---

## 🌐 Deployment to GitHub Pages

> **GitHub Pages only serves static files.  
> You must build your app and deploy the build output to the `/docs` folder.**

### **Deployment Steps**

1. **Build your app:**
npm run build

2. **Copy the build output to `/docs`:**
rm -rf docs
cp -r dist docs


3. **Commit and push:**
git add docs
git commit -m "Deploy build to docs for GitHub Pages"
git push


4. **Set GitHub Pages source:**
- Go to your repo on GitHub.
- Click **Settings** → **Pages**.
- Under **Source**, select `main` branch and `/docs` folder.
- Save.

5. **Visit your site:**  
[https://swapagrawal14.github.io/atlas-architect-live/](https://swapagrawal14.github.io/atlas-architect-live/)

---

## 📝 Project Structure

atlas-architect-live/
├── docs/ # Build output for GitHub Pages (do NOT edit by hand)
├── public/ # Static assets (favicon, etc.)
├── src/ # React source code
│ ├── components/
│ ├── App.jsx
│ └── main.jsx
├── package.json
├── vite.config.js
└── README.md


---

## ⚡ Vite Configuration

Your `vite.config.js` should have:

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
plugins: [react()],
base: '/atlas-architect-live/', // REQUIRED for GitHub Pages
});


---

## ❓ FAQ

**Q: Can I deploy my `src/` and `public/` folders directly?**  
A: No. GitHub Pages cannot build or run your React source code. You must deploy the static build output.

**Q: How do I keep my source code and have a working site?**  
A: Use the `/docs` folder for your build output and set GitHub Pages to serve from `/docs` on the `main` branch.

---

## 📄 License

[MIT](./LICENSE)

---

## 🙏 Credits

- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Inspired by worldbuilders everywhere!

---

**Happy world-building!** 🌍✨

> _If you have issues or suggestions, feel free to open an [issue](https://github.com/swapagrawal14/atlas-architect-live/issues) or submit a pull request!_
