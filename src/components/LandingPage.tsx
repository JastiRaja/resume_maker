import React from 'react';
import { FileText, Edit3, Download, Briefcase, Mail, Star, ArrowRight } from 'lucide-react';

import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Professional Templates",
      description: "Choose from expertly designed resume and cover letter templates"
    },
    {
      icon: <Edit3 className="w-8 h-8 text-green-600" />,
      title: "Easy Editing",
      description: "Customize templates with our intuitive drag-and-drop editor"
    },
    {
      icon: <Download className="w-8 h-8 text-purple-600" />,
      title: "Multiple Formats",
      description: "Download your documents in PDF or DOCX format"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      content: "This tool helped me create a professional resume that landed me my dream job!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      content: "The templates are modern and the editing process is incredibly smooth.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "HR Director",
      content: "I recommend this to all job seekers. The quality is outstanding.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 font-sans selection:bg-blue-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/10 bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <img src="/images/logo.png" alt="Eco Resume Logo" className="relative w-12 h-12 object-contain" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Eco Resume</span>
            </div>
            {/* <nav className="hidden md:flex space-x-8">
              <button className="text-gray-300 hover:text-white transition-colors">Features</button>
              <button className="text-gray-300 hover:text-white transition-colors">Templates</button>
              <button className="text-gray-300 hover:text-white transition-colors">Pricing</button>
              <button className="text-gray-300 hover:text-white transition-colors">Contact</button>
            </nav> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 mb-8 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="text-sm font-medium">New Premium Templates Available</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
              Create Your Perfect
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">
                Resume & Cover Letter
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Stand out from the competition with professionally designed templates.
              Get hired faster with an <span className="text-white font-semibold">ATS-optimized</span> document that shines.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/resume"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)] hover:-translate-y-1"
              >
                <Briefcase className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                <span>Build Resume</span>
                <ArrowRight className="w-5 h-5 ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link
                to="/cover-letter"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 hover:-translate-y-1"
              >
                <Mail className="w-5 h-5 mr-3 text-gray-300 group-hover:scale-110 transition-transform" />
                <span>Build Cover Letter</span>
                <ArrowRight className="w-5 h-5 ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-gray-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-gray-900/50 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Why Choose Eco Resume?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to create professional documents that get results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.3)] backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gray-800 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-24 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-400">
              Join thousands of professionals who landed their dream jobs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800/50 p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors backdrop-blur-md relative group">
                <div className="absolute top-0 right-8 -mt-5 text-6xl text-blue-500/20 group-hover:text-blue-500/40 transition-colors font-serif">"</div>
                <div className="flex mb-6 space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-8 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center border-t border-white/10 pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-4">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-blue-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 backdrop-blur-xl p-12 text-center shadow-[0_0_100px_-20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_120px_-20px_rgba(59,130,246,0.5)] transition-shadow duration-500">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Ready to Accelerate Your Career?
              </h2>
              <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
                Join thousands of job seekers who have successfully landed their dream roles using our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/resume"
                  className="inline-flex items-center justify-center px-8 py-4 font-bold text-gray-900 transition-all duration-200 bg-white rounded-xl hover:bg-gray-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-gray-900 shadow-xl"
                >
                  Start Building Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-950 border-t border-white/10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 md:gap-8 mb-16">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/images/logo.png" alt="Eco Resume Logo" className="w-12 h-12 " />
                <span className="text-lg font-bold">Eco Resume</span>
              </div>
              <p className="text-gray-400">
                Professional resume and cover letter builder for job seekers worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Eco Resume</Link></li>
                <li><Link to="/cover-letter" className="hover:text-white transition-colors">Cover Letter Builder</Link></li>
                <li><Link to="/templates" className="hover:text-white transition-colors">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Eco Resume. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;