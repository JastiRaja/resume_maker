import React from 'react';
import { ArrowLeft } from 'lucide-react';

import { useParams, Link } from 'react-router-dom';
import { CookieSettingsLink } from './CookieSettingsLink';
import {
  privacyPolicyContent,
  termsOfServiceContent,
  cookiePolicyContent,
} from '../content/legalPagesContent';

export type StaticPageId =
  | 'about'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'help'
  | 'contact'
  | 'faq'
  | 'templates';

const pageContent: Record<StaticPageId, { title: string; content: React.ReactNode }> = {
  about: {
    title: 'About Us',
    content: (
      <div className="space-y-4">
        <p>Welcome to Eco Resume, your premier destination for creating professional resumes and cover letters.</p>
        <p>Our mission is to empower job seekers with the tools they need to stand out in today's competitive job market. We believe that everyone deserves a chance to showcase their skills and experience in the best possible light.</p>
        <p>Founded by a team of HR professionals and software engineers, we combine industry best practices with cutting-edge technology to deliver intuitive, effective, and beautiful templates.</p>
      </div>
    )
  },
  privacy: {
    title: 'Privacy Policy',
    content: privacyPolicyContent,
  },
  terms: {
    title: 'Terms of Service',
    content: termsOfServiceContent,
  },
  cookies: {
    title: 'Cookie Policy',
    content: cookiePolicyContent,
  },
  help: {
    title: 'Help Center',
    content: (
      <div className="space-y-4">
        <p>Welcome to the Help Center. Here you can find resources to help you make the most of Eco Resume.</p>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-2 text-blue-600">Getting Started</h3>
            <p className="text-gray-600">Learn the basics of creating your first resume, selecting templates, and entering your information.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-2 text-blue-600">Formatting Tips</h3>
            <p className="text-gray-600">Discover how to best utilize custom sections, adjust margins, and ensure your PDF exports perfectly.</p>
          </div>
        </div>
      </div>
    )
  },
  contact: {
    title: 'Contact Us',
    content: (
      <div className="space-y-4">
        <p>We'd love to hear from you! If you have any questions, feedback, or need assistance, please drop us a line.</p>
        <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-xl mx-auto">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="How can we help?"></textarea>
            </div>
            <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>
    )
  },
  faq: {
    title: 'Frequently Asked Questions',
    content: (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-2 text-gray-900">Are the resumes really free?</h3>
          <p className="text-gray-600">Yes! You can create, edit, and download your resumes as PDFs completely free of charge. We believe basic job-seeking tools should be accessible to everyone.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-2 text-gray-900">How do ATS systems read your PDFs?</h3>
          <p className="text-gray-600">Our PDF generation engine creates text-layer PDFs that are natively scannable by Applicant Tracking Systems (ATS), ensuring your data is parsed correctly by recruiters.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-2 text-gray-900">Can I save my progress?</h3>
          <p className="text-gray-600">Currently, data is processed locally in your browser. We are working on adding an authentication system so you can save resumes securely in the cloud!</p>
        </div>
      </div>
    )
  },
  templates: {
    title: 'Resume Templates Gallery',
    content: (
      <div className="space-y-4 text-center pb-12">
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">Explore our collection of professionally designed templates built to land you interviews.</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 group">
            <div className="h-64 bg-gray-100 flex flex-col justify-start pt-6 px-10 border-b border-gray-200 group-hover:bg-blue-50 transition-colors">
              <div className="w-full h-8 bg-gray-300 rounded mb-4"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded mb-6"></div>
              <div className="w-full h-24 bg-gray-200 rounded"></div>
            </div>
            <div className="p-6 text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Standard Professional</h3>
              <p className="text-gray-600 text-sm">Clean, traditional, and ATS-friendly. Perfect for corporate roles.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 group">
            <div className="h-64 bg-gray-100 flex flex-col justify-center items-center px-10 border-b border-gray-200 group-hover:bg-indigo-50 transition-colors">
              <div className="w-20 h-20 rounded-full bg-gray-300 mb-4"></div>
              <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded mb-6"></div>
              <div className="w-full flex gap-4 mt-auto opacity-50"><div className="w-1/2 h-20 bg-gray-200 rounded-t"></div><div className="w-1/2 h-20 bg-gray-200 rounded-t"></div></div>
            </div>
            <div className="p-6 text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Centered Modern</h3>
              <p className="text-gray-600 text-sm">Stand out with a centered alignment and modern typography.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 group">
            <div className="h-64 bg-gray-100 flex px-0 border-b border-gray-200 group-hover:bg-emerald-50 transition-colors">
              <div className="w-1/3 h-full bg-gray-800 p-4 pt-8">
                <div className="w-12 h-12 rounded-full bg-gray-600 mb-4 mx-auto"></div>
                <div className="w-full h-2 bg-gray-600 mb-2 rounded"></div>
                <div className="w-full h-2 bg-gray-600 mb-6 rounded"></div>
                <div className="w-full h-2 bg-gray-600 mb-2 rounded"></div>
              </div>
              <div className="w-2/3 h-full bg-white p-4 pt-8 border-l border-gray-200">
                <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/2 h-3 bg-gray-200 rounded mb-6"></div>
                <div className="w-full h-16 bg-gray-100 rounded mb-4"></div>
              </div>
            </div>
            <div className="p-6 text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Two-Column Creative</h3>
              <p className="text-gray-600 text-sm">Maximize space with a stylish sidebar for skills and contact info.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

const StaticPage: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  // Cast and assert we have a valid page ID, otherwise fallback to 'about'
  const validPageId = (pageId && pageId in pageContent) ? (pageId as StaticPageId) : 'about';
  const page = pageContent[validPageId];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">{page.title}</h1>
        <div className="text-gray-700 leading-relaxed text-lg">
          {page.content}
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 space-y-3">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
            <CookieSettingsLink className="text-sm text-gray-400 hover:text-white transition-colors underline-offset-2 hover:underline" />
          </div>
          <p>&copy; {new Date().getFullYear()} Eco Resume. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default StaticPage;
