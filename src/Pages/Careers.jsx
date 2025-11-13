import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Search, ChevronDown, MessageCircle, Send, Linkedin } from 'lucide-react';

// Job Descriptions Data
const jobDescriptions = {
  "backend-nodejs": {
    title: "Backend Developer (Node.js)",
    description: "Join our backend team to design, build, and maintain scalable, secure, and high-performance server-side applications using Node.js, Express, and modern database technologies.",
    responsibilities: [
      "Design and implement scalable backend services and microservices.",
      "Develop and maintain RESTful APIs for our frontend applications.",
      "Manage database schemas and optimize queries (MongoDB/PostgreSQL).",
      "Ensure security and data protection are implemented at all levels.",
      "Write unit and integration tests to ensure code quality.",
      "Deploy and manage applications using Docker and CI/CD pipelines."
    ],
    qualifications: [
      "1-2 years of experience in backend development with Node.js and Express.",
      "Proficient with NoSQL (MongoDB) or SQL (PostgreSQL) databases.",
      "Strong understanding of REST API design and microservice architecture.",
      "Experience with Docker and containerization.",
      "Familiarity with cloud platforms (AWS, Azure, or GCP) is a plus.",
      "Strong problem-solving and analytical skills."
    ]
  },
  "fullstack-mern-mean": {
    title: "Full Stack Developer (MERN/MEAN)",
    description: "We're looking for a versatile MERN/MEAN stack developer to work on both frontend and backend components. You'll be responsible for the entire development lifecycle, from concept to deployment.",
    responsibilities: [
      "Develop and maintain web applications using the MERN or MEAN stack.",
      "Build responsive frontend components using React.js or Angular.",
      "Design and implement backend APIs using Node.js and Express.",
      "Manage database operations with MongoDB and Mongoose.",
      "Collaborate with the team to define and ship new features.",
      "Write clean, maintainable, and well-documented code."
    ],
    qualifications: [
      "1-2 years of proven experience as a MERN or MEAN Stack Developer.",
      "Strong proficiency in MongoDB, Express, Node.js.",
      "Strong proficiency in *either* React.js *or* Angular (TypeScript).",
      "Experience with state management libraries (e.g., Redux, Context API, RxJS).",
      "Familiarity with Git and agile development methodologies.",
      "Ability to work independently and manage project priorities."
    ]
  },
  "cloud-aws": {
    title: "Cloud Engineer (AWS)",
    description: "Seeking an experienced AWS Cloud Engineer to manage our cloud infrastructure. You will be responsible for deployment, automation, monitoring, and ensuring the security and scalability of our services.",
    responsibilities: [
      "Design, deploy, and manage scalable and secure infrastructure on AWS.",
      "Implement and manage CI/CD pipelines for automated deployments.",
      "Monitor system performance, reliability, and security.",
      "Manage AWS services (EC2, S3, RDS, Lambda, VPC, IAM).",
      "Implement Infrastructure as Code (IaC) using Terraform or CloudFormation.",
      "Respond to and resolve infrastructure-related incidents."
    ],
    qualifications: [
      "0-2 years of hands-on experience with AWS services.",
      "Strong knowledge of CI/CD principles and tools (e.g., Jenkins, GitLab CI).",
      "Experience with Infrastructure as Code (Terraform or CloudFormation).",
      "Understanding of networking and security principles in the cloud.",
      "Scripting skills (e.g., Bash, Python) are a plus.",
      "AWS Certification (e.g., Solutions Architect, DevOps Engineer) is a strong plus."
    ]
  },
  "ml-engineer": {
    title: "Machine Learning Engineer",
    description: "At Xeta Solutions, the Machine Learning Engineer will play a key role in building and optimizing intelligent systems that power our AI-driven recruitment and testing products — including resume scoring, automated screening, and analytics for HireWithUS and Testify.",
    responsibilities: [
      "Develop and train ML models for resume scoring, candidate shortlisting, and application screening.",
      "Design algorithms for data validation (e.g., CGPA and ID verification).",
      "Build dashboards and predictive analytics for recruiters and admins.",
      "Collaborate with backend teams to integrate ML APIs with production systems.",
      "Continuously improve model performance through data-driven feedback loops."
    ],
    qualifications: [
      "Strong Python programming skills (NumPy, Pandas, Scikit-learn, TensorFlow/PyTorch).",
      "Experience in building regression/classification models and evaluation metrics.",
      "Familiarity with REST API integration for ML models.",
      "Understanding of data preprocessing, feature engineering, and model optimization."
    ],
    preferred: [
      "Bachelor's or Master's in Computer Science, AI, or related field.",
      "Experience with AWS SageMaker, MLflow, or DataRobot is a plus.",
      "Prior experience in HRTech or EdTech ML projects is highly desirable."
    ]
  },
  "cv-engineer": {
    title: "Computer Vision Engineer",
    description: "Join our AI security team to advance Testify – Secure Test, a lockdown testing application that uses real-time proctoring and anomaly detection. You will design and deploy computer vision systems that ensure fairness, security, and integrity in online examinations.",
    responsibilities: [
      "Develop face detection and behavioral anomaly models for AI proctoring.",
      "Implement real-time monitoring for multiple faces, mobile usage, or abnormal activities.",
      "Build and optimize vision pipelines for the Testify desktop client (Windows/macOS).",
      "Work with ML and backend teams to integrate detection outputs into test reports.",
      "Analyze proctoring data and improve detection precision through continuous retraining."
    ],
    qualifications: [
      "Expertise in OpenCV, Deep Learning (CNNs), and TensorFlow/PyTorch.",
      "Experience with MediaPipe, YOLO, or face recognition libraries.",
      "Understanding of video stream processing and real-time inference.",
      "Strong analytical and problem-solving abilities."
    ],
    preferred: [
      "Experience working on AI proctoring or security-based vision systems.",
      "Familiarity with edge inference optimization (ONNX / TensorRT).",
      "Bachelor's or Master's in Computer Vision, AI, or similar domain."
    ]
  },
  "nlp-engineer": {
    title: "NLP Engineer (Conversational AI & Text Evaluation)",
    description: "The NLP Engineer will design conversational systems and automated text evaluation models for our Testify – LAC and Mock Interview platforms. You'll be creating AI-driven chatbots and intelligent scoring systems that assess communication and writing skills.",
    responsibilities: [
      "Develop NLP models for chatbots, interview simulations, and essay evaluation.",
      "Use LLMs to generate feedback and insights from textual answers.",
      "Implement question-answering models for learning and training modules.",
      "Integrate NLP APIs into web and learning platforms.",
      "Continuously fine-tune models based on user interactions and feedback."
    ],
    qualifications: [
      "Proficiency in Python, spaCy, Transformers (HuggingFace), and NLTK.",
      "Experience with OpenAI APIs, LangChain, or RAG pipelines.",
      "Strong grasp of text preprocessing, sentiment analysis, and semantic similarity.",
      "Knowledge of cloud-based NLP deployment (AWS, GCP)."
    ],
    preferred: [
      "Experience in chatbots, learning assessment, or HR communication evaluation.",
      "Familiarity with multilingual NLP models (English + Indian languages).",
      "Bachelor's or Master's in Computer Science, AI, or Computational Linguistics."
    ]
  },
  "product-manager": {
    title: "Product Manager (SaaS / EdTech / Recruitment Tech)",
    description: "As a Product Manager at Xeta Solutions, you'll define the roadmap for our integrated platforms — HireWithUS, Testify, and Testify-LAC. You will work cross-functionally to prioritize features, improve user experience, and align business goals with technology outcomes.",
    responsibilities: [
      "Define and execute product strategy across multiple Xeta platforms.",
      "Conduct user research and competitor analysis to guide roadmap decisions.",
      "Collaborate with engineering, design, and marketing teams for feature rollouts.",
      "Track KPIs for product adoption, user retention, and conversion.",
      "Maintain documentation and coordinate sprint planning with technical teams."
    ],
    qualifications: [
      "Strong analytical and decision-making skills.",
      "Experience with Agile / Scrum methodologies.",
      "Familiarity with product analytics tools (Mixpanel, GA4, Hotjar).",
      "Excellent communication and stakeholder management skills."
    ],
    preferred: [
      "Bachelor's degree in Engineering, Business, or related field.",
      "Prior experience in SaaS, EdTech, or HRTech product management.",
      "Understanding of UX/UI best practices and basic technical architecture."
    ]
  },
  "qa-engineer": {
    title: "QA Automation Engineer",
    description: "You will be responsible for ensuring top-notch quality, security, and performance across all Xeta Solutions platforms — including web portals, desktop clients, and AI-driven assessment modules.",
    responsibilities: [
      "Design and implement automated test scripts for APIs, UI, and workflows.",
      "Perform regression, integration, and cross-browser testing.",
      "Validate proctoring modules, application lockdown features, and performance benchmarks.",
      "Identify, document, and report bugs; ensure timely resolution through collaboration with developers.",
      "Maintain continuous testing pipelines integrated with CI/CD systems."
    ],
    qualifications: [
      "Hands-on experience with Selenium, Cypress, or Playwright.",
      "API testing knowledge using Postman or RestAssured.",
      "Experience in Jenkins, Git, or similar CI tools.",
      "Strong understanding of web, desktop, and mobile testing methodologies."
    ],
    preferred: [
      "Bachelor's in Computer Science, IT, or related field.",
      "Familiarity with test management tools (JIRA, TestRail).",
      "Knowledge of security and performance testing tools."
    ]
  }
};

