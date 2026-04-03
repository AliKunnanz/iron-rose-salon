# Iron Rose Salon Website

A punk rock themed hair salon website built with Angular.

## Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

### Run the Website

1. Open terminal/command prompt
2. Navigate to the project folder and install dependencies:
   ```bash
   cd iron-rose-salon
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start
   ```
4. Open your browser to: **http://localhost:4200**

## For Deployment (Publishing the Website)

### Build for Production
```bash
npm run build
```
The built files will be in: `dist/iron-rose-salon/browser/`

### Deploy Options

**Option 1: Static Hosting (Netlify, Vercel, GitHub Pages)**
1. Run `npm run build`
2. Upload the contents of `dist/iron-rose-salon/browser/` to your hosting provider

**Option 2: Local Server**
1. Run `npm run build`
2. Serve the `dist/iron-rose-salon/browser/` folder with any web server

## Project Structure

```
iron-rose-salon/
├── src/
│   ├── app/
│   │   ├── pages/           # Website pages
│   │   │   ├── home/        # Home page
│   │   │   ├── about/       # About page
│   │   │   ├── services/    # Services & pricing
│   │   │   ├── stylists/    # Stylist profiles
│   │   │   ├── gallery/     # Photo gallery
│   │   │   ├── shop/        # Online shop
│   │   │   ├── booking/      # Book appointment
│   │   │   └── contact/     # Contact form
│   │   ├── components/      # Reusable components
│   │   │   ├── navbar/      # Navigation menu
│   │   │   └── footer/      # Footer
│   │   ├── app.routes.ts    # Page routing
│   │   └── app.ts           # Main app component
│   ├── styles.css           # Global styles & colors
│   └── index.html           # HTML entry point
├── public/                  # Static assets (images)
├── package.json             # Dependencies
├── angular.json             # Angular configuration
└── tsconfig.json            # TypeScript configuration
```

## How to Customize

### Change Colors
Edit: `src/styles.css`

Find the `:root` section and change these values:
```css
:root {
  --primary: #0d0d0d;           /* Background color */
  --secondary: #1a1a1a;         /* Card background */
  --accent: #ff0080;            /* Primary accent (pink) */
  --accent-secondary: #ff4d94;  /* Secondary accent */
  --accent-tertiary: #8b00ff;    /* Tertiary accent (purple) */
  --accent-cyan: #00ffff;       /* Cyan accent */
  --accent-lime: #39ff14;       /* Green accent */
  --accent-yellow: #ffdd00;     /* Yellow accent */
  --accent-orange: #ff6600;     /* Orange accent */
  --text: #ffffff;              /* Text color */
  --text-muted: #bbbbbb;        /* Muted text */
  --border: #333;               /* Border color */
}
```

### Edit Page Content
Each page has 3 files:
- **.html** - The content (text, images)
- **.css** - The styling (colors, layout)
- **.ts** - The data/logic

### Add Images
Place image files in the `public/` folder and reference them with `/filename.ext`

### Edit Stylist Information
File: `src/app/pages/stylists/stylists.ts`

### Edit Services & Prices
File: `src/app/pages/services/services.html`

### Edit Navigation Links
File: `src/app/components/navbar/navbar.html`

## Technologies Used

- **Angular** - Web framework
- **TypeScript** - Programming language
- **CSS** - Styling
- **HTML** - Content

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run start` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run linter |
| `ng serve` | Start dev server (alternative) |

## Troubleshooting

**Port 4200 is already in use**
```bash
npm run start -- --port 4201
```

**Node modules missing**
```bash
npm install
```

## Notes

- This is a frontend-only website
- Contact form submissions are logged to console (not connected to email service)
- For a real booking system, integrate with a service like Calendly, Square, or build a backend
