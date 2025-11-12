import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Zap, Shield, UserX, CheckCircle, XCircle, Lock, CheckCheck, ThumbsUp, Linkedin, Twitter } from 'lucide-react';

export default function HireWithUs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-trigger').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Modal functions
  const openModal = () => {
    setModalOpen(true);
    document.body.classList.add('overflow-hidden');
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.classList.remove('overflow-hidden');
    setFormStatus('');
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://formspree.io/f/xyzbelvz', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        formRef.current?.reset();
        setTimeout(() => closeModal(), 2500);
      } else {
        const data = await response.json();
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-slate-50 text-slate-800">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .fade-in-trigger { opacity: 0; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-md">
        <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <img 
              src="https://res.cloudinary.com/dpz44zf0z/image/upload/v1760086493/HireWithUS_wtn0pc.png" 
              alt="HireWithUs Logo" 
              className="h-10 w-auto object-contain"
            />
            <span className="text-2xl font-bold text-indigo-700">HireWithUs</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">How It Works</a>
            <a href="#benefits" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Benefits</a>
            <a href="https://www.testify-lac.com/jobportal/student-login.html" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Job Portal</a>
            <a href="https://www.testify-lac.com/hiring/hiring-moderator-login.html" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">Company Login</a>
            <button 
              onClick={openModal}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all hover:-translate-y-1"
            >
              Request Demo
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-700 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4">
            <a href="#features" onClick={closeMobileMenu} className="block px-6 py-2 text-slate-700 hover:bg-indigo-50">Features</a>
            <a href="#how-it-works" onClick={closeMobileMenu} className="block px-6 py-2 text-slate-700 hover:bg-indigo-50">How It Works</a>
            <a href="#benefits" onClick={closeMobileMenu} className="block px-6 py-2 text-slate-700 hover:bg-indigo-50">Benefits</a>
            <a href="https://www.testify-lac.com/jobportal/student-login.html" onClick={closeMobileMenu} className="block px-6 py-2 text-slate-700 hover:bg-indigo-50">Job Portal</a>
            <a href="https://www.testify-lac.com/hiring/hiring-moderator-login.html" onClick={closeMobileMenu} className="block px-6 py-2 text-indigo-600 font-semibold hover:bg-indigo-50">Company Login</a>
            <button 
              onClick={() => { closeMobileMenu(); openModal(); }}
              className="block px-6 py-2 mt-2 mx-4 bg-indigo-600 text-white rounded-lg text-center font-semibold w-[calc(100%-2rem)]"
            >
              Request Demo
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-100 to-white py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-in-trigger">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Hire Smarter, Faster, and with <span className="text-indigo-600">Absolute Confidence</span>.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10">
              HireWithUs integrates seamless applicant tracking with the unparalleled security of Testify Secure Test and optional on-site monitoring for truly reliable assessments.
            </p>
            <button 
              onClick={openModal}
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all hover:-translate-y-1"
            >
              Request a Demo
            </button>
          </div>
          
          <div className="mt-16 fade-in-trigger delay-100">
            <img 
              src="https://res.cloudinary.com/dpz44zf0z/image/upload/v1761656750/Screenshot_2025-10-28_183254_fwpqru.png" 
              alt="HireWithUs Platform Screenshot" 
              className="rounded-lg shadow-xl mx-auto border border-indigo-100"
            />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in-trigger">
            <span className="text-indigo-600 font-semibold uppercase tracking-wide">The Challenge</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">Disjointed Hiring & Assessment Risks</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Managing candidates across different tools is inefficient. Worse, standard online tests are vulnerable to malpractice, making it hard to trust assessment results and identify top talent fairly.
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center"><XCircle className="text-red-500 mr-2" size={20} /> Inefficient manual processes</li>
              <li className="flex items-center"><XCircle className="text-red-500 mr-2" size={20} /> High risk of cheating in online tests</li>
              <li className="flex items-center"><XCircle className="text-red-500 mr-2" size={20} /> Difficulty verifying candidate identity</li>
              <li className="flex items-center"><XCircle className="text-red-500 mr-2" size={20} /> Lack of confidence in assessment outcomes</li>
            </ul>
          </div>
          <div className="fade-in-trigger delay-100">
            <img 
              src="https://res.cloudinary.com/dpz44zf0z/image/upload/v1761657176/HIRING_CHALLENGES_xcffjk.png" 
              alt="Illustration showing hiring challenges" 
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 fade-in-trigger">
            <span className="text-indigo-600 font-semibold uppercase tracking-wide">Our Solution</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">One Platform, Unmatched Integrity</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              HireWithUs combines powerful recruitment tools with the robust security of Testify.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 fade-in-trigger delay-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">End-to-End Hiring Workflow</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Manage applications, schedule tests & interviews, track candidate progress, and collaborate with your team – all within HireWithUs.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 fade-in-trigger delay-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Testify Secure Test App</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Assign aptitude or coding tests delivered via our dedicated desktop app. Features lockdown, proctoring, system checks, and identity verification.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 fade-in-trigger delay-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 mb-4">
                <UserX size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Zero Malpractice Guarantee</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Need absolute certainty? We offer optional on-site monitoring teams during Testify assessments to physically proctor candidates and eliminate malpractice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 fade-in-trigger">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Simple Steps to Secure Hiring</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Streamline your process from job creation to confident hiring decisions.
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-200 transform -translate-y-4 -z-10"></div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center relative z-10">
              {[
                { num: 1, title: 'Post Your Job', desc: 'Create job postings and manage applications within HireWithUs.' },
                { num: 2, title: 'Assign Secure Tests', desc: 'Schedule aptitude or coding tests delivered via the Testify Secure Test app.' },
                { num: 3, title: 'Ensure Integrity', desc: "Leverage Testify's lockdown features and optional on-site monitoring for zero malpractice." },
                { num: 4, title: 'Review & Hire', desc: 'Confidently review reliable results and manage interviews within HireWithUs.' }
              ].map((step, idx) => (
                <div key={step.num} className={`fade-in-trigger delay-${(idx + 1) * 100}`}>
                  <div className="h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg bg-indigo-600 text-white">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 md:py-24 bg-indigo-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 fade-in-trigger">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Choose HireWithUs + Testify?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { icon: Zap, title: 'Boost Efficiency', desc: 'Manage your entire hiring pipeline in one place, reducing manual work and context switching.', delay: 100 },
              { icon: Lock, title: 'Uncompromised Security', desc: "Prevent cheating effectively with Testify's secure desktop environment and proctoring features.", delay: 200 },
              { icon: CheckCheck, title: 'Guaranteed Integrity', desc: 'Achieve zero malpractice with our unique optional on-site monitoring service during assessments.', delay: 300 },
              { icon: ThumbsUp, title: 'Hire with Confidence', desc: 'Make better hiring decisions based on reliable, verified assessment results you can trust.', delay: 400 }
            ].map((benefit) => (
              <div 
                key={benefit.title}
                className={`flex items-start space-x-4 fade-in-trigger delay-${benefit.delay} p-4 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:bg-white`}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mt-1 bg-indigo-50 text-indigo-600">
                  <benefit.icon size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">{benefit.title}</h3>
                  <p className="text-slate-600 mt-1">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 md:py-24 bg-indigo-700 text-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center fade-in-trigger">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Secure and Streamline Your Hiring?</h2>
          <p className="text-indigo-200 text-lg mb-10 max-w-2xl mx-auto">
            See HireWithUs and Testify Secure Test in action. Request a personalized demo today and discover how we ensure assessment integrity.
          </p>
          <button 
            onClick={openModal}
            className="inline-block bg-white text-indigo-700 px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-indigo-50 transition-all hover:-translate-y-1"
          >
            Request a Demo
          </button>
          <p className="text-sm text-indigo-300 mt-6">
            Or contact us at <a href="mailto:support@testify-lac.com" className="font-medium hover:underline">support@testify-lac.com</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <img 
              src="https://res.cloudinary.com/dpz44zf0z/image/upload/v1760086493/HireWithUS_wtn0pc.png" 
              alt="HireWithUs Logo" 
              className="h-8 w-auto object-contain"
            />
            <span className="text-lg font-semibold text-slate-300">HireWithUs</span>
          </div>
          <p className="text-sm mb-4">A product by Xeta Solutions.</p>
          <p className="text-xs">&copy; {new Date().getFullYear()} Xeta Solutions. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" aria-label="LinkedIn" className="hover:text-indigo-400 transform hover:-translate-y-1 transition-all">
              <Linkedin size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-indigo-400 transform hover:-translate-y-1 transition-all">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60]">
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity duration-300"
            onClick={closeModal}
          ></div>
          
          <div className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Request a Demo</h2>
              <button 
                onClick={closeModal}
                className="text-slate-500 hover:text-slate-800"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto h-[calc(100vh-73px)]">
              <p className="text-slate-600 mb-6">Fill out the form below and our team will get in touch with you shortly to schedule a personalized demo.</p>
              
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      required 
                      className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Company Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      required 
                      className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Mobile Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      id="phone" 
                      required 
                      placeholder="e.g., +1 555-123-4567"
                      className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700">Company Name</label>
                    <input 
                      type="text" 
                      name="company" 
                      id="company" 
                      required 
                      className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">Questions or Message (Optional)</label>
                    <textarea 
                      name="message" 
                      id="message" 
                      rows="4" 
                      placeholder="Let us know if you have specific questions..."
                      className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-indigo-700 disabled:opacity-75 disabled:cursor-not-allowed transition-all hover:-translate-y-1"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </div>
              </form>
              
              {formStatus === 'success' && (
                <p className="mt-4 text-center text-green-600">Thanks! We've received your request and will be in touch soon.</p>
              )}
              {formStatus === 'error' && (
                <p className="mt-4 text-center text-red-600">Oops! There was a problem submitting your form.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}