# Portfolio - Siddharth Ghode

A modern, responsive portfolio website built with React and Tailwind CSS, featuring a real-time contact form.

## Features

- **React**: Component-based architecture
- **Tailwind CSS**: Utility-first styling
- **Custom Cursor**: Animated cursor with trailing ring
- **Responsive Design**: Mobile-optimized layout
- **Real-time Contact Form**: Email sending via EmailJS
- **Smooth Animations**: Scroll-based reveals and transitions
- **Dark Theme**: Modern dark color scheme

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## EmailJS Setup for Contact Form

To enable the contact form functionality:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`
   - `{{to_name}}`
4. Get your Service ID, Template ID, and Public Key
5. Update the values in `src/App.jsx`:

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_name: 'Siddharth Ghode',
  },
  'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
)
```

## Build for Production

```bash
npm run build
```

## Technologies Used

- React 19
- Tailwind CSS 4
- Vite
- EmailJS
- Lucide Icons (if needed)

## Project Structure

```
src/
├── App.jsx          # Main application component
├── main.jsx         # Entry point
├── index.css        # Global styles and Tailwind imports
└── assets/          # Static assets
```

## License

© 2026 Siddharth Ghode — Designed & Built with care
