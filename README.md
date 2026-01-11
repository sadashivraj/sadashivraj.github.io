# Personal Portfolio - GitHub Pages

A sleek, modern portfolio website designed for AI & Data Engineering professionals.

## Features

- 🌐 **Neural Network Background** - Interactive canvas animation that responds to mouse movement
- 🎨 **Dark Theme** - Sophisticated dark design with amber and teal accents
- ✨ **Smooth Animations** - Scroll-triggered animations and parallax effects
- 📱 **Fully Responsive** - Looks great on all devices
- 🎮 **Easter Egg** - Try the Konami code for a surprise!

## Deploying to GitHub Pages

### Option 1: Using GitHub UI

1. Create a new repository on GitHub named `<your-username>.github.io`
2. Upload all files from this folder (`index.html`, `styles.css`, `script.js`)
3. Your site will be live at `https://<your-username>.github.io`

### Option 2: Using Git Command Line

```bash
# Navigate to this folder
cd /Users/sadabhar/personal/profile

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio site"

# Add your GitHub repository as remote
git remote add origin https://github.com/sadashivraj/sadashivraj.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option 3: Project Site (Non-username repository)

1. Create any repository on GitHub
2. Push these files to the repository
3. Go to **Settings** → **Pages**
4. Under "Source", select "Deploy from a branch"
5. Select the `main` branch and `/ (root)` folder
6. Click Save
7. Your site will be at `https://<username>.github.io/<repository-name>/`

## Customization

### Update Personal Info
Edit `index.html` to update:
- Your name and title
- About section content
- Project descriptions
- Social media links
- Contact email

### Change Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --accent-primary: #f59e0b;    /* Main accent (amber) */
    --accent-secondary: #14b8a6;  /* Secondary accent (teal) */
    --bg-deep: #0a0b0f;           /* Background color */
}
```

### Add/Remove Sections
The HTML structure is modular - simply add or remove `<section>` blocks as needed.

## Tech Stack

- Pure HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Google Fonts (JetBrains Mono, Outfit)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

---

Built with ❤️ for builders and innovators.

