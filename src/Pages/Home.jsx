import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Check, FileText, Shield, BarChart3, Workflow, Zap, Users, Edit3, TrendingUp, MessageCircle, Eye, Brain, Activity, CheckCircle } from 'lucide-react';

// Main App Component
export default function XetaSolutions() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (modalName, jobTitle = null) => {
    setActiveModal({ name: modalName, jobTitle });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="bg-white text-gray-800 antialiased">
      {/* Header */}
      <Header 
        scrolled={scrolled} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        openModal={openModal}
      />

      {/* Hero Section */}
      <HeroSection openModal={openModal} />

      {/* About Section */}
      <AboutSection />

      {/* Products Section */}
      <ProductsSection />

      {/* Workflow Section */}
      <WorkflowSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Mock Interviews Section */}
      <MockInterviewsSection />

      {/* Careers Section */}
      <CareersSection />

      {/* CTA Section */}
      <CTASection openModal={openModal} />

      {/* Footer */}
      <Footer openModal={openModal} />

      {/* Modals */}
      {activeModal && (
        <Modal 
          modalName={activeModal.name} 
          jobTitle={activeModal.jobTitle}
          closeModal={closeModal} 
        />
      )}
    </div>
  );
}

// Header Component
function Header({ scrolled, mobileMenuOpen, setMobileMenuOpen, openModal }) {
  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#products', label: 'Products' },
    { href: '#workflow', label: 'Workflow' },
    { href: '#features', label: 'Features' },
    { href: '#mock-interviews', label: 'Mock Interviews' },
    { href: '#careers', label: 'Careers' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-md'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img 
            src="https://res.cloudinary.com/dpz44zf0z/image/upload/v1760704788/XETA_SOLUTIONS_LOGO_bcsbwh.png" 
            alt="Xeta Solutions Logo" 
            className="h-8 md:h-10"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="md:flex space-x-8 items-center">
          {navItems.map(item => (
            <a 
              key={item.href}
              href={item.href} 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button 
            onClick={() => openModal('request-demo-modal')}
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:bg-blue-700 transition-transform hover:scale-105"
          >
            Book a Demo
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-xl">
          {navItems.map(item => (
            <a 
              key={item.href}
              href={item.href} 
              className="block px-6 py-3 text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button 
            onClick={() => {
              openModal('request-demo-modal');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-6 py-4 bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Book a Demo
          </button>
        </div>
      )}
    </header>
  );
}

// Hero Section Component
function HeroSection({ openModal }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16" style={{
      backgroundImage: "url('https://res.cloudinary.com/dpz44zf0z/image/upload/v1760704788/XETA_SOLUTIONS_bt6bgn.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/95 via-white/95 to-purple-50/95 animate-gradient"></div>
      
      <div className="container mx-auto px-6 text-center z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Transforming Recruitment, Learning, and Assessment Through the{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
              Power of AI.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10">
            Empowering organizations with AI-driven hiring, secure assessments, and real-world mock interviews.
          </p>
          <div className="flex flex-row justify-center gap-4">
            <a 
                href="#products" 
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
                Explore Products
            </a>
            <button 
                onClick={() => openModal('request-demo-modal')}
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
                Book a Demo
            </button>
          </div>
        </div>

        {/* Floating UI Card */}
        {/* --- JSX (React) --- */}
<div className="relative max-w-4xl mx-auto mt-20" style={{ perspective: '1500px' }}>
  <div
    className="w-full h-auto bg-white rounded-2xl shadow-2xl p-2 md:p-4 border border-gray-100"
    style={{
      transitionDelay: '800ms',
      transformStyle: 'preserve-3d',
      transform: 'rotateX(10deg) rotateY(-15deg)',
      WebkitTransformStyle: 'preserve-3d',
      WebkitTransform: 'rotateX(10deg) rotateY(-15deg)'
    }}
  >
    <div className="floating">
      {/* Browser bar */}
        <div className="flex items-center space-x-1.5 mb-2 md:mb-3 px-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>

        {/* Dashboard content */}
        <div className="w-full h-48 md:h-80 bg-gray-100 rounded-lg p-4 md:p-6 flex space-x-4">
            <div className="w-1/4 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-3/4 flex flex-col space-y-3">
            <div className="w-full h-12 bg-blue-200 rounded-lg animate-pulse"></div>
            <div className="w-5/6 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-full h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
        </div>
        </div>
    </div>
    </div>
      </div>
    </section>
  );
}

// About Section Component
function AboutSection() {
  const features = [
    {
      icon: <Zap className="w-7 h-7" />,
      title: 'Innovation',
      description: 'AI-driven insights and futuristic platform design.',
      color: 'blue'
    },
    {
      icon: <Activity className="w-7 h-7" />,
      title: 'Automation',
      description: 'Streamline workflows from application to interview.',
      color: 'purple'
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Security',
      description: 'Ensuring 100% integrity with proctoring and verification.',
      color: 'teal'
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-blue-600 font-semibold uppercase">About Xeta</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
            An Integrated Ecosystem for Talent
          </h2>
          <p className="text-lg text-gray-700 mb-12">
            Xeta Solutions is a dynamic software company focused on building a secure, scalable, and intelligent ecosystem for recruitment, assessment, and learning. We deliver automation, integrity, and actionable insights to drive your success.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 bg-${feature.color}-100 text-${feature.color}-600 rounded-full flex items-center justify-center mx-auto mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Products Section Component
function ProductsSection() {
  const products = [
    {
      name: 'HireWithUS',
      description: 'End-to-end AI-powered hiring automation.',
      icon: 'https://res.cloudinary.com/dpz44zf0z/image/upload/v1760086493/HireWithUS_wtn0pc.png',
      color: 'blue',
      features: ['AI Application Screening', 'Automated Shortlisting', 'Interview Scheduling', 'Analytics & Reporting']
    },
    {
      name: 'Testify – Secure Test',
      description: 'Lockdown client with AI proctoring for 100% integrity.',
      icon: 'https://res.cloudinary.com/dpz44zf0z/image/upload/v1761650380/TESTIFY-SECURE_TEST_kkr1v2.png',
      color: 'red',
      features: ['Lockdown Environment', 'AI Proctoring', 'Behavior Monitoring', 'Evidence Capture']
    },
    {
      name: 'Testify – LAC',
      description: 'Learn, Assess, Code. The all-in-one platform for tech upskilling.',
      icon: 'https://res.cloudinary.com/dpz44zf0z/image/upload/v1756037774/Gemini_Generated_Image_eu0ib0eu0ib0eu0i_z0amjh.png',
      color: 'purple',
      features: ['Live Classes & Courses', 'SQL & Coding Practice', 'Automated Assessments', 'Progress Tracking']
    },
    {
      name: 'QuizCom',
      description: 'Live interactive quizzes with real-time leaderboards.',
      icon: 'https://res.cloudinary.com/dpz44zf0z/image/upload/v1760086493/QuizCom_u5wzcp.png',
      color: 'teal',
      features: ['Real-time Leaderboards', 'Join-by-Code Model', 'Classroom Engagement', 'Corporate Competitions']
    },
    {
      name: 'Xeta Mock Interviews',
      description: 'Real interview simulations with industry experts.',
      icon: 'https://res.cloudinary.com/dpz44zf0z/image/upload/v1762319046/MOCK_INTERVIEWS_tlno45.png',
      color: 'pink',
      features: ['Structured Process Flow', 'Industry Expert Panels', 'Personalized Feedback', 'Boost Employability']
    }
  ];

  return (
    <section id="products" className="py-24 bg-gray-50/70">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold uppercase">Our Product Suite</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            A Platform for Every Need
          </h2>
          <p className="text-lg text-gray-700">
            From first application to final interview and continuous learning, our platforms work together seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="h-96 cursor-pointer perspective-1500"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-white shadow-xl p-8 flex flex-col justify-between border border-gray-100 rounded-3xl">
          <div>
            <div className={`p-3 bg-${product.color}-100 rounded-full inline-block mb-4`}>
              <img src={product.icon} alt={`${product.name} Logo`} className="w-12 h-12 object-contain" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <span className={`font-semibold text-${product.color}-600`}>Learn More →</span>
        </div>

        {/* Back */}
        <div className={`absolute w-full h-full backface-hidden bg-gradient-to-br from-${product.color}-500 to-${product.color}-700 p-8 text-white flex flex-col justify-center rounded-3xl rotate-y-180`}>
          <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
          <ul className="list-disc list-inside space-y-2">
            {product.features.map((feature, idx) => (
              <li key={idx} className="text-sm">{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Workflow Section Component
function WorkflowSection() {
  const steps = [
    { icon: <FileText />, title: '1. Job Posting', description: 'Post jobs and target specific colleges or open applications.', color: 'blue' },
    { icon: <Brain />, title: '2. AI Screening', description: 'Auto-verify documents and score resumes against the job description.', color: 'purple' },
    { icon: <Edit3 />, title: '3. Test Assignment', description: 'Assign coding, aptitude, or MCQ tests to shortlisted candidates.', color: 'teal' },
    { icon: <Eye />, title: '4. Proctoring', description: 'Candidates take tests in the secure, AI-monitored Testify client.', color: 'red' },
    { icon: <MessageCircle />, title: '5. Interview', description: 'Auto-schedule and conduct in-person or online interviews.', color: 'pink' },
    { icon: <CheckCircle />, title: '6. Selection', description: 'Analyze feedback and analytics to make the final hiring decision.', color: 'green' }
  ];

  return (
    <section id="workflow" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold uppercase">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Your End-to-End Hiring Workflow
          </h2>
          <p className="text-lg text-gray-700">
            We automate every step, from the initial job post to the final offer, ensuring a seamless and secure process.
          </p>
        </div>

        <div className=" md:flex justify-between items-start relative">
          <div className="absolute top-6 left-[5%] right-[5%] h-0.5 bg-blue-100 z-0"></div>
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 text-center w-40">
              <div className={`w-12 h-12 bg-white border-2 border-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 text-${step.color}-600 hover:bg-blue-100 hover:border-blue-400 transition-all hover:scale-110`}>
                {step.icon}
              </div>
              <h4 className="font-bold text-sm text-gray-900 mb-1">{step.title}</h4>
              <p className="text-xs text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className={`w-12 h-12 bg-${step.color}-100 text-${step.color}-600 rounded-full flex items-center justify-center flex-shrink-0`}>
                {step.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features Section Component
function FeaturesSection() {
  const features = [
    { icon: <Brain />, title: 'AI-Driven Screening', description: 'Automated resume scoring and ID verification to shortlist the best candidates faster.' },
    { icon: <Eye />, title: 'Secure AI Proctoring', description: 'Advanced behavior monitoring and a lockdown client ensure 100% test integrity.' },
    { icon: <BarChart3 />, title: 'Analytics & Reporting', description: 'Actionable insights from application to hire, with detailed performance metrics.' },
    { icon: <Workflow />, title: 'Integrated Workflow', description: 'A seamless flow from job posting, to testing, to automated interview scheduling.' },
    { icon: <Zap />, title: 'Gamified Quizzes', description: 'Boost engagement in classrooms and corporate events with live, competitive quizzes.' },
    { icon: <Users />, title: 'Expert Interview Panels', description: 'Get real-world interview practice and detailed feedback from top industry professionals.' }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50/70">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold uppercase">Key Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Everything You Need, All in One Place
          </h2>
          <p className="text-lg text-gray-700">
            Our platform is packed with powerful features designed to automate, secure, and enhance your entire talent lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-blue-200"
            >
              <div className="w-10 h-10 text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section Component
function WhyChooseUsSection() {
  const advantages = [
    { text: 'Accuracy: AI-driven screening delivers the right talent, faster.' },
    { text: 'Security: Unmatched integrity with our proctored lockdown client.' },
    { text: 'Efficiency: Automate your entire workflow, from job post to selection.' },
    { text: 'Innovation: A complete ecosystem for hiring, testing, and learning.' }
  ];

  return (
    <section id="why-us" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-600 font-semibold uppercase">Why Xeta</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
              The Xeta Solutions Advantage
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              We don't just provide software; we provide an intelligent, integrated ecosystem. Our platform is built on a foundation of four key pillars to ensure your organization's success.
            </p>
            <ul className="space-y-4">
              {advantages.map((advantage, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-lg text-gray-800">{advantage.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-96">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-gradient-to-br from-blue-50 to-purple-100 rounded-3xl shadow-2xl p-6 animate-float">
              <div className="w-full h-64 bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
                <p className="font-bold text-blue-900 text-lg">AI + Human Collaboration</p>
                <div className="w-full h-12 bg-blue-200 rounded-lg animate-pulse mt-4"></div>
                <div className="w-5/6 h-8 bg-purple-200 rounded-lg animate-pulse mt-3"></div>
                <div className="w-full h-20 bg-gray-200 rounded-lg animate-pulse mt-3"></div>
              </div>
            </div>
            <div className="absolute top-1/4 left-10 w-16 h-16 bg-white shadow-xl rounded-full flex items-center justify-center text-blue-600">
              <Zap className="w-7 h-7" />
            </div>
            <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-white shadow-xl rounded-full flex items-center justify-center text-purple-600" style={{ animationDelay: '1s' }}>
              <Users className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mock Interviews Section Component
function MockInterviewsSection() {
  const benefits = [
    { icon: <Users />, title: 'Industry Experts', description: 'Get interviewed by professionals from top-tier companies.', color: 'blue' },
    { icon: <Edit3 />, title: 'Real Feedback', description: 'Receive detailed, constructive feedback on your performance.', color: 'purple' },
    { icon: <TrendingUp />, title: 'Skill Evaluation', description: 'Identify your strengths and weaknesses in a real-world setting.', color: 'teal' },
    { icon: <CheckCircle />, title: 'Career Growth', description: 'Build confidence and improve your employability for placement season.', color: 'pink' }
  ];

  return (
    <section id="mock-interviews" className="py-24 bg-gray-50/70">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold uppercase">Xeta Mock Interviews</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Experience Real Interviews Before the Real Job.
          </h2>
          <p className="text-lg text-gray-700">
            Our program simulates the entire hiring process, from application to a final interview with professionals from top MNCs, giving you actionable feedback to secure your future.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200"
            >
              <div className={`w-12 h-12 bg-${benefit.color}-100 text-${benefit.color}-600 rounded-full flex items-center justify-center mb-4`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Careers Section Component
function CareersSection() {
  return (
    <section id="careers" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-blue-600 font-semibold uppercase">Work With Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Join Our Team
          </h2>
          <p className="text-lg text-gray-700 mb-10">
            We're always looking for passionate, innovative individuals to help us build the future of talent and technology. See all our open roles on our careers page.
          </p>
          <a 
            href="/careers" 
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            View Open Roles
          </a>
        </div>
      </div>
    </section>
  );
}

// CTA Section Component
function CTASection({ openModal }) {
  return (
    <section id="cta" className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white animate-gradient bg-[length:200%_auto]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
          Join the Future of Smart Hiring and Learning with Xeta Solutions.
        </h2>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10">
          Get in touch with our team for a personalized demo and see how our integrated ecosystem can transform your organization.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => openModal('get-started-modal')}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
          <button 
            onClick={() => openModal('partner-with-us-modal')}
            className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
          >
            Partner With Us
          </button>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer({ openModal }) {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <img 
              src="https://res.cloudinary.com/dpz44zf0z/image/upload/v1760704788/XETA_SOLUTIONS_LOGO_bcsbwh.png" 
              alt="Xeta Solutions Logo" 
              className="h-8 md:h-10 mb-4"
            />
            <p className="mt-4 text-gray-500">Innovating Talent & Technology.</p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.linkedin.com/company/109604953/" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-3">
              <li><a href="#products" className="hover:text-white transition-colors">HireWithUS</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Testify – Secure Test</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Testify – LAC</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">QuizCom</a></li>
              <li><a href="#mock-interviews" className="hover:text-white transition-colors">Mock Interviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><button onClick={() => openModal('partner-with-us-modal')} className="hover:text-white transition-colors">Partners</button></li>
              <li><a href="mailto:support@xetasolutions.in" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li><a href="mailto:support@xetasolutions.in" className="hover:text-white transition-colors">support@xetasolutions.in</a></li>
              <li><a href="mailto:sales@xetasolutions.in" className="hover:text-white transition-colors">sales@xetasolutions.in</a></li>
              <li><a href="tel:+919010408899" className="hover:text-white transition-colors">+91 9010408899</a></li>
              <li>
                <button 
                  onClick={() => openModal('request-demo-modal')}
                  className="text-blue-400 hover:text-white font-semibold transition-colors"
                >
                  Request a Demo
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Xeta Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Modal Component
function Modal({ modalName, jobTitle, closeModal }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    
    try {
      const response = await fetch(e.target.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = {
    'request-demo-modal': {
      title: 'Book a Demo',
      subtitle: "Fill out the form below and we'll get back to you.",
      formAction: 'https://formspree.io/f/xyzbelvz'
    },
    'get-started-modal': {
      title: 'Get Started with Xeta',
      subtitle: "Fill out the form below and we'll get back to you.",
      formAction: 'https://formspree.io/f/xyzbelvz'
    },
    'partner-with-us-modal': {
      title: 'Partner With Us',
      subtitle: "Fill out the form below and we'll get back to you.",
      formAction: 'https://formspree.io/f/xyzbelvz'
    }
  };

  const content = modalContent[modalName];

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div 
        className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-2xl max-w-lg w-full mx-4 p-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={closeModal}
          className="absolute top-4 right-6 text-3xl text-gray-400 hover:text-gray-700 transition-colors"
        >
          &times;
        </button>

        {formSubmitted ? (
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h2>
            <p className="text-gray-700">Your submission has been received. Our team will get in touch with you shortly.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
              {content.title}
            </h2>
            <p className="text-gray-700 mb-6">{content.subtitle}</p>

            <form onSubmit={handleSubmit} action={content.formAction} method="POST" className="space-y-4">
              <input type="hidden" name="_subject" value={`New ${content.title} Request`} />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {modalName === 'partner-with-us-modal' ? 'Organization Name' : 'Company Name'}
                </label>
                <input 
                  type="text" 
                  name="company" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                <input 
                  type="tel" 
                  name="phone" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {modalName === 'get-started-modal' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">I'm interested in...</label>
                  <select 
                    name="interest" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option>Hiring & Recruitment</option>
                    <option>Secure Assessments</option>
                    <option>Learning & Development (LAC)</option>
                    <option>Mock Interviews</option>
                    <option>Other</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                <textarea 
                  name="message" 
                  rows="4" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// Add custom styles
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .perspective-1500 {
    perspective: 1500px;
  }
  .transform-style-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .animate-gradient {
    animation: gradient 15s ease infinite;
  }
`;
document.head.appendChild(style)