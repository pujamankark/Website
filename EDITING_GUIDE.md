# How to Edit Your Portfolio Website

**Welcome!** This guide shows you how to update your personality-driven portfolio website.

---

## 🎯 Quick Start: What Can You Edit?

Look for these markers in `index.html`:

```
═══════════════════════════════════════════════════════════
✏️ EDITABLE: [SECTION NAME]
═══════════════════════════════════════════════════════════
```

These tell you **exactly** what you can safely change.

---

## ✏️ Basic Editing Rules

### Rule 1: Only Edit Text Between Tags
✅ **DO:** Change text between `>` and `<`  
❌ **DON'T:** Touch anything with `<` or `>` symbols

**Example:**
```html
<h2 class="hero-tagline">Microbiologist. Builder. Perpetual learner.</h2>
```

**Change to:**
```html
<h2 class="hero-tagline">Scientist. Strategist. Learner.</h2>
```

### Rule 2: Keep the Comment Markers
The `<!-- ✏️ EDITABLE -->` comments are your friends. Don't delete them!

### Rule 3: Save Often
After each change, save the file and refresh your browser to see the result.

---

## 📝 Common Editing Tasks

### 1. Changing Your Intro Tagline

**Find this section:**
```html
<!-- ✏️ EDITABLE: INTRO TAGLINE -->
<h2 class="hero-tagline">Microbiologist. Builder. Perpetual learner.</h2>
```

**Examples you could use:**
- "Scientist. Builder. Learner."
- "Microbiologist with range."
- "Science + Industry + Curiosity"
- "Perpetual student of systems."

---

### 2. Updating Your About Section

**Find this section:**
```html
<!-- ✏️ EDITABLE: ABOUT CONTENT -->
```

**Tips:**
- Write in first person ("I've done..." not "She has done...")
- Be honest about your range
- Don't sound defensive
- Show comfort with being a beginner

---

### 3. Adding a New Job

**Step 1:** Find the Work Experience section

**Step 2:** Copy this entire block:
```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <div class="timeline-header">
            <h3 class="job-title">Your Job Title</h3>
            <span class="job-date">Month Year – Month Year</span>
        </div>
        <p class="job-company">Company Name</p>
        <ul class="job-details">
            <li>What you did...</li>
            <li>Another accomplishment...</li>
            <li>Key responsibility...</li>
        </ul>
    </div>
</div>
```

**Step 3:** Paste it at the top of the timeline (most recent job first)

**Step 4:** Edit the text to match your new job

---

### 4. Updating Skills

**Find the Skills section:**
```html
<!-- ✏️ EDITABLE: TECHNICAL SKILLS -->
```

**To add a skill:**
```html
<li>Your new skill here</li>
```

**To remove a skill:**
Delete the entire `<li>...</li>` line

---

### 5. Adding Your Images (IMPORTANT!)

#### Where to Put Images

Put your images in: `C:\Users\pujam\Desktop\Website\images\hobbies\`

**Recommended names:**
- `reading.jpg` - Photo related to reading/ideas
- `drawing.jpg` - One of your drawings
- `learning.jpg` - Photo showing learning/exploration
- `patterns.jpg` - Photo representing pattern recognition

#### How to Add Images

**Step 1:** Save your image in `images/hobbies/` folder

**Step 2:** Find this in `index.html`:
```html
<!-- ✏️ REPLACE IMAGE: Add your photo here -->
<div class="curiosity-image-container">
    <img src="images/placeholder.jpg" alt="Reading and ideas" class="curiosity-image">
</div>
```

**Step 3:** Change the `src` path:
```html
<img src="images/hobbies/reading.jpg" alt="Reading and ideas" class="curiosity-image">
```

**That's it!** The image will appear when you refresh the page.

#### Image Tips
- Use JPG or PNG format
- Keep file size under 1MB (compress if needed)
- Recommended size: 800x600 pixels
- Use descriptive filenames (no spaces)

---

### 6. Editing Hobbies/Curiosities

**Find the "What I'm Curious About" section**

**To add a new curiosity item:**

Copy this block:
```html
<div class="curiosity-item">
    <div class="curiosity-image-container">
        <img src="images/hobbies/your-image.jpg" alt="Description" class="curiosity-image">
    </div>
    <h3 class="curiosity-title">🎯 Your Interest Title</h3>
    <p class="curiosity-description">
        Describe what you're curious about...
    </p>
