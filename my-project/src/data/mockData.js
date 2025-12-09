export const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Manila",
    postedDate: "2023-05-15",
    salary: "₱120,000 - ₱150,000",
    type: "Full-time",
    category: "Technology",
    description:
      "We are looking for an experienced Frontend Developer to join our team. You will be responsible for developing user interfaces and ensuring a great user experience.",
    requirements: [
      "5+ years of React experience",
      "Strong JavaScript skills",
      "CSS expertise",
    ],
    responsibilities: [
      "Develop user interfaces",
      "Collaborate with design team",
      "Optimize applications for performance",
    ],
    website: "https://techcorp.com",
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "GrowthHackers",
    location: "Quezon City",
    postedDate: "2023-05-18",
    salary: "₱90,000 - ₱110,000",
    type: "Full-time",
    category: "Marketing",
    description:
      "Seeking a creative Marketing Manager to drive our brand growth and execute marketing campaigns.",
    requirements: [
      "3+ years marketing experience",
      "Strong analytical skills",
      "Social media expertise",
    ],
    responsibilities: [
      "Develop marketing strategies",
      "Manage campaigns",
      "Analyze performance metrics",
    ],
    website: "https://growthhackers.com",
  },
  {
    id: 3,
    title: "Registered Nurse",
    company: "HealthFirst",
    location: "Cebu City",
    postedDate: "2023-06-01",
    salary: "₱25,000 - ₱35,000",
    type: "Full-time",
    category: "Healthcare",
    description:
      "We are hiring Registered Nurses for our hospital facilities. Must have a valid PRC license.",
    requirements: ["PRC License", "2+ years experience", "Compassionate care"],
    responsibilities: [
      "Patient care",
      "Administer medications",
      "Monitor patient progress",
    ],
    website: "https://healthfirst.com",
  },
  {
    id: 4,
    title: "Finance Analyst",
    company: "MoneyMatters",
    location: "Makati",
    postedDate: "2023-06-10",
    salary: "₱40,000 - ₱55,000",
    type: "Full-time",
    category: "Finance",
    description:
      "Looking for a Finance Analyst to help with budgeting, forecasting, and reporting.",
    requirements: [
      "Bachelor’s degree in Finance",
      "Excel expertise",
      "Analytical skills",
    ],
    responsibilities: ["Financial reporting", "Budget tracking", "Forecasting"],
    website: "https://moneymatters.com",
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Taguig",
    postedDate: "2023-06-15",
    salary: "₱35,000 - ₱50,000",
    type: "Full-time",
    category: "Design",
    description:
      "Creative UI/UX Designer needed to design intuitive user interfaces.",
    requirements: [
      "Adobe XD / Figma",
      "Portfolio required",
      "3+ years experience",
    ],
    responsibilities: [
      "Design user interfaces",
      "Create prototypes",
      "Collaborate with developers",
    ],
    website: "https://designhub.com",
  },
  {
    id: 6,
    title: "Customer Service Representative",
    company: "HelpDesk Co",
    location: "Davao City",
    postedDate: "2023-06-20",
    salary: "₱18,000 - ₱25,000",
    type: "Full-time",
    category: "Customer Service",
    description:
      "We are hiring friendly Customer Service Reps to handle client inquiries.",
    requirements: [
      "Good communication skills",
      "1+ year experience",
      "Patience and empathy",
    ],
    responsibilities: [
      "Answer customer queries",
      "Resolve complaints",
      "Maintain records",
    ],
    website: "https://helpdeskco.com",
  },
  // Add additional jobs as needed, using locations like Baguio, Iloilo City, Cagayan de Oro, Pasig, or Other
];

export const mockCategories = [
  { id: 1, name: "Technology", icon: "💻" },
  { id: 2, name: "Marketing", icon: "📢" },
  { id: 3, name: "Healthcare", icon: "🏥" },
  { id: 4, name: "Finance", icon: "💰" },
  { id: 5, name: "Education", icon: "🎓" },
  { id: 6, name: "Design", icon: "🎨" },
  { id: 7, name: "Sales", icon: "💼" },
  { id: 8, name: "Customer Service", icon: "👥" },
];

export const mockCompanies = [
  {
    id: 1,
    name: "TechCorp",
    description:
      "Leading technology company specializing in AI and cloud solutions.",
    website: "https://techcorp.com",
    logo: "TC",
  },
  {
    id: 2,
    name: "GrowthHackers",
    description:
      "Digital marketing agency focused on data-driven growth strategies.",
    website: "https://growthhackers.com",
    logo: "GH",
  },
  // Add 8 more company objects
];

export const mockUsers = [
  // 5 job seekers
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    type: "jobSeeker",
    appliedJobs: [1, 3],
    resume: null,
  },
  // 3 employers
  {
    id: 6,
    name: "Jane Smith",
    email: "jane@example.com",
    type: "employer",
    postedJobs: [1, 2],
  },
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frontend Developer",
    content:
      "This platform helped me land my dream job in just two weeks. The search functionality is incredibly intuitive!",
    company: "TechCorp",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Manager",
    content:
      "As an employer, I've found top talent through this site. The quality of candidates has been outstanding.",
    company: "GrowthHackers",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer",
    content:
      "The job recommendations are spot on. I found my perfect match that aligns with my skills and career goals.",
    company: "DesignHub",
  },
];
