import { ResumeTemplate } from '../types/resume';

export const getResumeTemplates = (): ResumeTemplate[] => [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean, modern design perfect for corporate environments',
    category: 'Professional',
    difficulty: 'Easy',
    isPremium: false,
    sampleData: {
      personalInfo: {
        firstName: 'Sarah',
        lastName: 'Johnson',
        title: 'Senior Software Engineer',
        email: 'sarah.johnson@email.com',
        phone: '(555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/sarahjohnson',
        website: 'sarahjohnson.dev'
      },
      summary: 'Experienced software engineer with 8+ years in full-stack development. Proven track record of leading cross-functional teams and delivering scalable solutions. Passionate about creating user-centric applications and mentoring junior developers.',
      experience: [
        {
          id: '1',
          company: 'TechCorp Inc.',
          position: 'Senior Software Engineer',
          startDate: 'Jan 2020',
          endDate: 'Present',
          current: true,
          description: [
            'Led development of microservices architecture serving 1M+ users',
            'Mentored 5 junior developers and conducted code reviews',
            'Reduced application load time by 40% through performance optimization',
            'Collaborated with product managers to define technical requirements'
          ]
        },
        {
          id: '2',
          company: 'StartupXYZ',
          position: 'Full Stack Developer',
          startDate: 'Mar 2018',
          endDate: 'Dec 2019',
          current: false,
          description: [
            'Built responsive web applications using React and Node.js',
            'Implemented CI/CD pipelines reducing deployment time by 60%',
            'Designed RESTful APIs and database schemas',
            'Participated in agile development processes'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2014',
          endDate: '2018',
          gpa: '3.8'
        }
      ],
      skills: [
        { id: '1', name: 'JavaScript', level: 'Expert', category: 'Programming' },
        { id: '2', name: 'React', level: 'Expert', category: 'Frontend' },
        { id: '3', name: 'Node.js', level: 'Advanced', category: 'Backend' },
        { id: '4', name: 'Python', level: 'Advanced', category: 'Programming' },
        { id: '5', name: 'AWS', level: 'Intermediate', category: 'Cloud' },
        { id: '6', name: 'Docker', level: 'Intermediate', category: 'DevOps' }
      ],
      projects: [
        {
          id: '1',
          name: 'E-commerce Platform',
          description: 'Full-stack e-commerce solution with payment integration',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
          link: 'github.com/sarahjohnson/ecommerce'
        }
      ]
    }
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    description: 'Vibrant design perfect for creative professionals',
    category: 'Creative',
    difficulty: 'Medium',
    isPremium: false,
    sampleData: {
      personalInfo: {
        firstName: 'Michael',
        lastName: 'Chen',
        title: 'UX/UI Designer',
        email: 'michael.chen@email.com',
        phone: '(555) 987-6543',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/michaelchen',
        website: 'michaelchen.design'
      },
      summary: 'Creative UX/UI designer with 6+ years of experience crafting intuitive digital experiences. Skilled in user research, prototyping, and visual design. Passionate about solving complex problems through human-centered design.',
      experience: [
        {
          id: '1',
          company: 'Design Studio Pro',
          position: 'Senior UX Designer',
          startDate: 'Jun 2021',
          endDate: 'Present',
          current: true,
          description: [
            'Led UX design for mobile apps with 500K+ downloads',
            'Conducted user research and usability testing',
            'Created design systems and component libraries',
            'Collaborated with engineering teams on implementation'
          ]
        },
        {
          id: '2',
          company: 'Digital Agency',
          position: 'UI Designer',
          startDate: 'Jan 2019',
          endDate: 'May 2021',
          current: false,
          description: [
            'Designed responsive web interfaces for 20+ clients',
            'Created brand identities and marketing materials',
            'Worked with clients to understand design requirements',
            'Maintained design consistency across projects'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'Parsons School of Design',
          degree: 'Bachelor of Fine Arts',
          field: 'Communication Design',
          startDate: '2015',
          endDate: '2019'
        }
      ],
      skills: [
        { id: '1', name: 'Figma', level: 'Expert', category: 'Design' },
        { id: '2', name: 'Adobe Creative Suite', level: 'Expert', category: 'Design' },
        { id: '3', name: 'Sketch', level: 'Advanced', category: 'Design' },
        { id: '4', name: 'Prototyping', level: 'Advanced', category: 'Design' },
        { id: '5', name: 'User Research', level: 'Intermediate', category: 'Research' },
        { id: '6', name: 'HTML/CSS', level: 'Intermediate', category: 'Frontend' }
      ],
      projects: [
        {
          id: '1',
          name: 'Mobile Banking App',
          description: 'Complete UX/UI redesign for banking application',
          technologies: ['Figma', 'Principle', 'Adobe XD'],
          link: 'behance.net/michaelchen/banking-app'
        }
      ]
    }
  },
  {
    id: 'executive-premium',
    name: 'Executive Premium',
    description: 'Sophisticated design for senior-level positions',
    category: 'Executive',
    difficulty: 'Advanced',
    isPremium: true,
    sampleData: {
      personalInfo: {
        firstName: 'Emily',
        lastName: 'Rodriguez',
        title: 'Chief Technology Officer',
        email: 'emily.rodriguez@email.com',
        phone: '(555) 456-7890',
        location: 'Austin, TX',
        linkedin: 'linkedin.com/in/emilyrodriguez',
        website: 'emilyrodriguez.com'
      },
      summary: 'Results-driven technology executive with 15+ years of experience scaling engineering teams and driving digital transformation. Proven track record of leading organizations through rapid growth and complex technical challenges.',
      experience: [
        {
          id: '1',
          company: 'InnovateNow Corp',
          position: 'Chief Technology Officer',
          startDate: 'Jan 2022',
          endDate: 'Present',
          current: true,
          description: [
            'Led technology strategy for $100M+ revenue company',
            'Scaled engineering team from 50 to 200+ employees',
            'Architected cloud migration reducing costs by 30%',
            'Established data governance and security frameworks'
          ]
        },
        {
          id: '2',
          company: 'GrowthTech Solutions',
          position: 'VP of Engineering',
          startDate: 'Mar 2018',
          endDate: 'Dec 2021',
          current: false,
          description: [
            'Managed 8 engineering teams across multiple products',
            'Implemented agile methodologies improving delivery by 50%',
            'Led technical due diligence for 3 acquisitions',
            'Championed diversity and inclusion initiatives'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'Stanford University',
          degree: 'Master of Science',
          field: 'Computer Science',
          startDate: '2006',
          endDate: '2008'
        },
        {
          id: '2',
          institution: 'MIT',
          degree: 'Bachelor of Science',
          field: 'Electrical Engineering',
          startDate: '2002',
          endDate: '2006'
        }
      ],
      skills: [
        { id: '1', name: 'Strategic Planning', level: 'Expert', category: 'Leadership' },
        { id: '2', name: 'Team Leadership', level: 'Expert', category: 'Leadership' },
        { id: '3', name: 'Cloud Architecture', level: 'Advanced', category: 'Technical' },
        { id: '4', name: 'Data Analytics', level: 'Advanced', category: 'Technical' },
        { id: '5', name: 'Product Strategy', level: 'Advanced', category: 'Business' },
        { id: '6', name: 'Agile/Scrum', level: 'Expert', category: 'Process' }
      ],
      projects: [
        {
          id: '1',
          name: 'Digital Transformation Initiative',
          description: 'Led company-wide migration to cloud-native architecture',
          technologies: ['AWS', 'Kubernetes', 'Microservices'],
          link: 'case-study.com/digital-transformation'
        }
      ]
    }
  },
  {
    id: 'entry-level',
    name: 'Entry Level',
    description: 'Perfect for recent graduates and career changers',
    category: 'Entry Level',
    difficulty: 'Easy',
    isPremium: false,
    sampleData: {
      personalInfo: {
        firstName: 'Alex',
        lastName: 'Thompson',
        title: 'Junior Web Developer',
        email: 'alex.thompson@email.com',
        phone: '(555) 234-5678',
        location: 'Denver, CO',
        linkedin: 'linkedin.com/in/alexthompson',
        website: 'alexthompson.dev'
      },
      summary: 'Motivated recent graduate with a passion for web development and problem-solving. Strong foundation in modern web technologies and eager to contribute to a dynamic development team.',
      experience: [
        {
          id: '1',
          company: 'WebDev Bootcamp',
          position: 'Student Developer',
          startDate: 'Jan 2023',
          endDate: 'Jun 2023',
          current: false,
          description: [
            'Completed 6-month intensive full-stack development program',
            'Built 5 full-stack applications using modern technologies',
            'Collaborated on team projects using Git and Agile methodologies',
            'Mentored newer students in JavaScript fundamentals'
          ]
        },
        {
          id: '2',
          company: 'Local Coffee Shop',
          position: 'Barista',
          startDate: 'Sep 2021',
          endDate: 'Dec 2022',
          current: false,
          description: [
            'Provided excellent customer service in fast-paced environment',
            'Trained new employees on equipment and procedures',
            'Managed inventory and cash handling responsibilities',
            'Developed strong communication and problem-solving skills'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'University of Colorado',
          degree: 'Bachelor of Arts',
          field: 'Psychology',
          startDate: '2018',
          endDate: '2022'
        }
      ],
      skills: [
        { id: '1', name: 'HTML/CSS', level: 'Intermediate', category: 'Frontend' },
        { id: '2', name: 'JavaScript', level: 'Intermediate', category: 'Programming' },
        { id: '3', name: 'React', level: 'Beginner', category: 'Frontend' },
        { id: '4', name: 'Node.js', level: 'Beginner', category: 'Backend' },
        { id: '5', name: 'Git', level: 'Intermediate', category: 'Tools' },
        { id: '6', name: 'Problem Solving', level: 'Advanced', category: 'Soft Skills' }
      ],
      projects: [
        {
          id: '1',
          name: 'Task Management App',
          description: 'Full-stack task management application with user authentication',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
          link: 'github.com/alexthompson/task-manager'
        }
      ]
    }
  },
  {
    id: 'marketing-specialist',
    name: 'Marketing Specialist',
    description: 'Dynamic template for marketing professionals',
    category: 'Marketing',
    difficulty: 'Medium',
    isPremium: false,
    sampleData: {
      personalInfo: {
        firstName: 'Jessica',
        lastName: 'Martinez',
        title: 'Digital Marketing Manager',
        email: 'jessica.martinez@email.com',
        phone: '(555) 345-6789',
        location: 'Los Angeles, CA',
        linkedin: 'linkedin.com/in/jessicamartinez',
        website: 'jessicamartinez.marketing'
      },
      summary: 'Results-driven digital marketing professional with 7+ years of experience developing and executing comprehensive marketing strategies. Proven track record of increasing brand awareness and driving revenue growth through innovative campaigns.',
      experience: [
        {
          id: '1',
          company: 'MarketingPro Agency',
          position: 'Senior Digital Marketing Manager',
          startDate: 'Apr 2020',
          endDate: 'Present',
          current: true,
          description: [
            'Increased client revenue by 150% through strategic campaigns',
            'Managed $2M+ annual advertising budget across multiple channels',
            'Led team of 6 marketing specialists and freelancers',
            'Developed data-driven marketing strategies for B2B and B2C clients'
          ]
        },
        {
          id: '2',
          company: 'Growth Startup',
          position: 'Marketing Specialist',
          startDate: 'Jun 2018',
          endDate: 'Mar 2020',
          current: false,
          description: [
            'Grew social media following from 5K to 50K+ followers',
            'Created content marketing strategy increasing organic traffic by 300%',
            'Launched email marketing campaigns with 25% open rates',
            'Collaborated with sales team to optimize lead generation'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'UCLA',
          degree: 'Bachelor of Arts',
          field: 'Marketing',
          startDate: '2014',
          endDate: '2018'
        }
      ],
      skills: [
        { id: '1', name: 'Google Analytics', level: 'Expert', category: 'Analytics' },
        { id: '2', name: 'Facebook Ads', level: 'Expert', category: 'Advertising' },
        { id: '3', name: 'SEO/SEM', level: 'Advanced', category: 'Marketing' },
        { id: '4', name: 'Content Marketing', level: 'Advanced', category: 'Marketing' },
        { id: '5', name: 'HubSpot', level: 'Intermediate', category: 'Tools' },
        { id: '6', name: 'A/B Testing', level: 'Advanced', category: 'Analytics' }
      ],
      projects: [
        {
          id: '1',
          name: 'Brand Awareness Campaign',
          description: 'Multi-channel campaign increasing brand recognition by 200%',
          technologies: ['Google Ads', 'Facebook Ads', 'Instagram', 'Email Marketing'],
          link: 'portfolio.com/jessicamartinez/brand-campaign'
        }
      ]
    }
  },
  {
    id: 'healthcare-professional',
    name: 'Healthcare Professional',
    description: 'Clean, professional template for healthcare workers',
    category: 'Healthcare',
    difficulty: 'Medium',
    isPremium: true,
    sampleData: {
      personalInfo: {
        firstName: 'Dr. Robert',
        lastName: 'Kim',
        title: 'Emergency Medicine Physician',
        email: 'robert.kim@email.com',
        phone: '(555) 567-8901',
        location: 'Seattle, WA',
        linkedin: 'linkedin.com/in/drrobertkim',
        website: 'drrobertkim.com'
      },
      summary: 'Board-certified Emergency Medicine physician with 10+ years of experience in high-acuity emergency departments. Committed to providing exceptional patient care while leading medical teams and implementing quality improvement initiatives.',
      experience: [
        {
          id: '1',
          company: 'Seattle General Hospital',
          position: 'Attending Emergency Physician',
          startDate: 'Jul 2018',
          endDate: 'Present',
          current: true,
          description: [
            'Provide emergency medical care for 15,000+ patients annually',
            'Lead interdisciplinary teams in trauma and critical care situations',
            'Mentor emergency medicine residents and medical students',
            'Serve on hospital quality improvement and patient safety committees'
          ]
        },
        {
          id: '2',
          company: 'Regional Medical Center',
          position: 'Emergency Medicine Resident',
          startDate: 'Jul 2014',
          endDate: 'Jun 2018',
          current: false,
          description: [
            'Completed 4-year emergency medicine residency program',
            'Gained expertise in trauma, pediatric, and critical care medicine',
            'Participated in research projects and quality improvement initiatives',
            'Achieved Chief Resident position in final year'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'University of Washington School of Medicine',
          degree: 'Doctor of Medicine',
          field: 'Medicine',
          startDate: '2010',
          endDate: '2014'
        },
        {
          id: '2',
          institution: 'Harvard University',
          degree: 'Bachelor of Science',
          field: 'Biology',
          startDate: '2006',
          endDate: '2010'
        }
      ],
      skills: [
        { id: '1', name: 'Emergency Medicine', level: 'Expert', category: 'Clinical' },
        { id: '2', name: 'Trauma Care', level: 'Expert', category: 'Clinical' },
        { id: '3', name: 'Critical Care', level: 'Advanced', category: 'Clinical' },
        { id: '4', name: 'Team Leadership', level: 'Advanced', category: 'Leadership' },
        { id: '5', name: 'Quality Improvement', level: 'Intermediate', category: 'Administrative' },
        { id: '6', name: 'Medical Education', level: 'Advanced', category: 'Teaching' }
      ],
      projects: [
        {
          id: '1',
          name: 'ED Efficiency Initiative',
          description: 'Led project reducing patient wait times by 25%',
          technologies: ['Process Improvement', 'Data Analysis', 'Team Leadership'],
          link: 'medical-journal.com/ed-efficiency-study'
        }
      ]
    }
  },
  {
    id: 'minimalist-elegant',
    name: 'Minimalist Elegant',
    description: 'Clean, sophisticated design with subtle accents',
    category: 'Professional',
    difficulty: 'Easy',
    isPremium: false,
    sampleData: {
      personalInfo: {
        firstName: 'Emma',
        lastName: 'Watson',
        title: 'Product Manager',
        email: 'emma.watson@email.com',
        phone: '(555) 678-9012',
        location: 'Boston, MA',
        linkedin: 'linkedin.com/in/emmawatson',
        website: 'emmawatson.pm'
      },
      summary: 'Strategic product manager with 9+ years of experience driving product vision and execution. Expert in user research, data analysis, and cross-functional team leadership. Passionate about building products that solve real user problems.',
      experience: [
        {
          id: '1',
          company: 'ProductTech Inc.',
          position: 'Senior Product Manager',
          startDate: 'Mar 2021',
          endDate: 'Present',
          current: true,
          description: [
            'Led product strategy for B2B SaaS platform serving 10,000+ customers',
            'Increased user engagement by 45% through data-driven feature prioritization',
            'Managed product roadmap and coordinated with engineering, design, and marketing teams',
            'Conducted user interviews and A/B tests to validate product hypotheses'
          ]
        },
        {
          id: '2',
          company: 'StartupFlow',
          position: 'Product Manager',
          startDate: 'Jan 2019',
          endDate: 'Feb 2021',
          current: false,
          description: [
            'Launched 3 major product features resulting in 30% revenue growth',
            'Collaborated with UX designers to improve user onboarding flow',
            'Analyzed user behavior data to identify optimization opportunities',
            'Worked closely with sales team to understand customer needs'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'Harvard Business School',
          degree: 'Master of Business Administration',
          field: 'Strategy & Innovation',
          startDate: '2017',
          endDate: '2019'
        },
        {
          id: '2',
          institution: 'MIT',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2013',
          endDate: '2017'
        }
      ],
      skills: [
        { id: '1', name: 'Product Strategy', level: 'Expert', category: 'Product' },
        { id: '2', name: 'User Research', level: 'Advanced', category: 'Research' },
        { id: '3', name: 'Data Analysis', level: 'Advanced', category: 'Analytics' },
        { id: '4', name: 'Agile/Scrum', level: 'Expert', category: 'Process' },
        { id: '5', name: 'SQL', level: 'Intermediate', category: 'Technical' },
        { id: '6', name: 'Figma', level: 'Intermediate', category: 'Design' }
      ],
      projects: [
        {
          id: '1',
          name: 'Mobile App Redesign',
          description: 'Led complete redesign of mobile application increasing user retention by 60%',
          technologies: ['User Research', 'Prototyping', 'A/B Testing'],
          link: 'case-study.com/mobile-redesign'
        }
      ]
    }
  },
  {
    id: 'tech-innovator',
    name: 'Tech Innovator',
    description: 'Modern tech-focused design with bold accents',
    category: 'Technology',
    difficulty: 'Medium',
    isPremium: false,
    sampleData: {
      personalInfo: {
        firstName: 'David',
        lastName: 'Park',
        title: 'Full Stack Developer',
        email: 'david.park@email.com',
        phone: '(555) 789-0123',
        location: 'Portland, OR',
        linkedin: 'linkedin.com/in/davidpark',
        website: 'davidpark.tech'
      },
      summary: 'Innovative full-stack developer with expertise in modern web technologies and cloud architecture. Passionate about building scalable applications and contributing to open-source projects. Strong advocate for clean code and test-driven development.',
      experience: [
        {
          id: '1',
          company: 'CloudNative Solutions',
          position: 'Senior Full Stack Developer',
          startDate: 'Aug 2021',
          endDate: 'Present',
          current: true,
          description: [
            'Architected and developed microservices handling 100M+ requests daily',
            'Implemented CI/CD pipelines reducing deployment time from hours to minutes',
            'Led migration from monolith to microservices architecture',
            'Mentored junior developers and established coding standards'
          ]
        },
        {
          id: '2',
          company: 'DevCorp',
          position: 'Software Engineer',
          startDate: 'Jun 2019',
          endDate: 'Jul 2021',
          current: false,
          description: [
            'Developed React applications with TypeScript and GraphQL',
            'Built RESTful APIs using Node.js and PostgreSQL',
            'Implemented automated testing achieving 90% code coverage',
            'Collaborated in agile teams using Scrum methodology'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'Oregon State University',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2015',
          endDate: '2019'
        }
      ],
      skills: [
        { id: '1', name: 'TypeScript', level: 'Expert', category: 'Programming' },
        { id: '2', name: 'React/Next.js', level: 'Expert', category: 'Frontend' },
        { id: '3', name: 'Node.js/Express', level: 'Advanced', category: 'Backend' },
        { id: '4', name: 'GraphQL', level: 'Advanced', category: 'API' },
        { id: '5', name: 'Docker/Kubernetes', level: 'Advanced', category: 'DevOps' },
        { id: '6', name: 'AWS/GCP', level: 'Intermediate', category: 'Cloud' }
      ],
      projects: [
        {
          id: '1',
          name: 'Open Source Contribution',
          description: 'Core contributor to popular React component library with 50K+ stars',
          technologies: ['React', 'TypeScript', 'Storybook', 'Jest'],
          link: 'github.com/davidpark/react-components'
        }
      ]
    }
  },
  {
    id: 'sales-professional',
    name: 'Sales Professional',
    description: 'Results-driven design for sales and business development',
    category: 'Sales',
    difficulty: 'Medium',
    isPremium: false,
    sampleData: {
      personalInfo: {
        firstName: 'Rachel',
        lastName: 'Green',
        title: 'Senior Sales Manager',
        email: 'rachel.green@email.com',
        phone: '(555) 890-1234',
        location: 'Chicago, IL',
        linkedin: 'linkedin.com/in/rachelgreen',
        website: 'rachelgreen.sales'
      },
      summary: 'Results-driven sales professional with 10+ years of experience exceeding quotas and building lasting client relationships. Expert in consultative selling, account management, and team leadership. Proven track record of driving revenue growth in competitive markets.',
      experience: [
        {
          id: '1',
          company: 'Enterprise Solutions Corp',
          position: 'Senior Sales Manager',
          startDate: 'Jan 2020',
          endDate: 'Present',
          current: true,
          description: [
            'Exceeded annual sales quota by 125% for three consecutive years',
            'Managed portfolio of 50+ enterprise accounts worth $5M+ annually',
            'Led team of 8 sales representatives achieving 110% of team target',
            'Developed strategic partnerships resulting in 40% increase in referrals'
          ]
        },
        {
          id: '2',
          company: 'TechSales Inc.',
          position: 'Account Executive',
          startDate: 'Mar 2017',
          endDate: 'Dec 2019',
          current: false,
          description: [
            'Generated $2M+ in new business revenue within first 18 months',
            'Maintained 95% client retention rate through exceptional service',
            'Conducted product demonstrations and negotiated complex contracts',
            'Collaborated with marketing team on lead generation campaigns'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'Northwestern University',
          degree: 'Bachelor of Business Administration',
          field: 'Marketing',
          startDate: '2013',
          endDate: '2017'
        }
      ],
      skills: [
        { id: '1', name: 'Consultative Selling', level: 'Expert', category: 'Sales' },
        { id: '2', name: 'Account Management', level: 'Expert', category: 'Sales' },
        { id: '3', name: 'CRM (Salesforce)', level: 'Advanced', category: 'Tools' },
        { id: '4', name: 'Negotiation', level: 'Advanced', category: 'Sales' },
        { id: '5', name: 'Team Leadership', level: 'Advanced', category: 'Leadership' },
        { id: '6', name: 'Market Analysis', level: 'Intermediate', category: 'Analytics' }
      ],
      projects: [
        {
          id: '1',
          name: 'Enterprise Client Acquisition',
          description: 'Secured largest client in company history worth $1.2M annually',
          technologies: ['Strategic Planning', 'Relationship Building', 'Contract Negotiation'],
          link: 'case-study.com/enterprise-acquisition'
        }
      ]
    }
  },
  {
    id: 'academic-researcher',
    name: 'Academic Researcher',
    description: 'Scholarly design for academic and research positions',
    category: 'Academic',
    difficulty: 'Advanced',
    isPremium: true,
    sampleData: {
      personalInfo: {
        firstName: 'Dr. James',
        lastName: 'Wilson',
        title: 'Research Scientist',
        email: 'james.wilson@university.edu',
        phone: '(555) 901-2345',
        location: 'Cambridge, MA',
        linkedin: 'linkedin.com/in/drjameswilson',
        website: 'jameswilson.research.edu'
      },
      summary: 'Accomplished research scientist with 12+ years of experience in computational biology and machine learning. Published 25+ peer-reviewed papers and secured $2M+ in research funding. Passionate about applying AI to solve complex biological problems.',
      experience: [
        {
          id: '1',
          company: 'Harvard Medical School',
          position: 'Principal Research Scientist',
          startDate: 'Sep 2019',
          endDate: 'Present',
          current: true,
          description: [
            'Lead interdisciplinary research team of 12 scientists and graduate students',
            'Developed novel machine learning algorithms for drug discovery',
            'Published 15 high-impact papers in Nature, Science, and Cell',
            'Secured $1.5M NIH grant for computational biology research'
          ]
        },
        {
          id: '2',
          company: 'MIT Computer Science and Artificial Intelligence Laboratory',
          position: 'Postdoctoral Research Associate',
          startDate: 'Aug 2017',
          endDate: 'Aug 2019',
          current: false,
          description: [
            'Conducted research on deep learning applications in genomics',
            'Collaborated with industry partners on technology transfer',
            'Mentored 5 graduate students and 3 undergraduate researchers',
            'Presented findings at 10+ international conferences'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'Stanford University',
          degree: 'Ph.D.',
          field: 'Computational Biology',
          startDate: '2012',
          endDate: '2017'
        },
        {
          id: '2',
          institution: 'UC Berkeley',
          degree: 'Bachelor of Science',
          field: 'Bioinformatics',
          startDate: '2008',
          endDate: '2012'
        }
      ],
      skills: [
        { id: '1', name: 'Machine Learning', level: 'Expert', category: 'Technical' },
        { id: '2', name: 'Python/R', level: 'Expert', category: 'Programming' },
        { id: '3', name: 'Bioinformatics', level: 'Expert', category: 'Domain' },
        { id: '4', name: 'Statistical Analysis', level: 'Advanced', category: 'Analytics' },
        { id: '5', name: 'Grant Writing', level: 'Advanced', category: 'Academic' },
        { id: '6', name: 'Scientific Writing', level: 'Expert', category: 'Communication' }
      ],
      projects: [
        {
          id: '1',
          name: 'AI-Driven Drug Discovery Platform',
          description: 'Developed ML platform that reduced drug discovery time by 40%',
          technologies: ['TensorFlow', 'PyTorch', 'AWS', 'Docker'],
          link: 'nature.com/articles/drug-discovery-ai'
        }
      ]
    }
  },
  {
    id: 'finance-executive',
    name: 'Finance Executive',
    description: 'Professional design for finance and accounting roles',
    category: 'Finance',
    difficulty: 'Advanced',
    isPremium: true,
    sampleData: {
      personalInfo: {
        firstName: 'Catherine',
        lastName: 'Moore',
        title: 'Chief Financial Officer',
        email: 'catherine.moore@email.com',
        phone: '(555) 012-3456',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/catherinemoore',
        website: 'catherinemoore.finance'
      },
      summary: 'Strategic finance executive with 18+ years of experience leading financial operations for Fortune 500 companies. Expert in financial planning, risk management, and corporate strategy. Proven track record of driving profitability and operational efficiency.',
      experience: [
        {
          id: '1',
          company: 'Global Financial Services',
          position: 'Chief Financial Officer',
          startDate: 'Jan 2020',
          endDate: 'Present',
          current: true,
          description: [
            'Oversee financial operations for $2B+ revenue organization',
            'Led successful IPO raising $500M in capital',
            'Implemented cost optimization initiatives saving $50M annually',
            'Manage team of 45+ finance professionals across multiple regions'
          ]
        },
        {
          id: '2',
          company: 'Investment Banking Corp',
          position: 'VP of Finance',
          startDate: 'Jun 2016',
          endDate: 'Dec 2019',
          current: false,
          description: [
            'Managed financial planning and analysis for investment banking division',
            'Led M&A financial due diligence for transactions worth $5B+',
            'Developed financial models and risk assessment frameworks',
            'Collaborated with senior leadership on strategic initiatives'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'Wharton School, University of Pennsylvania',
          degree: 'Master of Business Administration',
          field: 'Finance',
          startDate: '2004',
          endDate: '2006'
        },
        {
          id: '2',
          institution: 'Columbia University',
          degree: 'Bachelor of Science',
          field: 'Economics',
          startDate: '2000',
          endDate: '2004'
        }
      ],
      skills: [
        { id: '1', name: 'Financial Planning & Analysis', level: 'Expert', category: 'Finance' },
        { id: '2', name: 'Risk Management', level: 'Expert', category: 'Finance' },
        { id: '3', name: 'Corporate Strategy', level: 'Advanced', category: 'Strategy' },
        { id: '4', name: 'M&A Due Diligence', level: 'Advanced', category: 'Finance' },
        { id: '5', name: 'Team Leadership', level: 'Expert', category: 'Leadership' },
        { id: '6', name: 'Financial Modeling', level: 'Expert', category: 'Technical' }
      ],
      projects: [
        {
          id: '1',
          name: 'IPO Leadership',
          description: 'Successfully led company through IPO process raising $500M',
          technologies: ['Financial Modeling', 'Due Diligence', 'Investor Relations'],
          link: 'sec.gov/ipo-filing-gfs-2020'
        }
      ]
    }
  },
  {
    id: 'startup-founder',
    name: 'Startup Founder',
    description: 'Dynamic design for entrepreneurs and startup leaders',
    category: 'Entrepreneurship',
    difficulty: 'Advanced',
    isPremium: true,
    sampleData: {
      personalInfo: {
        firstName: 'Marcus',
        lastName: 'Johnson',
        title: 'Founder & CEO',
        email: 'marcus.johnson@email.com',
        phone: '(555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/marcusjohnson',
        website: 'marcusjohnson.co'
      },
      summary: 'Serial entrepreneur with 15+ years of experience building and scaling technology companies. Successfully founded 3 startups with 2 exits totaling $150M+. Expert in product development, fundraising, and team building in fast-paced environments.',
      experience: [
        {
          id: '1',
          company: 'InnovateTech Solutions',
          position: 'Founder & CEO',
          startDate: 'Mar 2020',
          endDate: 'Present',
          current: true,
          description: [
            'Founded B2B SaaS company serving 500+ enterprise clients',
            'Raised $25M in Series A funding from top-tier VCs',
            'Scaled team from 5 to 85 employees across engineering, sales, and marketing',
            'Achieved $10M ARR within 3 years of launch'
          ]
        },
        {
          id: '2',
          company: 'DataFlow Analytics',
          position: 'Co-Founder & CTO',
          startDate: 'Jan 2016',
          endDate: 'Feb 2020',
          current: false,
          description: [
            'Co-founded analytics platform acquired by Fortune 500 company for $75M',
            'Led product development and technical strategy',
            'Built engineering team of 25+ developers',
            'Developed proprietary machine learning algorithms for data analysis'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'Stanford University',
          degree: 'Master of Science',
          field: 'Computer Science',
          startDate: '2006',
          endDate: '2008'
        },
        {
          id: '2',
          institution: 'UC Berkeley',
          degree: 'Bachelor of Science',
          field: 'Electrical Engineering',
          startDate: '2002',
          endDate: '2006'
        }
      ],
      skills: [
        { id: '1', name: 'Entrepreneurship', level: 'Expert', category: 'Business' },
        { id: '2', name: 'Fundraising', level: 'Expert', category: 'Business' },
        { id: '3', name: 'Product Strategy', level: 'Advanced', category: 'Product' },
        { id: '4', name: 'Team Building', level: 'Expert', category: 'Leadership' },
        { id: '5', name: 'Business Development', level: 'Advanced', category: 'Business' },
        { id: '6', name: 'Technical Leadership', level: 'Advanced', category: 'Technical' }
      ],
      projects: [
        {
          id: '1',
          name: 'Successful Exit - DataFlow Analytics',
          description: 'Built and sold analytics platform for $75M to Fortune 500 company',
          technologies: ['Machine Learning', 'Big Data', 'Cloud Architecture'],
          link: 'techcrunch.com/dataflow-acquisition-2020'
        }
      ]
    }
  },
  {
    id: 'entry-level-graduate',
    name: 'Entry-Level Graduate',
    description: 'Ideal for recent graduates seeking their first job.',
    category: 'Graduate',
    difficulty: 'Easy',
    isPremium: false,
    sampleData: {
      personalInfo: {
        firstName: 'Alex',
        lastName: 'Kim',
        title: 'Recent Graduate',
        email: 'alex.kim@email.com',
        phone: '(555) 321-9876',
        location: 'Chicago, IL',
        linkedin: 'linkedin.com/in/alexkim',
        website: ''
      },
      summary: 'Motivated and detail-oriented recent graduate with a strong academic background and internship experience. Eager to contribute and learn in a dynamic work environment.',
      experience: [
        {
          id: '1',
          company: 'GreenTech Internships',
          position: 'Marketing Intern',
          startDate: 'Jun 2023',
          endDate: 'Aug 2023',
          current: false,
          description: [
            'Assisted in planning and executing social media campaigns',
            'Conducted market research and competitor analysis',
            'Collaborated with team to develop promotional materials'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'University of Illinois',
          degree: 'Bachelor of Arts',
          field: 'Communications',
          startDate: '2019',
          endDate: '2023',
          gpa: '3.7'
        }
      ],
      skills: [
        { id: '1', name: 'Communication', level: 'Advanced', category: 'Soft Skill' },
        { id: '2', name: 'Microsoft Office', level: 'Intermediate', category: 'Technical' },
        { id: '3', name: 'Teamwork', level: 'Advanced', category: 'Soft Skill' }
      ],
      projects: [
        {
          id: '1',
          name: 'Campus Event Promotion',
          description: 'Organized and promoted a university-wide event with 500+ attendees.',
          technologies: ['Social Media', 'Event Planning'],
          link: ''
        }
      ]
    }
  },
  {
    id: 'it-specialist',
    name: 'IT Specialist',
    description: 'Perfect for IT professionals and tech support roles.',
    category: 'IT',
    difficulty: 'Medium',
    isPremium: false,
    sampleData: {
      personalInfo: {
        firstName: 'Priya',
        lastName: 'Singh',
        title: 'IT Support Specialist',
        email: 'priya.singh@email.com',
        phone: '(555) 654-3210',
        location: 'Dallas, TX',
        linkedin: 'linkedin.com/in/priyasingh',
        website: ''
      },
      summary: 'Experienced IT support specialist with a proven track record of troubleshooting and resolving technical issues. Strong communicator and team player.',
      experience: [
        {
          id: '1',
          company: 'TechHelp Solutions',
          position: 'IT Support Specialist',
          startDate: 'Feb 2021',
          endDate: 'Present',
          current: true,
          description: [
            'Resolved 30+ daily technical support tickets with a 98% satisfaction rate',
            'Installed and configured hardware and software for 200+ users',
            'Trained staff on cybersecurity best practices'
          ]
        },
        {
          id: '2',
          company: 'City Library',
          position: 'IT Assistant',
          startDate: 'Jan 2020',
          endDate: 'Jan 2021',
          current: false,
          description: [
            'Maintained computer labs and network infrastructure',
            'Assisted patrons with technology questions',
            'Documented IT procedures and inventory'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'Texas A&M University',
          degree: 'Bachelor of Science',
          field: 'Information Technology',
          startDate: '2016',
          endDate: '2020',
          gpa: '3.5'
        }
      ],
      skills: [
        { id: '1', name: 'Windows Administration', level: 'Advanced', category: 'Technical' },
        { id: '2', name: 'Networking', level: 'Intermediate', category: 'Technical' },
        { id: '3', name: 'Customer Service', level: 'Advanced', category: 'Soft Skill' }
      ],
      projects: [
        {
          id: '1',
          name: 'Network Upgrade',
          description: 'Upgraded office network infrastructure to improve speed and reliability.',
          technologies: ['Cisco', 'Ethernet'],
          link: ''
        }
      ]
    }
  },
  {
    id: 'sales-professional',
    name: 'Sales Professional',
    description: 'Optimized for sales and marketing job applications.',
    category: 'Sales',
    difficulty: 'Easy',
    isPremium: false,
    sampleData: {
      personalInfo: {
        firstName: 'Jordan',
        lastName: 'Lee',
        title: 'Sales Representative',
        email: 'jordan.lee@email.com',
        phone: '(555) 789-1234',
        location: 'Miami, FL',
        linkedin: 'linkedin.com/in/jordanlee',
        website: ''
      },
      summary: 'Results-oriented sales professional with 4+ years of experience exceeding targets and building client relationships. Skilled in negotiation and closing deals.',
      experience: [
        {
          id: '1',
          company: 'Sunshine Electronics',
          position: 'Sales Representative',
          startDate: 'May 2021',
          endDate: 'Present',
          current: true,
          description: [
            'Achieved 120% of annual sales quota in 2023',
            'Developed new business with 30+ B2B clients',
            'Presented product demos at trade shows'
          ]
        },
        {
          id: '2',
          company: 'RetailMart',
          position: 'Sales Associate',
          startDate: 'Jun 2019',
          endDate: 'Apr 2021',
          current: false,
          description: [
            'Provided excellent customer service',
            'Trained new staff on sales techniques',
            'Managed inventory and merchandising'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'Florida State University',
          degree: 'Bachelor of Business Administration',
          field: 'Marketing',
          startDate: '2015',
          endDate: '2019',
          gpa: '3.4'
        }
      ],
      skills: [
        { id: '1', name: 'Negotiation', level: 'Advanced', category: 'Sales' },
        { id: '2', name: 'CRM Software', level: 'Intermediate', category: 'Technical' },
        { id: '3', name: 'Lead Generation', level: 'Advanced', category: 'Sales' }
      ],
      projects: [
        {
          id: '1',
          name: 'Client Onboarding Program',
          description: 'Developed a new onboarding process that improved client retention by 15%.',
          technologies: ['CRM', 'Salesforce'],
          link: ''
        }
      ]
    }
  },
  {
    id: 'academic-cv',
    name: 'Academic CV',
    description: 'Structured for research, teaching, and academic positions.',
    category: 'Academic',
    difficulty: 'Advanced',
    isPremium: true,
    sampleData: {
      personalInfo: {
        firstName: 'Dr. Maria',
        lastName: 'Gonzalez',
        title: 'Assistant Professor of Biology',
        email: 'maria.gonzalez@email.com',
        phone: '(555) 246-1357',
        location: 'Boston, MA',
        linkedin: 'linkedin.com/in/mariagonzalez',
        website: 'mariagonzalez.bio'
      },
      summary: 'Biology researcher and educator with 10+ years of experience in molecular genetics. Published author and conference speaker.',
      experience: [
        {
          id: '1',
          company: 'Harvard University',
          position: 'Assistant Professor',
          startDate: 'Sep 2018',
          endDate: 'Present',
          current: true,
          description: [
            'Taught undergraduate and graduate courses in genetics',
            'Supervised 5 PhD students',
            'Secured $500K in research grants'
          ]
        },
        {
          id: '2',
          company: 'MIT',
          position: 'Postdoctoral Researcher',
          startDate: 'Sep 2015',
          endDate: 'Aug 2018',
          current: false,
          description: [
            'Published 8 peer-reviewed articles',
            'Presented at 10+ international conferences',
            'Collaborated on NIH-funded projects'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'Stanford University',
          degree: 'PhD',
          field: 'Molecular Biology',
          startDate: '2010',
          endDate: '2015',
          gpa: ''
        },
        {
          id: '2',
          institution: 'University of Madrid',
          degree: 'Bachelor of Science',
          field: 'Biology',
          startDate: '2006',
          endDate: '2010',
          gpa: ''
        }
      ],
      skills: [
        { id: '1', name: 'Research', level: 'Expert', category: 'Academic' },
        { id: '2', name: 'Grant Writing', level: 'Advanced', category: 'Academic' },
        { id: '3', name: 'Teaching', level: 'Advanced', category: 'Academic' }
      ],
      projects: [
        {
          id: '1',
          name: 'Genetics Research Grant',
          description: 'Principal investigator for NIH-funded genetics research.',
          technologies: ['PCR', 'CRISPR'],
          link: ''
        }
      ]
    }
  },
  {
    id: 'healthcare-professional',
    name: 'Healthcare Professional',
    description: 'Tailored for nurses, doctors, and healthcare workers.',
    category: 'Healthcare',
    difficulty: 'Medium',
    isPremium: false,
    sampleData: {
      personalInfo: {
        firstName: 'Samuel',
        lastName: 'Nguyen',
        title: 'Registered Nurse',
        email: 'samuel.nguyen@email.com',
        phone: '(555) 852-9637',
        location: 'Seattle, WA',
        linkedin: 'linkedin.com/in/samuelnguyen',
        website: ''
      },
      summary: 'Compassionate registered nurse with 6+ years of experience in hospital and clinical settings. Skilled in patient care, triage, and team leadership.',
      experience: [
        {
          id: '1',
          company: 'Seattle General Hospital',
          position: 'Registered Nurse',
          startDate: 'Mar 2018',
          endDate: 'Present',
          current: true,
          description: [
            'Provided care for up to 20 patients per shift',
            'Trained and supervised 8 junior nurses',
            'Managed emergency room triage and patient flow'
          ]
        },
        {
          id: '2',
          company: 'Evergreen Clinic',
          position: 'Nurse',
          startDate: 'Jul 2016',
          endDate: 'Feb 2018',
          current: false,
          description: [
            'Assisted in outpatient procedures',
            'Educated patients on medication and aftercare',
            'Maintained accurate patient records'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'University of Washington',
          degree: 'Bachelor of Science in Nursing',
          field: 'Nursing',
          startDate: '2012',
          endDate: '2016',
          gpa: '3.6'
        }
      ],
      skills: [
        { id: '1', name: 'Patient Care', level: 'Expert', category: 'Healthcare' },
        { id: '2', name: 'Triage', level: 'Advanced', category: 'Healthcare' },
        { id: '3', name: 'Team Leadership', level: 'Advanced', category: 'Soft Skill' }
      ],
      projects: [
        {
          id: '1',
          name: 'Patient Education Initiative',
          description: 'Developed a patient education program that improved medication adherence.',
          technologies: ['Education', 'Healthcare'],
          link: ''
        }
      ]
    }
  }
];