# Eco Resume

,Lou Alvarez

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

## 🏗 Architecture & Technical Deep Dive

If you are a developer looking to understand or extend Eco Resume, this section provides a high-level overview of our core mechanics, specifically how we manage dynamic templates and handle exact format document downloads.

### 1. The Template Engine

The resume template system is built using a purely isolated, data-driven architecture in React.

*   **Data Model**: All user input converges into a single, standardized `ResumeData` TypeScript interface. This strict separation decouples the raw content from the presentation layers.
*   **Layout Component Hierarchy**: All templates are pure React Functional Components located in `src/components/ResumePreviewLayouts.tsx`. These components accept standard props (`data`, `themeColorText`, `themeColorBg`) and use generic HTML/Tailwind CSS structures to paint the `ResumeData` object in a distinct visual hierarchy (e.g., standard, two-column, modern split, or geometric).
*   **Template Registry**: `src/data/resumeTemplates.ts` acts as the master template registry. Adding a new template simply requires appending a configuration object (with a unique ID, descriptive name, and mock sample data) to the `getResumeTemplates` array framework.
*   **Dynamic Routing**: Inside `src/components/ResumePreview.tsx`, the selected `templateId` dynamically matches to the imported Layout component, automatically applying the respective fallback color scheme unless the user overrides it natively via color pickers. 

### 2. PDF & Document Generation Mechanism

Eco Resume generates high-fidelity exports that perfectly preserve visual integrity and styling.

#### Rendering Exact PDF Formatting
We harness true browser capabilities to recreate pixel-accurate PDFs corresponding exactly to your live HTML preview:
*   **CSS Print Context Rendering (`window.print()`)**: When a user triggers "Export PDF", we apply specific print-media CSS or `@page` CSS directives to strip out the application interface wrapper overhead (like the Builder navigation, sidebars, and tools).
*   **Computed Layouts**: Because the builder relies purely on DOM & styling, the browser's native print-to-PDF engine captures the exact computed layouts representing the HTML preview. It naturally captures flexboxes, absolute positional layouts, and dynamic Tailwind grids representing the resume. 
*   **Alternative Fallback**: In more robust configurations, we rely on PDF generation engines like `@react-pdf/renderer` or `html2pdf.js` by intercepting the `#resume-preview` node and translating standard CSS strings directly into `React-PDF`'s localized vector mappings.

#### Native DOCX Generation
For the Word Document format, we leverage the `docx` library.
*   **Abstract Abstraction Model**: Instead of rendering from an image context, the DOCX engine parses the abstract `ResumeData` JSON natively.
*   **Node Reconciliation**: It maps the abstract object cleanly into Microsoft Word proprietary elements (Paragraphs, TextRuns, Document Sections, and Tables), maintaining structural text integrity so the resume file is easily parseable by Applicant Tracking Systems (ATS) downstream.

## License

&copy; {Current Year} Eco Resume. All rights reserved.