// Job Cards Data
const jobsData = [
  {
    id: "backend-nodejs",
    title: "Backend Developer (Node.js)",
    type: "In-Person",
    department: "engineering",
    description: "Join our backend team to design, build, and maintain scalable, secure, and high-performance server-side applications using Node.js, Express, and modern database technologies.",
    requirements: [
      "1-2 years of Node.js & Express experience",
      "Proficient with MongoDB or PostgreSQL",
      "Strong understanding of REST APIs & microservices",
      "Experience with Docker and CI/CD"
    ]
  },
  {
    id: "fullstack-mern-mean",
    title: "Full Stack Developer (MERN/MEAN)",
    type: "In-Person",
    department: "engineering",
    description: "We're looking for a versatile full-stack developer (MERN/MEAN) to work on both frontend and backend components, from concept to deployment.",
    requirements: [
      "1-2 years of MERN or MEAN stack experience",
      "Strong problem-solving skills",
      "Proficient in React or Angular",
      "Experience with Git and agile methodologies"
    ]
  },
  {
    id: "cloud-aws",
    title: "Cloud Engineer (AWS)",
    type: "In-Person",
    department: "cloud",
    description: "Seeking an experienced AWS Cloud Engineer to manage our cloud infrastructure, focusing on deployment, automation, monitoring, and ensuring security and scalability.",
    requirements: [
      "0-2 years of experience with AWS services",
      "Strong knowledge of CI/CD pipelines",
      "Experience with IaC (Terraform, CloudFormation)",
      "AWS Certification is a strong plus"
    ]
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    type: "Remote / Hybrid",
    department: "ai",
    description: "Build and optimize intelligent systems for our AI-driven recruitment and testing products, including resume scoring, automated screening, and analytics.",
    requirements: [
      "Strong Python (NumPy, Pandas, Scikit-learn)",
      "Experience with TensorFlow/PyTorch",
      "Familiarity with REST API integration",
      "B.S. or M.S. in Computer Science or AI"
    ]
  },
  {
    id: "cv-engineer",
    title: "Computer Vision Engineer",
    type: "Remote / Hybrid",
    department: "ai",
    description: "Join our AI security team to advance Testify – Secure Test. You will design and deploy computer vision systems for real-time proctoring and anomaly detection.",
    requirements: [
      "Expertise in OpenCV, Deep Learning (CNNs)",
      "Experience with MediaPipe, YOLO, or face recognition",
      "Real-time video stream processing",
      "Experience with AI proctoring systems is a plus"
    ]
  },
  {
    id: "nlp-engineer",
    title: "NLP Engineer",
    type: "Remote / Hybrid",
    department: "ai",
    description: "Design conversational systems and automated text evaluation models for our Testify – LAC and Mock Interview platforms, creating AI-driven chatbots and intelligent scoring systems.",
    requirements: [
      "Proficiency in Python, spaCy, Transformers",
      "Experience with OpenAI APIs, LangChain, or RAG",
      "Strong grasp of text preprocessing",
      "Experience in chatbots or learning assessment"
    ]
  },
  {
    id: "product-manager",
    title: "Product Manager",
    type: "Hybrid / On-site",
    department: "product",
    description: "Define the roadmap for our integrated platforms. You will work cross-functionally to prioritize features, improve UX, and align business goals with technology outcomes.",
    requirements: [
      "Experience with Agile / Scrum methodologies",
      "Familiarity with product analytics tools",
      "Excellent communication skills",
      "Prior experience in SaaS, EdTech, or HRTech"
    ]
  },
  {
    id: "qa-engineer",
    title: "QA Automation Engineer",
    type: "Remote / Hybrid",
    department: "qa",
    description: "Ensure top-notch quality, security, and performance across all Xeta Solutions platforms, including web portals, desktop clients, and AI-driven assessment modules.",
    requirements: [
      "Experience with Selenium, Cypress, or Playwright",
      "API testing knowledge (Postman, RestAssured)",
      "Experience in Jenkins, Git, or similar CI tools",
      "Strong understanding of testing methodologies"
    ]
  }
];

