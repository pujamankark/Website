# Setup Formspree for Contact Form

To enable the contact form to send emails directly to you:

1. **Go to Formspree:**
   - Visit https://formspree.io/
   - Sign up for a free account (allows 50 submissions/month)

2. **Create a New Form:**
   - Click "New Form"
   - Enter your email: `puja.mankar.k@gmail.com`
   - Copy the form endpoint URL (looks like: `https://formspree.io/f/xyzabc123`)

3. **Update index-3d.html:**
   - Open `index-3d.html`
   - Find line with: `action="https://formspree.io/f/YOUR_FORM_ID"`
   - Replace `YOUR_FORM_ID` with your actual form ID from Formspree
   - Example: `action="https://formspree.io/f/xyzabc123"`

4. **Test the Form:**
   - Submit a test message
   - Check your email for the confirmation
   - Confirm the form integration in Formspree dashboard

5. **Customize (Optional):**
   - In Formspree dashboard, you can:
     - Set up auto-reply messages
     - Add spam protection
     - Customize thank you page
     - Add file upload support

## Alternative: Direct Email Link

If you prefer a simpler mailto link instead:

Replace the form HTML with:
```html
<a href="mailto:puja.mankar.k@gmail.com?subject=Portfolio Inquiry" class="form-submit">
    Email Me Directly
</a>
```

This will open the user's default email client instead of using a form.
