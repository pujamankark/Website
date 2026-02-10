# 3D Molecule Portfolio - Quick Start Guide

## Testing Locally

Due to browser security restrictions (CORS policy), the 3D portfolio cannot be opened directly by double-clicking `index-3d.html`. You need to run a local web server.

### Option 1: Using the Batch Script (Easiest)
1. Double-click `start-server.bat`
2. Your browser will open automatically to `http://localhost:8000/index-3d.html`
3. Press `Ctrl+C` in the command window to stop the server

### Option 2: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index-3d.html`
3. Select "Open with Live Server"

### Option 3: Using Node.js
```bash
npx http-server -p 8000 -o index-3d.html
```

### Option 4: Using Python (if installed)
```bash
python -m http.server 8000
# Then open http://localhost:8000/index-3d.html
```

## Deploying to GitHub Pages

To make the 3D portfolio live on your website:

1. **Rename the files:**
   - Backup current `index.html` as `index-2d-backup.html`
   - Rename `index-3d.html` to `index.html`

2. **Upload to GitHub:**
   ```bash
   git add .
   git commit -m "Add 3D interactive molecule portfolio"
   git push origin main
   ```

3. **Wait 1-2 minutes** for GitHub Pages to rebuild

4. **Visit:** `https://pujamankark.github.io/Website/`

## File Structure

```
Website/
├── index-3d.html          # 3D portfolio (rename to index.html for deployment)
├── style.css              # Original styles
├── css/
│   ├── overlay-panels.css # Glassmorphism overlay styles
│   └── molecule-3d.css    # 3D canvas styles
├── js/
│   ├── main.js           # Main application
│   ├── molecule-data.js  # Quinine molecule structure
│   ├── three-scene.js    # Three.js scene setup
│   ├── materials.js      # Glassmorphism materials
│   └── overlay-system.js # Content overlays
└── start-server.bat      # Quick start script
```

## Interactive Features

- **7 Interactive Atoms** mapped to portfolio sections:
  - Central nitrogen → About
  - Quinoline carbon → Work Experience
  - Quinuclidine nitrogen → Skills
  - Methoxy oxygen → Projects
  - Vinyl carbon → Curiosity
  - Hydroxyl oxygen → Blogs
  - Terminal carbon → Contact

- **Mouse Controls:**
  - Drag to rotate molecule
  - Scroll to zoom
  - Hover over atoms for labels
  - Click atoms to view content

- **Keyboard:**
  - `Escape` to close overlays
  - Auto-rotation when idle

## Mobile Fallback

The 3D experience automatically switches to a 2D fallback on:
- Mobile devices (< 768px width)
- Tablets
- Devices without WebGL support

## Troubleshooting

**Problem:** Loading screen never disappears
- **Solution:** Make sure you're using a local server (see above), not opening the file directly

**Problem:** Molecule doesn't appear
- **Check:** Browser console for errors (F12)
- **Verify:** WebGL is supported (visit https://get.webgl.org/)

**Problem:** Performance is slow
- **Solution:** The app automatically reduces quality on slower devices
- **Try:** Closing other browser tabs

**Problem:** Can't click atoms
- **Check:** Make sure you're hovering over the larger, colored atoms (not small white hydrogens)

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ⚠️ Mobile browsers (fallback to 2D)

## Need Help?

If you encounter issues, check the browser console (F12) for error messages.