// Modal Component
const Modal = ({ isOpen, onClose, children, maxWidth = "max-w-lg" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className={`relative w-[90%] ${maxWidth} max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-10`}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, rgba(20, 15, 40, 0.8), rgba(30, 20, 60, 0.7))',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          animation: 'fadeInScale 0.3s ease-out'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-400 hover:text-white text-4xl font-bold transition-colors z-[1010]"
        >
          <X className="w-8 h-8" />
        </button>
        {children}
      </div>
    </div>
  );
};

// Job Card Component
const JobCard = ({ job, onViewDetails, onApply }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col justify-between h-full p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-lg dark:backdrop-blur-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-purple-500/10 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h3>
        <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full mb-4 ${
          job.type === 'In-Person' 
            ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300' 
            : job.type === 'Remote / Hybrid'
            ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300'
            : 'bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300'
        }`}>
          {job.type}
        </span>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{job.description}</p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 mb-6">
          {job.requirements.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => onViewDetails(job.id)}
          className="w-full bg-transparent dark:bg-white/10 dark:hover:bg-white/20 text-blue-600 dark:text-blue-300 border border-blue-600 dark:border-blue-400 px-6 py-3 rounded-lg font-semibold text-lg shadow-sm hover:bg-blue-50 transition-all duration-300"
        >
          View Details
        </button>
        <button
          onClick={() => onApply(job.title)}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

// Main App Component
const Careers = () => {
  const [theme, setTheme] = useState('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Modals
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [jdModalOpen, setJdModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  
  // Chatbot
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChatInitialized, setIsChatInitialized] = useState(false);
  const chatBodyRef = useRef(null);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  };

  // Filter jobs
  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Open JD Modal
  const handleViewDetails = (jobId) => {
    setSelectedJobId(jobId);
    setJdModalOpen(true);
  };

  // Open Apply Modal
  const handleApply = (jobTitle) => {
    setSelectedJobTitle(jobTitle);
    setApplyModalOpen(true);
    setJdModalOpen(false);
  };

  // Chatbot initialization
  useEffect(() => {
    if (chatOpen && !isChatInitialized) {
      const initialGreeting = "Hi there! I'm Xeta AI. How can I help you with your job search at Xeta Solutions today?";
      setChatMessages([{ sender: 'ai', text: initialGreeting }]);
      setIsChatInitialized(true);
    }
  }, [chatOpen, isChatInitialized]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Handle chat send
  const handleSendMessage = async () => {
    if (chatInput.trim() === '' || isTyping) return;

    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = "Thank you for your interest! Please check our open positions above and feel free to apply. If you have specific questions about a role, I'm here to help!";
      setChatMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#f8faff] dark:bg-[#0d0a1b] text-slate-800 dark:text-slate-300 transition-all duration-500 overflow-x-hidden font-['Inter_Tight','Manrope',sans-serif]">
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        body.dark {
          background-color: #0d0a1b;
          background-image: radial-gradient(at 0% 0%, hsla(253, 50%, 15%, 0.4) 0px, transparent 50%),
                            radial-gradient(at 100% 0%, hsla(280, 50%, 15%, 0.4) 0px, transparent 50%),
                            radial-gradient(at 100% 100%, hsla(300, 50%, 15%, 0.4) 0px, transparent 50%),
                            radial-gradient(at 0% 100%, hsla(240, 50%, 15%, 0.4) 0px, transparent 50%);
          color: #cbd5e1;
        }
        body.light {
          background-color: #f8faff;
          color: #1e293b;
        }
        .gradient-text {
          background-image: linear-gradient(90deg, #a78bfa, #c084fc, #f0abfc);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .light .gradient-text {
          background-image: linear-gradient(90deg, #6d28d9, #9333ea, #c026d3);
        }
        .light .modal-content-bg {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(245, 245, 255, 0.7)) !important;
        }
        #ai-chat-body::-webkit-scrollbar {
          width: 6px;
        }
        #ai-chat-body::-webkit-scrollbar-track {
          background: transparent;
        }
        #ai-chat-body::-webkit-scrollbar-thumb {
          background-color: rgba(128, 128, 128, 0.5);
          border-radius: 3px;
        }
      `}</style>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="index.html" className="flex items-center">
            <img 
              src="https://res.cloudinary.com/dpz44zf0z/image/upload/v1760704788/XETA_SOLUTIONS_LOGO_bcsbwh.png" 
              alt="Xeta Solutions Logo" 
              className="h-8 md:h-10"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="index.html#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">About</a>
            <a href="index.html#products" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Products</a>
            <a href="index.html#workflow" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Workflow</a>
            <a href="index.html#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Features</a>
            <a href="index.html#mock-interviews" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Mock Interviews</a>
            <a href="#" className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</a>
            <button 
              onClick={() => setDemoModalOpen(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:bg-blue-700 transition-transform hover:scale-105"
            >
              Book a Demo
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-800 dark:text-gray-300">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-xl">
            <a href="index.html#about" className="block px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">About</a>
            <a href="index.html#products" className="block px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Products</a>
            <a href="index.html#workflow" className="block px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Workflow</a>
            <a href="index.html#features" className="block px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Features</a>
            <a href="index.html#mock-interviews" className="block px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Mock Interviews</a>
            <a href="#" className="block px-6 py-3 text-blue-600 dark:text-blue-400 font-semibold bg-gray-100 dark:bg-gray-700">Careers</a>
            <button onClick={() => { setDemoModalOpen(true); setMobileMenuOpen(false); }} className="block w-full text-left px-6 py-4 bg-blue-600 text-white font-medium hover:bg-blue-700">
              Book a Demo
            </button>
            <div className="px-6 py-3">
              <button onClick={toggleTheme} className="w-full flex justify-between items-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md">
                <span>Toggle Theme</span>
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Careers Section */}
        <section className="py-24 pt-32 min-h-screen">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-semibold uppercase gradient-text">Work With Us</span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                Join Our Team
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                We're looking for passionate, innovative individuals to help us build the future of talent and technology. Explore our open roles below.
              </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by job title (e.g., 'Engineer')"
                  className="w-full px-5 py-3 pl-12 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="relative flex-shrink-0 md:w-1/3">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-5 py-3 pr-10 rounded-lg appearance-none bg-white/50 dark:bg-white/5 backdrop-blur-sm text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                >
                  <option value="all" className="text-black">All Departments</option>
                  <option value="engineering" className="text-black">Engineering</option>
                  <option value="ai" className="text-black">AI</option>
                  <option value="product" className="text-black">Product</option>
                  <option value="qa" className="text-black">Quality Assurance</option>
                  <option value="cloud" className="text-black">Cloud</option>
                </select>
                <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Job Grid */}
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onViewDetails={handleViewDetails}
                    onApply={handleApply}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">No Jobs Found</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                  Your search and filter criteria did not match any open positions. Try broadening your search.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 py-16 relative z-10 border-t border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Column 1 */}
            <div>
              <a href="index.html" className="flex items-center">
                <img src="https://res.cloudinary.com/dpz44zf0z/image/upload/v1760704788/XETA_SOLUTIONS_LOGO_bcsbwh.png" alt="Xeta Solutions Logo" className="h-8 md:h-10" />
              </a>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Innovating Talent & Technology.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="https://www.linkedin.com/company/109604953/" className="text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Products</h4>
              <ul className="space-y-3">
                <li><a href="www.testify-lac.com/HireWithUS.html" className="hover:text-blue-600 dark:hover:text-white transition-colors">HireWithUS</a></li>
                <li><a href="testify-lac.com" className="hover:text-blue-600 dark:hover:text-white transition-colors">Testify – Secure Test</a></li>
                <li><a href="testify-lac.com" className="hover:text-blue-600 dark:hover:text-white transition-colors">Testify – LAC</a></li>
                <li><a href="www.testify-lac.com/student/quiz-join.html" className="hover:text-blue-600 dark:hover:text-white transition-colors">QuizCom</a></li>
                <li><a href="index.html#mock-interviews" className="hover:text-blue-600 dark:hover:text-white transition-colors">Mock Interviews</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="index.html#about" className="hover:text-blue-600 dark:hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</a></li>
                <li><button onClick={() => setPartnerModalOpen(true)} className="hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer">Partners</button></li>
                <li><a href="mailto:support@xetasolutions.in" className="hover:text-blue-600 dark:hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Get in Touch</h4>
              <ul className="space-y-3">
                <li><a href="mailto:support@xetasolutions.in" className="hover:text-blue-600 dark:hover:text-white transition-colors">support@xetasolutions.in</a></li>
                <li><a href="mailto:sales@xetasolutions.in" className="hover:text-blue-600 dark:hover:text-white transition-colors">sales@xetasolutions.in</a></li>
                <li><a href="tel:+919010408899" className="hover:text-blue-600 dark:hover:text-white transition-colors">+91 9010408899</a></li>
                <li>
                  <button onClick={() => setDemoModalOpen(true)} className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-white font-semibold transition-colors">
                    Request a Demo
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-300 dark:border-gray-700/50 mt-12 pt-8 text-center">
            <p className="text-gray-500 dark:text-gray-500">&copy; {currentYear} Xeta Solutions. All rights reserved.</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Hiring & Recruitment was managed by{' '}
              <a href="https://www.testify-lac.com/HireWithUS.html" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                HireWithUS
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Bubble */}
      <div className="fixed bottom-8 right-8 z-[900]">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2),0_8px_10px_-6px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_-5px_rgba(160,80,255,0.2),0_8px_10px_-6px_rgba(160,80,255,0.1)] hover:shadow-2xl"
        >
          {chatOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
        </button>
      </div>

      {/* AI Chatbot Window */}
      {chatOpen && (
        <div className="fixed bottom-28 right-8 z-[890] w-[90vw] max-w-md h-[60vh] max-h-[500px] bg-white/70 dark:bg-black/70 backdrop-blur-lg border border-gray-300 dark:border-white/20 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out transform scale-100 opacity-100 origin-bottom-right">
          {/* Chat Header */}
          <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/20">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Ask Xeta AI</h3>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div ref={chatBodyRef} id="ai-chat-body" className="flex-grow p-4 space-y-4 overflow-y-auto">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'rounded-br-none bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' 
                    : 'rounded-bl-none bg-blue-100 dark:bg-blue-900/50 text-gray-800 dark:text-gray-200'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg rounded-bl-none bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200">
                  <p className="text-sm">...</p>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-white/20">
            <div className="relative">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                disabled={isTyping}
                className="w-full px-4 py-3 pr-12 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Demo Modal */}
      <Modal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)}>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">Book a Demo</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">Fill out the form below and we'll get back to you.</p>
        <form action="https://formspree.io/f/xyzbelvz" method="POST" className="space-y-4">
          <input type="hidden" name="_subject" value="New Demo Request from Xeta Website" />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input type="text" name="name" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Work Email</label>
            <input type="email" name="email" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
            <input type="text" name="company" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number (Optional)</label>
            <input type="tel" name="phone" className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message (Optional)</label>
            <textarea name="message" rows="4" className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
            Submit Request
          </button>
        </form>
      </Modal>

      {/* Partner Modal */}
      <Modal isOpen={partnerModalOpen} onClose={() => setPartnerModalOpen(false)}>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">Partner With Us</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">Fill out the form below and we'll get back to you.</p>
        <form action="https://formspree.io/f/xyzbelvz" method="POST" className="space-y-4">
          <input type="hidden" name="_subject" value="New Partnership Inquiry from Xeta Website" />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input type="text" name="name" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Organization Name</label>
            <input type="text" name="organization" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Work Email</label>
            <input type="email" name="email" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number (Optional)</label>
            <input type="tel" name="phone" className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">How would you like to partner? (Optional)</label>
            <textarea name="message" rows="4" className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
            Send Partnership Request
          </button>
        </form>
      </Modal>

      {/* Job Description Modal */}
      <Modal isOpen={jdModalOpen} onClose={() => setJdModalOpen(false)} maxWidth="max-w-3xl">
        {selectedJobId && jobDescriptions[selectedJobId] && (
          <>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 gradient-text">
              {jobDescriptions[selectedJobId].title}
            </h2>
            <div className="text-gray-700 dark:text-gray-300 text-left space-y-4">
              <p>{jobDescriptions[selectedJobId].description}</p>
              
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">Responsibilities:</h4>
              <ul className="list-disc list-inside pl-2 space-y-2">
                {jobDescriptions[selectedJobId].responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">Required Skills:</h4>
              <ul className="list-disc list-inside pl-2 space-y-2">
                {jobDescriptions[selectedJobId].qualifications.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              
              {jobDescriptions[selectedJobId].preferred && (
                <>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">Preferred Qualifications:</h4>
                  <ul className="list-disc list-inside pl-2 space-y-2">
                    {jobDescriptions[selectedJobId].preferred.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <button
              onClick={() => handleApply(jobDescriptions[selectedJobId].title)}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 mt-8"
            >
              Apply for this Job
            </button>
          </>
        )}
      </Modal>

      {/* Apply Modal */}
      <Modal isOpen={applyModalOpen} onClose={() => setApplyModalOpen(false)} maxWidth="max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 gradient-text">
          Apply for: {selectedJobTitle}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">Please fill out the application form below.</p>
        
        <form action="https://formspree.io/f/xkgpleag" method="POST" className="space-y-4">
          <input type="hidden" name="job_title" value={selectedJobTitle} />
          <input type="hidden" name="_subject" value="New Job Application Received!" />

          {/* Personal Information */}
          <fieldset className="border border-gray-300/50 dark:border-white/20 rounded-lg p-4 pt-2">
            <legend className="text-gray-900 dark:text-white font-semibold text-lg px-2">Personal Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                <input type="text" name="first_name" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                <input type="text" name="last_name" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input type="email" name="email" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
                <input type="tel" name="mobile" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
                <input type="date" name="dob" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Location</label>
                <input type="text" name="current_location" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Resume Link</label>
              <input type="url" name="resume_link" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" placeholder="https://www.your-drive.com/resume.pdf" />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Please provide a public link (e.g., Google Drive, Dropbox) to your resume.</p>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Certificates Link (Optional)</label>
              <input type="url" name="certificates_link" className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" placeholder="https://www.your-drive.com/certificates.pdf" />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Please merge all certificates into one file (e.g., a single PDF) and provide the link.</p>
            </div>
          </fieldset>

          {/* Education & Experience */}
          <fieldset className="border border-gray-300/50 dark:border-white/20 rounded-lg p-4 pt-2">
            <legend className="text-gray-900 dark:text-white font-semibold text-lg px-2">Education & Experience</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">College</label>
                <input type="text" name="college" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Roll Number</label>
                <input type="text" name="roll_number" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experience (Job/Internship)</label>
              <textarea name="experience" rows="3" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" placeholder="e.g., 2 years as Frontend Developer at XYZ"></textarea>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Skills</label>
              <textarea name="skills" rows="3" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" placeholder="e.g., React, Node.js, AWS, Python"></textarea>
            </div>
          </fieldset>

          {/* Application Details */}
          <fieldset className="border border-gray-300/50 dark:border-white/20 rounded-lg p-4 pt-2">
            <legend className="text-gray-900 dark:text-white font-semibold text-lg px-2">Application Details</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ready to Join in (days)</label>
                <input type="number" name="ready_to_join_days" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Salary (LPA)</label>
                <input type="text" name="current_salary" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" placeholder="e.g., 5 or N/A" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expected Salary (LPA)</label>
                <input type="text" name="expected_salary" required className="mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" placeholder="e.g., 7" />
              </div>
            </div>
          </fieldset>

          <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 mt-6">
            Submit Application
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Careers;