</div>
```

Paste it in the `curiosity-grid` section and edit the text.

---

### 7. Updating Honest Preferences

**Find this section:**
```html
<!-- ✏️ EDITABLE: HONEST PREFERENCES -->
```

**To add a preference:**
```html
<li>Your preference here</li>
```

**Examples:**
- ✓ What I Value: "Direct communication", "Asking why", "Efficiency"
- ✗ What I Don't: "Buzzwords", "Meetings that could be emails"

**Keep it:**
- Honest
- Professional (no offensive content)
- Specific (not vague)

---

### 8. Adjusting Tone for Different Audiences

#### For Academia/Research Roles:
- Emphasize: Research projects, analytical skills, publications
- Tone: More formal, focus on methodology

#### For Industry/Startup Roles:
- Emphasize: Scale-up experience, commercialization, adaptability
- Tone: Action-oriented, results-focused

#### For Entrepreneurial/Builder Roles:
- Emphasize: "Built this myself", learning ability, range
- Tone: Confident, independent, execution-focused

**Where to adjust:**
- Hero tagline
- About section
- Preferences section

---

## 🖼️ Image Management

### Current Image Structure
```
Website/
├── images/
│   ├── hobbies/
│   │   ├── reading.jpg      ← Add your images here
│   │   ├── drawing.jpg
│   │   ├── learning.jpg
│   │   └── patterns.jpg
│   └── placeholder.jpg       ← Default placeholder
```

### Replacing Placeholder Images

1. **Save your image** in `images/hobbies/` folder
2. **Open `index.html`** in Notepad
3. **Find** `src="images/placeholder.jpg"`
4. **Replace with** `src="images/hobbies/your-image.jpg"`
5. **Save** and refresh browser

---

## 🎨 Changing Colors (Optional)

If you want to change the color scheme:

**Step 1:** Open `style.css`

**Step 2:** Find the `COLOR PALETTE` section at the top

**Step 3:** Change the color codes:

```css
:root {
    --color-primary: #1a1a2e;        /* Main text color */
    --color-accent: #e8a87c;         /* Warm amber highlights */
    --color-accent-alt: #85a5a5;     /* Muted teal */
}
```

**Where to find colors:**
- [Coolors.co](https://coolors.co/) - Generate palettes
- [HTML Color Codes](https://htmlcolorcodes.com/) - Pick colors

---

## 🌐 Publishing Updates to GitHub Pages

### If You Used Web Upload:
1. Go to your repository on github.com
2. Click the file you edited (e.g., `index.html`)
3. Click the **pencil icon** (✏️)
4. Copy your updated content from your local file
5. Paste it in the editor
6. Scroll down → **"Commit changes"**
7. Wait 1-2 minutes → Your site updates!

### If You Used GitHub Desktop:
1. Save your changes in the local file
2. Open GitHub Desktop
3. You'll see your changes listed
4. Add a commit message (e.g., "Updated about section")
5. Click **"Commit to main"**
6. Click **"Push origin"**
7. Wait 1-2 minutes → Your site updates!

---

## ❓ Troubleshooting

### My changes aren't showing
- **Hard refresh:** Press `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
- **Clear cache:** Browser settings → Clear browsing data
- **Check file saved:** Make sure you saved `index.html` after editing

### Images not loading
- **Check file path:** Make sure path matches exactly (case-sensitive!)
- **Check file exists:** Verify image is in `images/hobbies/` folder
- **Check file extension:** Use `.jpg` or `.png` (not `.jpeg`)

### I broke something!
- **Don't panic!** GitHub keeps all previous versions
- **Restore from GitHub:** Go to repository → Click "History" → Find working version
- **Or:** Re-download the original files from this conversation

### Layout looks weird
- **Check tags:** Make sure every `<div>` has a closing `</div>`
- **Check quotes:** Make sure all `"` are closed
- **Undo recent changes:** Remove your last edit and try again

---

## 📋 Editing Checklist

Before publishing updates:

- [ ] Tested locally (opened `index.html` in browser)
- [ ] All images load correctly
- [ ] No broken links
- [ ] Text reads naturally (no typos)
- [ ] Mobile view looks good (resize browser window)
- [ ] Contact info is correct
- [ ] Tone matches your target audience

---

## 💡 Content Tips

### Writing About Your Work
- **Be specific:** "Scaled production 6x" not "Improved production"
- **Show impact:** What changed because of your work?
- **Use numbers:** Percentages, timelines, quantities

### Describing Your Range
- **Don't apologize:** You're multi-disciplinary, not unfocused
- **Show progression:** How each experience built on the last
- **Be confident:** "I learn what's needed and execute"

### Hobbies & Interests
- **Be honest:** Don't list hobbies you don't actually have
- **Show depth:** Explain *why* you're interested
- **Connect to work:** How does this make you better at what you do?

---

## 🚀 What to Update Regularly

### Monthly:
- Add new projects/work as you complete them
- Update skills as you learn new ones
- Refresh hobbies if interests change

### Quarterly:
- Review tone - does it still match your goals?
- Update "What I'm Curious About" section
- Add new achievements/certifications

### Yearly:
- Full content review
- Update professional summary
- Refresh images

---

## 🎯 Remember

This website should:
- **Evolve with you** - Update it as you grow
- **Stay honest** - Don't exaggerate or hide your range
- **Show personality** - You're not a resume, you're a human
- **Be maintained** - An outdated portfolio is worse than none

---

**Your website is built. Now make it yours.** 🚀

---

## Quick Reference: File Locations

- **Main website:** `C:\Users\pujam\Desktop\Website\index.html`
- **Styling:** `C:\Users\pujam\Desktop\Website\style.css`
- **Images:** `C:\Users\pujam\Desktop\Website\images\hobbies\`
- **This guide:** `C:\Users\pujam\Desktop\Website\EDITING_GUIDE.md`
- **GitHub Pages:** `https://your-username.github.io`
