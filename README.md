# Eco Resume

Eco Resume is a modern, premium web application built to help professionals create stunning, ATS-optimized resumes and cover letters with ease. Featuring a sleek glassmorphic UI, dynamic theme customization, and multiple export formats, Eco Resume empowers job seekers to stand out from the competition.

## Features

- **Interactive Builder**: Intuitive, step-by-step editor for both Resumes and Cover Letters.
- **Premium Templates**: Choose from a variety of professionally designed layouts, including standard, two-column, and centered formats.
- **Real-time Preview**: See your document update instantly as you type, with accurate desktop-grade rendering even on mobile devices.
- **Theme Customization**: Personalize your documents with custom accent and text colors.
- **Multiple Export Formats**: Download your finished documents in both **PDF** and **DOCX** formats seamlessly.
- **Modern UI**: A dark-themed, glassmorphic landing page designed for a premium user experience.
- **Analytics Ready**: Integrated with Vercel Analytics for tracking page views and user engagement.

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Document Generation**:
  - `@react-pdf/renderer` for high-quality PDF exports
  - `docx` for Microsoft Word document generation
- **Analytics**: Vercel Analytics

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need Node.js and npm (Node Package Manager) installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd resume_maker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` to see the application running.

## Building for Production

To create a production-ready build of the application:

```bash
npm run build
```

This will generate a `dist` folder containing the optimized static files, ready to be deployed to your hosting provider (such as Vercel, Netlify, or GitHub Pages).

## License

&copy; {Current Year} Eco Resume. All rights reserved.
