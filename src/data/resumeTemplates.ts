import { ResumeTemplate } from '../types/resume';

const resumeTemplatesBase: ResumeTemplate[] = [
  {
    "id": "modern-professional",
    "name": "Modern Professional",
    "description": "Clean, modern design perfect for corporate environments",
    "category": "Professional",
    "difficulty": "Easy",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Sarah",
        "lastName": "Johnson",
        "title": "Senior Full Stack Software Engineer",
        "email": "sarah.johnson@email.com",
        "phone": "+1 (555) 123-4567",
        "location": "San Francisco, CA",
        "linkedin": "linkedin.com/in/sarahjohnson",
        "website": "sarahjohnson.dev"
      },
      "summary": "Results-driven Senior Full Stack Engineer with 8+ years of expertise architecting high-scale microservices and enterprise web applications. Proven track record of scaling platforms to 1.5M+ active users, optimizing cloud latency by 45%, and leading cross-functional engineering squads of 12+ developers.",
      "experience": [
        {
          "id": "1",
          "company": "TechCorp Cloud Solutions",
          "position": "Senior Software Engineer & Tech Lead",
          "startDate": "Jan 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Architected distributed event-driven microservices processing 1.5M+ daily transactions with 99.99% uptime.",
            "Spearheaded frontend migration to Next.js 14 and React Server Components, improving Core Web Vitals and cutting page load times by 42%.",
            "Orchestrated CI/CD pipelines via GitHub Actions and Docker, reducing deployment turnaround cycle time by 65%.",
            "Mentored 8 mid-level engineers and established rigorous unit/E2E testing standards, raising code coverage from 62% to 94%."
          ]
        },
        {
          "id": "2",
          "company": "Nexus Digital Systems",
          "position": "Full Stack Software Engineer",
          "startDate": "Mar 2018",
          "endDate": "Dec 2020",
          "current": false,
          "description": [
            "Engineered RESTful and GraphQL APIs in Node.js and TypeScript, handling 400k+ concurrent user requests.",
            "Optimized PostgreSQL query indexes and Redis caching layers, slashing median API latency from 280ms down to sub-45ms.",
            "Integrated Stripe billing and automated invoice workflows, driving $3.2M in annual recurring subscription revenue.",
            "Delivered 14 enterprise-grade product features ahead of schedule across 6 agile release sprints."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "University of California, Berkeley",
          "degree": "Bachelor of Science",
          "field": "Computer Science & Software Engineering",
          "startDate": "2014",
          "endDate": "2018",
          "gpa": "3.85"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "TypeScript",
          "level": "Expert",
          "category": "Programming Languages"
        },
        {
          "id": "2",
          "name": "JavaScript (ES6+)",
          "level": "Expert",
          "category": "Programming Languages"
        },
        {
          "id": "3",
          "name": "React.js / Next.js",
          "level": "Expert",
          "category": "Frontend Development"
        },
        {
          "id": "4",
          "name": "Node.js / Express",
          "level": "Expert",
          "category": "Backend & APIs"
        },
        {
          "id": "5",
          "name": "GraphQL & REST APIs",
          "level": "Advanced",
          "category": "Backend & APIs"
        },
        {
          "id": "6",
          "name": "PostgreSQL & MongoDB",
          "level": "Advanced",
          "category": "Databases"
        },
        {
          "id": "7",
          "name": "AWS (ECS, S3, Lambda)",
          "level": "Advanced",
          "category": "Cloud & DevOps"
        },
        {
          "id": "8",
          "name": "Docker & Kubernetes",
          "level": "Intermediate",
          "category": "Cloud & DevOps"
        },
        {
          "id": "9",
          "name": "CI/CD & GitHub Actions",
          "level": "Advanced",
          "category": "Cloud & DevOps"
        },
        {
          "id": "10",
          "name": "Jest & Playwright",
          "level": "Advanced",
          "category": "Testing & QA"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Enterprise Cloud Commerce Platform",
          "description": "Engineered high-throughput SaaS e-commerce engine with real-time inventory sync, processing $10M+ in annual gross sales volume with 99.98% reliability.",
          "technologies": [
            "React",
            "Next.js",
            "Node.js",
            "PostgreSQL",
            "Redis",
            "AWS"
          ],
          "link": "github.com/sarahjohnson/cloud-commerce"
        },
        {
          "id": "2",
          "name": "Real-Time Analytics Dashboard",
          "description": "Built distributed telemetry streaming dashboard ingesting 50k events/sec using WebSockets and Apache Kafka with sub-100ms UI visualization updates.",
          "technologies": [
            "TypeScript",
            "React",
            "Kafka",
            "TailwindCSS",
            "Docker"
          ],
          "link": "github.com/sarahjohnson/telemetry-stream"
        }
      ],
      "customSections": [
        {
          "id": "certifications",
          "title": "Certifications & Credentials",
          "items": [
            {
              "id": "c1",
              "name": "AWS Certified Solutions Architect – Associate",
              "description": "Amazon Web Services, Validated cloud architecture mastery",
              "date": "2023"
            },
            {
              "id": "c2",
              "name": "Certified Kubernetes Application Developer (CKAD)",
              "description": "Cloud Native Computing Foundation (CNCF)",
              "date": "2022"
            }
          ]
        }
      ]
    }
  },
  {
    "id": "creative-designer",
    "name": "Creative Designer",
    "description": "Vibrant design perfect for creative professionals",
    "category": "Creative",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Michael",
        "lastName": "Chen",
        "title": "Lead UI/UX & Product Experience Designer",
        "email": "michael.chen@email.com",
        "phone": "+1 (555) 987-6543",
        "location": "New York, NY",
        "linkedin": "linkedin.com/in/michaelchen-ux",
        "website": "michaelchen.design"
      },
      "summary": "Award-winning Lead UX/UI Designer with 7+ years of experience elevating product experiences for Fortune 500 brands and high-growth SaaS startups. Spearheaded design systems utilized by 85+ engineers and boosted end-user conversion rates by 54% across web and mobile platforms.",
      "experience": [
        {
          "id": "1",
          "company": "Aura Studio Innovations",
          "position": "Lead Product Designer",
          "startDate": "Feb 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Spearheaded end-to-end design transformation for flagship fintech platform with 850k+ active mobile subscribers.",
            "Engineered comprehensive multi-brand Figma design system reducing design-to-engineering handoff latency by 48%.",
            "Conducted 60+ moderated usability tests and qualitative UX research sessions, driving user retention up by 32%.",
            "Collaborated with VP of Product and executive stakeholders to define product roadmap and visual brand direction."
          ]
        },
        {
          "id": "2",
          "company": "PixelForge Interactive",
          "position": "Senior UX/UI Designer",
          "startDate": "Jun 2018",
          "endDate": "Jan 2021",
          "current": false,
          "description": [
            "Redesigned B2B analytics portal, increasing trial-to-paid conversion rates by 54% and generating $1.8M in net new ARR.",
            "Created responsive web wireframes, high-fidelity prototypes, and interactive micro-animations in Principle and Figma.",
            "Partnered with frontend developers to ensure WCAG 2.1 AA accessibility compliance across 250+ responsive UI screens.",
            "Mentored 4 junior designers in user-centered design methodologies, visual hierarchy, and customer journey mapping."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Rhode Island School of Design (RISD)",
          "degree": "Bachelor of Fine Arts",
          "field": "Graphic & Interactive Product Design",
          "startDate": "2014",
          "endDate": "2018",
          "gpa": "3.90"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Figma & FigJam",
          "level": "Expert",
          "category": "Design Tools"
        },
        {
          "id": "2",
          "name": "Design Systems & Tokens",
          "level": "Expert",
          "category": "UI Design"
        },
        {
          "id": "3",
          "name": "User Research & Testing",
          "level": "Expert",
          "category": "UX Strategy"
        },
        {
          "id": "4",
          "name": "Wireframing & Prototyping",
          "level": "Expert",
          "category": "UX Strategy"
        },
        {
          "id": "5",
          "name": "Interaction & Micro-Animation",
          "level": "Advanced",
          "category": "UI Design"
        },
        {
          "id": "6",
          "name": "Information Architecture",
          "level": "Advanced",
          "category": "UX Strategy"
        },
        {
          "id": "7",
          "name": "WCAG 2.1 Accessibility",
          "level": "Advanced",
          "category": "UI Design"
        },
        {
          "id": "8",
          "name": "HTML5 & CSS3/Tailwind",
          "level": "Intermediate",
          "category": "Technical Skills"
        },
        {
          "id": "9",
          "name": "Adobe Creative Suite",
          "level": "Advanced",
          "category": "Design Tools"
        },
        {
          "id": "10",
          "name": "A/B Testing & Mixpanel",
          "level": "Advanced",
          "category": "Analytics"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Nova Banking Mobile Application",
          "description": "Architected complete mobile banking experience from zero to 1M+ downloads with 4.8-star App Store rating and 40% reduction in customer onboarding drop-offs.",
          "technologies": [
            "Figma",
            "Protopie",
            "Design System",
            "User Testing"
          ],
          "link": "michaelchen.design/nova-banking"
        },
        {
          "id": "2",
          "name": "OmniFlow SaaS Design System",
          "description": "Created 300+ accessible component token library adopted by 14 product squads, accelerating feature delivery velocity by 35%.",
          "technologies": [
            "Figma Tokens",
            "Storybook",
            "Zeroheight",
            "Accessibility"
          ],
          "link": "michaelchen.design/omniflow"
        }
      ]
    }
  },
  {
    "id": "executive-premium",
    "name": "Executive Premium",
    "description": "Sophisticated design for senior-level positions",
    "category": "Executive",
    "difficulty": "Hard",
    "isPremium": true,
    "sampleData": {
      "personalInfo": {
        "firstName": "David",
        "lastName": "Reynolds",
        "title": "Vice President of Engineering / Technology Executive",
        "email": "david.reynolds@email.com",
        "phone": "+1 (555) 456-7890",
        "location": "Seattle, WA",
        "linkedin": "linkedin.com/in/davidreynolds-exec",
        "website": "davidreynolds.tech"
      },
      "summary": "Visionary Technology Executive and VP of Engineering with 15+ years of success building, scaling, and leading global engineering organizations of 120+ engineers. Proven track record managing $25M+ annual engineering budgets, spearheading digital cloud modernization, and scaling SaaS revenue from $10M to $120M ARR.",
      "experience": [
        {
          "id": "1",
          "company": "Vanguard Enterprise Technologies",
          "position": "Vice President of Engineering",
          "startDate": "Jan 2020",
          "endDate": "Present",
          "current": true,
          "description": [
            "Directed global engineering division of 120+ software architects, engineers, and DevOps leaders across 4 international hubs.",
            "Orchestrated multi-year cloud modernization strategy, slashing annual infrastructure operational costs by $4.2M (-38%).",
            "Scaled flagship enterprise B2B platform to support 25M+ global users with 99.995% SLA availability.",
            "Instituted engineering OKR frameworks and talent retention programs, reducing voluntary turnover from 24% to under 6%."
          ]
        },
        {
          "id": "2",
          "company": "Apex Cloud Systems",
          "position": "Director of Software Engineering",
          "startDate": "Jun 2015",
          "endDate": "Dec 2019",
          "current": false,
          "description": [
            "Grew engineering organization from 25 to 80+ engineers while maintaining high delivery velocity across 8 agile product lines.",
            "Spearheaded enterprise ISO 27001 and SOC 2 Type II compliance audits, unlocking $45M in Fortune 500 enterprise pipeline revenue.",
            "Championed continuous integration and automated test harnesses, accelerating release frequency from monthly to 15+ deployments/day.",
            "Managed annual departmental P&L budget of $18M with 100% financial adherence and zero budget overruns."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Stanford University",
          "degree": "Master of Science",
          "field": "Computer Science & Distributed Systems",
          "startDate": "2008",
          "endDate": "2010",
          "gpa": "3.92"
        },
        {
          "id": "2",
          "institution": "University of Washington",
          "degree": "Bachelor of Science",
          "field": "Computer Engineering",
          "startDate": "2004",
          "endDate": "2008",
          "gpa": "3.88"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Executive Leadership & P&L",
          "level": "Expert",
          "category": "Executive Strategy"
        },
        {
          "id": "2",
          "name": "Cloud Architecture & AWS/GCP",
          "level": "Expert",
          "category": "Technical Architecture"
        },
        {
          "id": "3",
          "name": "Enterprise Agile & DevOps",
          "level": "Expert",
          "category": "Engineering Operations"
        },
        {
          "id": "4",
          "name": "SOC 2 & Cybersecurity",
          "level": "Advanced",
          "category": "Governance & Security"
        },
        {
          "id": "5",
          "name": "Talent Acquisition & Mentorship",
          "level": "Expert",
          "category": "Organizational Leadership"
        },
        {
          "id": "6",
          "name": "Microservices & Distributed Systems",
          "level": "Expert",
          "category": "Technical Architecture"
        },
        {
          "id": "7",
          "name": "Strategic Roadmap Planning",
          "level": "Expert",
          "category": "Executive Strategy"
        },
        {
          "id": "8",
          "name": "Vendor & Contract Negotiation",
          "level": "Advanced",
          "category": "Financial Management"
        },
        {
          "id": "9",
          "name": "Cross-Functional Stakeholder Mgmt",
          "level": "Expert",
          "category": "Executive Strategy"
        },
        {
          "id": "10",
          "name": "CI/CD & Site Reliability (SRE)",
          "level": "Advanced",
          "category": "Engineering Operations"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Enterprise Cloud Migration & Modernization",
          "description": "Led multi-year transition of monolithic legacy architectures to Kubernetes microservices, achieving $4.2M annual savings and 99.995% uptime.",
          "technologies": [
            "AWS",
            "Kubernetes",
            "Terraform",
            "Kafka",
            "Datadog"
          ],
          "link": "davidreynolds.tech/cloud-migration"
        }
      ]
    }
  },
  {
    "id": "entry-level",
    "name": "Entry Level",
    "description": "Perfect for recent graduates and career changers",
    "category": "Entry Level",
    "difficulty": "Easy",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Alex",
        "lastName": "Thompson",
        "title": "Junior Full Stack Software Developer",
        "email": "alex.thompson@email.com",
        "phone": "+1 (555) 234-5678",
        "location": "Denver, CO",
        "linkedin": "linkedin.com/in/alexthompson-dev",
        "website": "alexthompson.dev"
      },
      "summary": "Energetic and analytical Junior Software Developer with a BS in Computer Science and hands-on experience developing modern full-stack web applications using React, TypeScript, Node.js, and SQL. Built 5+ production-grade applications with 95%+ test coverage and optimized API response times by 35%.",
      "experience": [
        {
          "id": "1",
          "company": "Peak Software Labs",
          "position": "Software Developer Intern",
          "startDate": "Jun 2023",
          "endDate": "Dec 2023",
          "current": false,
          "description": [
            "Engineered reusable React UI components with Tailwind CSS for customer dashboard serving 45k+ active monthly users.",
            "Developed RESTful API endpoints in Node.js and PostgreSQL, improving backend query response speeds by 35%.",
            "Implemented automated unit and integration tests using Jest, raising repository test coverage from 68% to 92%.",
            "Collaborated in daily agile standups and completed 28 sprint user stories with zero critical regression defects."
          ]
        },
        {
          "id": "2",
          "company": "University IT & Web Services",
          "position": "Junior Web Assistant",
          "startDate": "Aug 2022",
          "endDate": "May 2023",
          "current": false,
          "description": [
            "Maintained and optimized 12 departmental university portals supporting 18k+ students and faculty members.",
            "Resolved 150+ technical support tickets and debugged cross-browser accessibility issues, improving page speed by 40%.",
            "Automated student roster CSV data parsing scripts in Python, eliminating 10+ hours of manual data entry weekly."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "University of Colorado Boulder",
          "degree": "Bachelor of Science",
          "field": "Computer Science",
          "startDate": "2019",
          "endDate": "2023",
          "gpa": "3.78"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "JavaScript (ES6+) & TypeScript",
          "level": "Advanced",
          "category": "Languages"
        },
        {
          "id": "2",
          "name": "React.js & Redux Toolkit",
          "level": "Advanced",
          "category": "Frontend"
        },
        {
          "id": "3",
          "name": "Node.js & Express",
          "level": "Intermediate",
          "category": "Backend"
        },
        {
          "id": "4",
          "name": "PostgreSQL & MongoDB",
          "level": "Intermediate",
          "category": "Databases"
        },
        {
          "id": "5",
          "name": "Python & Data Structures",
          "level": "Intermediate",
          "category": "Languages"
        },
        {
          "id": "6",
          "name": "Git & GitHub Workflows",
          "level": "Advanced",
          "category": "Tools"
        },
        {
          "id": "7",
          "name": "REST APIs & JSON",
          "level": "Advanced",
          "category": "Backend"
        },
        {
          "id": "8",
          "name": "HTML5 & CSS3/Tailwind",
          "level": "Expert",
          "category": "Frontend"
        },
        {
          "id": "9",
          "name": "Jest & Unit Testing",
          "level": "Intermediate",
          "category": "Testing"
        },
        {
          "id": "10",
          "name": "Docker Fundamentals",
          "level": "Beginner",
          "category": "DevOps"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "TaskFlow Collaborative Kanban App",
          "description": "Built full-stack project management app with real-time WebSocket syncing, user authentication, and drag-and-drop boards supporting 1,200+ registered test users.",
          "technologies": [
            "React",
            "TypeScript",
            "Node.js",
            "Socket.IO",
            "PostgreSQL"
          ],
          "link": "github.com/alexthompson/taskflow"
        },
        {
          "id": "2",
          "name": "AI Study Notes Summarizer",
          "description": "Engineered web tool integrating OpenAI API to summarize PDF lecture notes, processing 300+ documents with 98% user satisfaction.",
          "technologies": [
            "Next.js",
            "TailwindCSS",
            "OpenAI API",
            "Vercel"
          ],
          "link": "github.com/alexthompson/study-summarizer"
        }
      ]
    }
  },
  {
    "id": "marketing-specialist",
    "name": "Marketing Specialist",
    "description": "Dynamic template for marketing professionals",
    "category": "Marketing",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Emma",
        "lastName": "Rodriguez",
        "title": "Senior Growth & Digital Marketing Manager",
        "email": "emma.rodriguez@email.com",
        "phone": "+1 (555) 345-6789",
        "location": "Austin, TX",
        "linkedin": "linkedin.com/in/emmarodriguez-mktg",
        "website": "emmarodriguez.co"
      },
      "summary": "Data-driven Senior Growth Marketing Manager with 8+ years of expertise scaling multi-channel acquisition funnels, performance marketing, and product-led growth. Managed $4.5M+ in annual ad budgets, generated over $18M in attributed pipeline revenue, and slashed customer acquisition cost (CAC) by 38%.",
      "experience": [
        {
          "id": "1",
          "company": "ScaleUp SaaS Technologies",
          "position": "Senior Growth Marketing Manager",
          "startDate": "Jan 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Spearheaded global paid acquisition campaigns across Google Ads, LinkedIn, and Meta with $4.5M annual budget, generating $18.2M in pipeline revenue.",
            "Optimized B2B conversion funnels and landing pages via A/B testing in Optimizely, boosting lead conversion rates by 46%.",
            "Implemented automated lifecycle marketing drip workflows in HubSpot, raising email click-through rates from 2.4% to 6.8%.",
            "Managed a high-performing growth marketing team of 6 specialists across content, SEO, and paid media channels."
          ]
        },
        {
          "id": "2",
          "company": "Elevate Digital Agency",
          "position": "Digital Marketing Strategist",
          "startDate": "Aug 2017",
          "endDate": "Dec 2020",
          "current": false,
          "description": [
            "Executed technical SEO strategies and targeted keyword campaigns that boosted organic monthly traffic from 80k to 520k visitors (+550%).",
            "Decreased blended customer acquisition cost (CAC) by 38% while improving marketing qualified lead (MQL) conversion velocity by 28%.",
            "Produced bi-weekly multi-touch attribution reports for C-suite leadership using Google Analytics 4, Tableau, and SQL.",
            "Negotiated sponsorship partnerships with 15+ tier-1 industry conferences, driving 2,400+ executive demo requests."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "University of Texas at Austin",
          "degree": "Bachelor of Business Administration (BBA)",
          "field": "Marketing & Data Analytics",
          "startDate": "2013",
          "endDate": "2017",
          "gpa": "3.82"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Growth Marketing & Paid Acquisition",
          "level": "Expert",
          "category": "Growth & Strategy"
        },
        {
          "id": "2",
          "name": "Google Ads & Search Engine Mktg",
          "level": "Expert",
          "category": "Paid Media"
        },
        {
          "id": "3",
          "name": "Technical SEO & Content Strategy",
          "level": "Expert",
          "category": "Organic Growth"
        },
        {
          "id": "4",
          "name": "HubSpot & Marketo Automation",
          "level": "Expert",
          "category": "Marketing Automation"
        },
        {
          "id": "5",
          "name": "Google Analytics 4 & Mixpanel",
          "level": "Expert",
          "category": "Data Analytics"
        },
        {
          "id": "6",
          "name": "A/B Testing & Conversion Rate Opt",
          "level": "Expert",
          "category": "Conversion Optimization"
        },
        {
          "id": "7",
          "name": "SQL & Tableau Reporting",
          "level": "Advanced",
          "category": "Data Analytics"
        },
        {
          "id": "8",
          "name": "LinkedIn Campaign Manager",
          "level": "Advanced",
          "category": "Paid Media"
        },
        {
          "id": "9",
          "name": "Meta Ads Manager & TikTok Ads",
          "level": "Advanced",
          "category": "Paid Media"
        },
        {
          "id": "10",
          "name": "Multi-Touch Attribution Modeling",
          "level": "Advanced",
          "category": "Data Analytics"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Omnichannel B2B Product Launch Campaign",
          "description": "Orchestrated international product go-to-market campaign generating 12k+ product signups and $2.4M in closed-won ARR within the first 90 days.",
          "technologies": [
            "Google Ads",
            "HubSpot",
            "Optimizely",
            "Tableau",
            "LinkedIn Ads"
          ],
          "link": "emmarodriguez.co/product-launch"
        }
      ]
    }
  },
  {
    "id": "healthcare-professional",
    "name": "Healthcare Professional",
    "description": "Clean, professional template for healthcare workers",
    "category": "Healthcare",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Dr. Jennifer",
        "lastName": "Martinez",
        "title": "Lead Clinical Nurse Specialist & Healthcare Administrator",
        "email": "jennifer.martinez@email.com",
        "phone": "+1 (555) 567-8901",
        "location": "Chicago, IL",
        "linkedin": "linkedin.com/in/drjennifermartinez",
        "website": "jennifermartinez-health.org"
      },
      "summary": "Dedicated and compassionate Clinical Nurse Specialist and Healthcare Administrator with 9+ years of experience leading acute patient care units and quality assurance programs. Achieved 99.4% clinical compliance, reduced hospital-acquired infections by 42%, and managed nursing departments of 45+ medical personnel.",
      "experience": [
        {
          "id": "1",
          "company": "Northwestern Memorial Hospital",
          "position": "Lead Clinical Nurse Specialist",
          "startDate": "May 2020",
          "endDate": "Present",
          "current": true,
          "description": [
            "Supervised 45+ registered nurses and medical staff in 60-bed intensive care unit (ICU) with 98% positive patient satisfaction scores.",
            "Implemented evidence-based infection control protocols, reducing hospital-acquired catheter infections by 42% over 18 months.",
            "Spearheaded Epic EHR workflow optimization, saving medical staff an average of 45 minutes of documentation time per shift.",
            "Administered departmental clinical budget of $6.5M while maintaining 100% adherence to Joint Commission healthcare safety standards."
          ]
        },
        {
          "id": "2",
          "company": "Rush University Medical Center",
          "position": "Senior Registered Critical Care Nurse",
          "startDate": "Jun 2016",
          "endDate": "Apr 2020",
          "current": false,
          "description": [
            "Delivered direct high-acuity life support care for 1,200+ cardiac and trauma patients annually with zero adverse medication events.",
            "Coordinated multidisciplinary rounds with attending physicians, pharmacists, and respiratory therapists to expedite patient recovery.",
            "Designed and led comprehensive 8-week onboarding curriculum that trained 65+ newly recruited registered nurses.",
            "Received Hospital Daisy Award for outstanding clinical excellence, empathetic patient advocacy, and leadership."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Rush University College of Nursing",
          "degree": "Doctor of Nursing Practice (DNP)",
          "field": "Executive Healthcare Leadership",
          "startDate": "2017",
          "endDate": "2020",
          "gpa": "3.95"
        },
        {
          "id": "2",
          "institution": "Loyola University Chicago",
          "degree": "Bachelor of Science in Nursing (BSN)",
          "field": "Nursing Science",
          "startDate": "2012",
          "endDate": "2016",
          "gpa": "3.88"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Critical Care & ICU Protocols",
          "level": "Expert",
          "category": "Clinical Specialties"
        },
        {
          "id": "2",
          "name": "Epic EHR & Cerner Systems",
          "level": "Expert",
          "category": "Healthcare Informatics"
        },
        {
          "id": "3",
          "name": "Clinical Quality & Patient Safety",
          "level": "Expert",
          "category": "Administration"
        },
        {
          "id": "4",
          "name": "ACLS & BLS Certified Instructor",
          "level": "Expert",
          "category": "Certifications"
        },
        {
          "id": "5",
          "name": "Infection Prevention & Control",
          "level": "Expert",
          "category": "Clinical Specialties"
        },
        {
          "id": "6",
          "name": "Joint Commission (JCAHO) Standards",
          "level": "Advanced",
          "category": "Compliance"
        },
        {
          "id": "7",
          "name": "Interdisciplinary Team Leadership",
          "level": "Expert",
          "category": "Administration"
        },
        {
          "id": "8",
          "name": "Budgeting & Resource Allocation",
          "level": "Advanced",
          "category": "Administration"
        },
        {
          "id": "9",
          "name": "Pharmacology & Medication Safety",
          "level": "Expert",
          "category": "Clinical Specialties"
        },
        {
          "id": "10",
          "name": "HIPAA Regulatory Compliance",
          "level": "Expert",
          "category": "Compliance"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "ICU Sepsis Early Detection Initiative",
          "description": "Engineered automated EHR sepsis warning trigger system, reducing clinical response time by 34% and improving ICU survival rates by 18%.",
          "technologies": [
            "Epic EHR",
            "Clinical Informatics",
            "Quality Protocols",
            "Data Analysis"
          ],
          "link": "jennifermartinez-health.org/sepsis-initiative"
        }
      ]
    }
  },
  {
    "id": "minimalist-elegant",
    "name": "Minimalist Elegant",
    "description": "Clean, sophisticated design with subtle accents",
    "category": "Professional",
    "difficulty": "Easy",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Sophia",
        "lastName": "Laurent",
        "title": "Principal Product Manager",
        "email": "sophia.laurent@email.com",
        "phone": "+1 (555) 789-0123",
        "location": "Boston, MA",
        "linkedin": "linkedin.com/in/sophialaurent-pm",
        "website": "sophialaurent.com"
      },
      "summary": "Strategic and customer-obsessed Principal Product Manager with 9+ years of experience leading multi-platform SaaS products from concept to $40M+ ARR scale. Expert in discovery, quantitative analytics, and cross-functional leadership across engineering, design, and commercial teams.",
      "experience": [
        {
          "id": "1",
          "company": "Beacon Enterprise Cloud",
          "position": "Principal Product Manager",
          "startDate": "Jan 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Spearheaded product strategy and execution for core analytics platform, growing ARR from $14M to $42M (+200%) in 3 years.",
            "Launched self-serve product onboarding experience, accelerating user activation rates by 48% and reducing time-to-value by 60%.",
            "Prioritized product backlog across 3 agile squads (24 engineers/designers) delivering 100% of quarterly roadmap commitments.",
            "Conducted 80+ customer discovery interviews with enterprise C-level buyers to validate multi-tenant enterprise features."
          ]
        },
        {
          "id": "2",
          "company": "Acorn Mobility Solutions",
          "position": "Senior Product Manager",
          "startDate": "Apr 2017",
          "endDate": "Dec 2020",
          "current": false,
          "description": [
            "Led cross-functional team of 14 to build and scale consumer mobile application to 2.8M monthly active users (MAU).",
            "Increased 30-day user retention from 22% to 41% through data-driven personalization algorithms and push notification funnels.",
            "Negotiated API partnerships with 12 enterprise logistics providers, opening $3.5M in incremental revenue streams.",
            "Instituted continuous product discovery frameworks, cutting feature validation cycle times from 8 weeks to 10 days."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Massachusetts Institute of Technology (MIT)",
          "degree": "Master of Science",
          "field": "Engineering Management & Innovation",
          "startDate": "2015",
          "endDate": "2017",
          "gpa": "3.90"
        },
        {
          "id": "2",
          "institution": "Harvard University",
          "degree": "Bachelor of Arts",
          "field": "Economics & Computer Science",
          "startDate": "2011",
          "endDate": "2015",
          "gpa": "3.86"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Product Strategy & Vision",
          "level": "Expert",
          "category": "Product Leadership"
        },
        {
          "id": "2",
          "name": "Roadmap & Backlog Prioritization",
          "level": "Expert",
          "category": "Product Management"
        },
        {
          "id": "3",
          "name": "User Discovery & Market Research",
          "level": "Expert",
          "category": "Product Management"
        },
        {
          "id": "4",
          "name": "Data Analytics & Amplitude/Mixpanel",
          "level": "Expert",
          "category": "Analytics"
        },
        {
          "id": "5",
          "name": "A/B Testing & Growth Experimentation",
          "level": "Expert",
          "category": "Analytics"
        },
        {
          "id": "6",
          "name": "Agile/Scrum Frameworks",
          "level": "Expert",
          "category": "Methodology"
        },
        {
          "id": "7",
          "name": "SQL & BigQuery Data Analysis",
          "level": "Advanced",
          "category": "Technical"
        },
        {
          "id": "8",
          "name": "Figma Prototyping & Wireframing",
          "level": "Advanced",
          "category": "Design"
        },
        {
          "id": "9",
          "name": "Go-to-Market (GTM) Strategy",
          "level": "Expert",
          "category": "Commercial"
        },
        {
          "id": "10",
          "name": "Stakeholder & Executive Alignment",
          "level": "Expert",
          "category": "Leadership"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "AI Insights Automated Reporting Suite",
          "description": "Conceived and launched LLM-powered enterprise reporting engine adopted by 400+ corporate clients within 6 months, contributing $6.2M in expansion ARR.",
          "technologies": [
            "Product Strategy",
            "LLM Integration",
            "Amplitude",
            "Jira",
            "SQL"
          ],
          "link": "sophialaurent.com/ai-insights"
        }
      ]
    }
  },
  {
    "id": "tech-innovator",
    "name": "Tech Innovator",
    "description": "Modern tech-focused design with bold accents",
    "category": "Technology",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Marcus",
        "lastName": "Vance",
        "title": "Principal Cloud & DevOps Infrastructure Architect",
        "email": "marcus.vance@email.com",
        "phone": "+1 (555) 678-9012",
        "location": "Austin, TX",
        "linkedin": "linkedin.com/in/marcusvance-cloud",
        "website": "marcusvance.io"
      },
      "summary": "High-impact Cloud & DevOps Infrastructure Architect with 10+ years of experience designing secure, self-healing multi-cloud platforms. Automated enterprise Kubernetes clusters across AWS and GCP, achieving 99.999% platform availability and reducing infrastructure cloud spending by $2.8M annually.",
      "experience": [
        {
          "id": "1",
          "company": "CloudSphere Infrastructure",
          "position": "Principal DevOps Architect",
          "startDate": "Mar 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Architected automated multi-region Kubernetes (EKS/GKE) infrastructure managing 400+ microservices with 99.999% uptime.",
            "Spearheaded Infrastructure as Code (IaC) with Terraform and GitOps via ArgoCD, slashing provisioning time from 5 days to 8 minutes (-98%).",
            "Implemented FinOps cloud cost governance, eliminating redundant instances and saving $2.8M in annual AWS/GCP bills.",
            "Hardened zero-trust network security posture and automated Falco/Trivy container vulnerability scanning across 1,500+ daily builds."
          ]
        },
        {
          "id": "2",
          "company": "HyperScale Data Systems",
          "position": "Senior Site Reliability Engineer (SRE)",
          "startDate": "Jan 2018",
          "endDate": "Feb 2021",
          "current": false,
          "description": [
            "Designed automated observability and distributed tracing stack with Prometheus, Grafana, and Jaeger, reducing MTTR by 52%.",
            "Built chaos engineering test pipelines with Gremlin to validate system fault tolerance against regional network partitions.",
            "Scaled distributed Kafka streaming clusters handling 2.5B+ daily telemetry messages with sub-15ms processing latency.",
            "Mentored 12 DevOps engineers in Linux kernel tuning, container orchestration, and incident response automation."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Georgia Institute of Technology",
          "degree": "Master of Science",
          "field": "Computer Science (Systems & Cloud Infrastructure)",
          "startDate": "2015",
          "endDate": "2017",
          "gpa": "3.91"
        },
        {
          "id": "2",
          "institution": "University of Illinois Urbana-Champaign",
          "degree": "Bachelor of Science",
          "field": "Computer Engineering",
          "startDate": "2011",
          "endDate": "2015",
          "gpa": "3.84"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Kubernetes (EKS, GKE, CKA/CKS)",
          "level": "Expert",
          "category": "Container Orchestration"
        },
        {
          "id": "2",
          "name": "Terraform & OpenTofu (IaC)",
          "level": "Expert",
          "category": "Infrastructure as Code"
        },
        {
          "id": "3",
          "name": "AWS & Google Cloud Platform",
          "level": "Expert",
          "category": "Cloud Architecture"
        },
        {
          "id": "4",
          "name": "CI/CD & GitOps (ArgoCD, Actions)",
          "level": "Expert",
          "category": "DevOps & CI/CD"
        },
        {
          "id": "5",
          "name": "Docker & Container Security",
          "level": "Expert",
          "category": "Container Orchestration"
        },
        {
          "id": "6",
          "name": "Prometheus, Grafana & Datadog",
          "level": "Expert",
          "category": "Observability & SRE"
        },
        {
          "id": "7",
          "name": "Python & Go (Golang) Scripting",
          "level": "Advanced",
          "category": "Programming Languages"
        },
        {
          "id": "8",
          "name": "Apache Kafka & RabbitMQ",
          "level": "Advanced",
          "category": "Message Brokers"
        },
        {
          "id": "9",
          "name": "Linux Kernel & BASH Automation",
          "level": "Expert",
          "category": "Systems & OS"
        },
        {
          "id": "10",
          "name": "HashiCorp Vault & Zero-Trust",
          "level": "Advanced",
          "category": "Security"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Zero-Touch Autonomous Multi-Cloud GitOps Engine",
          "description": "Engineered self-healing multi-region cloud deployment framework supporting 80+ software teams with zero downtime rollouts and automated rollback triggers.",
          "technologies": [
            "Terraform",
            "Kubernetes",
            "ArgoCD",
            "AWS",
            "Go"
          ],
          "link": "github.com/marcusvance/gitops-engine"
        }
      ]
    }
  },
  {
    "id": "sales-professional",
    "name": "Sales Professional",
    "description": "Results-driven design for sales and business development",
    "category": "Sales",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Robert",
        "lastName": "Sterling",
        "title": "Director of Enterprise Sales & Strategic Accounts",
        "email": "robert.sterling@email.com",
        "phone": "+1 (555) 890-1234",
        "location": "Atlanta, GA",
        "linkedin": "linkedin.com/in/robertsterling-sales",
        "website": "robertsterling.sales"
      },
      "summary": "Top-performing Enterprise Sales Director with 10+ years of experience generating $65M+ in lifetime B2B software and cloud solutions contracts. Consistently exceeded annual sales quotas (142% average attainment) and negotiated multi-year master service agreements with Fortune 100 enterprise logos.",
      "experience": [
        {
          "id": "1",
          "company": "Apex Cloud Software Systems",
          "position": "Director of Enterprise Sales",
          "startDate": "Jan 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Led enterprise sales squad generating $24.8M in net new ARR, achieving 154% of team annual revenue target.",
            "Closed $8.4M 5-year flagship master contract with Fortune 50 healthcare conglomerate against 3 top tier competitors.",
            "Re-architected enterprise sales qualification framework (MEDDPICC), accelerating average sales cycle from 9 months to 4.5 months.",
            "Coached and mentored 10 Account Executives, resulting in 80% of team members achieving President’s Club honors."
          ]
        },
        {
          "id": "2",
          "company": "Synergy B2B Technologies",
          "position": "Senior Enterprise Account Executive",
          "startDate": "Mar 2017",
          "endDate": "Dec 2020",
          "current": false,
          "description": [
            "Generated $18.6M in cumulative software ARR with 138% average quota attainment over 4 consecutive fiscal years.",
            "Sourced and negotiated 28 enterprise deals with average contract value (ACV) of $650k+ across financial services and retail sectors.",
            "Collaborated with Solutions Engineering and Product leaders to tailor technical proofs of concept (POCs) with 88% win rate.",
            "Awarded Global Top Sales Producer and President’s Club Winner for 3 consecutive years (2018, 2019, 2020)."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Emory University - Goizueta Business School",
          "degree": "Master of Business Administration (MBA)",
          "field": "Strategic Sales & Enterprise Leadership",
          "startDate": "2014",
          "endDate": "2016",
          "gpa": "3.89"
        },
        {
          "id": "2",
          "institution": "University of Georgia",
          "degree": "Bachelor of Business Administration",
          "field": "Finance & Commercial Sales",
          "startDate": "2010",
          "endDate": "2014",
          "gpa": "3.76"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Enterprise B2B SaaS Sales",
          "level": "Expert",
          "category": "Sales Strategy"
        },
        {
          "id": "2",
          "name": "MEDDPICC & Command of Sale",
          "level": "Expert",
          "category": "Sales Methodology"
        },
        {
          "id": "3",
          "name": "Executive C-Suite Negotiation",
          "level": "Expert",
          "category": "Deal Structuring"
        },
        {
          "id": "4",
          "name": "Salesforce CRM & Clari Forecasting",
          "level": "Expert",
          "category": "Sales Operations"
        },
        {
          "id": "5",
          "name": "Contract & Legal MSA Structuring",
          "level": "Expert",
          "category": "Deal Structuring"
        },
        {
          "id": "6",
          "name": "Territory Planning & Pipeline Mgmt",
          "level": "Expert",
          "category": "Sales Strategy"
        },
        {
          "id": "7",
          "name": "Sales Coaching & Team Leadership",
          "level": "Expert",
          "category": "Leadership"
        },
        {
          "id": "8",
          "name": "Account-Based Marketing (ABM)",
          "level": "Advanced",
          "category": "Sales Strategy"
        },
        {
          "id": "9",
          "name": "Gong.io & SalesLoft Cadences",
          "level": "Advanced",
          "category": "Sales Operations"
        },
        {
          "id": "10",
          "name": "Financial ROI Modeling",
          "level": "Advanced",
          "category": "Deal Structuring"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Fortune 50 Enterprise Cloud Expansion Program",
          "description": "Orchestrated multi-division enterprise rollout across 40,000 corporate seats, yielding $12M total contract value over 3 years.",
          "technologies": [
            "Enterprise SaaS",
            "MEDDPICC",
            "Executive Negotiation",
            "Salesforce CRM"
          ],
          "link": "robertsterling.sales/enterprise-expansion"
        }
      ]
    }
  },
  {
    "id": "academic-researcher",
    "name": "Academic Researcher",
    "description": "Scholarly design for academic and research positions",
    "category": "Academic",
    "difficulty": "Hard",
    "isPremium": true,
    "sampleData": {
      "personalInfo": {
        "firstName": "Dr. Katherine",
        "lastName": "Bishop",
        "title": "Lead Bioengineering & AI Research Scientist",
        "email": "katherine.bishop@email.edu",
        "phone": "+1 (555) 901-2345",
        "location": "Cambridge, MA",
        "linkedin": "linkedin.com/in/drkatherinebishop",
        "website": "katherinebishop-lab.org"
      },
      "summary": "Distinguished Research Scientist with a Ph.D. in Computational Biology & Machine Learning from MIT and 8+ years leading breakthrough research in AI-driven structural drug discovery. Authored 18 peer-reviewed publications in Nature and Science (h-index: 16), secured $4.8M in federal NIH/NSF grants, and directed a research laboratory of 14 postdoctoral fellows and PhD researchers.",
      "experience": [
        {
          "id": "1",
          "company": "Broad Institute of MIT and Harvard",
          "position": "Lead Research Scientist & Lab Director",
          "startDate": "Sep 2020",
          "endDate": "Present",
          "current": true,
          "description": [
            "Direct a multidisciplinary computational research laboratory of 14 postdoctoral fellows and doctoral researchers.",
            "Principal Investigator (PI) securing $4.8M in competitive NIH R01 and NSF grants for deep learning molecular modeling.",
            "Developed transformer-based molecular binding affinity predictor that reduced pre-clinical drug screening time by 62%.",
            "Published 12 high-impact papers in Nature Biotechnology, Cell Systems, and NeurIPS with 1,800+ academic citations."
          ]
        },
        {
          "id": "2",
          "company": "Harvard Medical School",
          "position": "Postdoctoral Research Fellow",
          "startDate": "Jun 2017",
          "endDate": "Aug 2020",
          "current": false,
          "description": [
            "Engineered deep convolutional and graph neural network (GNN) algorithms for high-throughput single-cell genomics.",
            "Processed and analyzed 10TB+ genomic sequencing datasets utilizing PyTorch, AWS EC2 GPU clusters, and Nextflow pipelines.",
            "Mentored 6 graduate students and co-authored 6 peer-reviewed manuscripts on targeted oncology therapeutics.",
            "Presented invited keynote lectures at 8 international computational biology and bioinformatics symposia."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Massachusetts Institute of Technology (MIT)",
          "degree": "Doctor of Philosophy (Ph.D.)",
          "field": "Computational Biology & Machine Learning",
          "startDate": "2012",
          "endDate": "2017",
          "gpa": "4.00"
        },
        {
          "id": "2",
          "institution": "Johns Hopkins University",
          "degree": "Bachelor of Science",
          "field": "Biomedical Engineering & Applied Mathematics",
          "startDate": "2008",
          "endDate": "2012",
          "gpa": "3.96"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Deep Learning & PyTorch / JAX",
          "level": "Expert",
          "category": "Artificial Intelligence"
        },
        {
          "id": "2",
          "name": "Graph Neural Networks (GNN)",
          "level": "Expert",
          "category": "Artificial Intelligence"
        },
        {
          "id": "3",
          "name": "Python, C++ & R Programming",
          "level": "Expert",
          "category": "Computational Languages"
        },
        {
          "id": "4",
          "name": "High-Performance Computing (HPC)",
          "level": "Expert",
          "category": "Infrastructure"
        },
        {
          "id": "5",
          "name": "Grant Writing & NIH Funding",
          "level": "Expert",
          "category": "Academic Leadership"
        },
        {
          "id": "6",
          "name": "Genomics & Bioinformatics Pipelines",
          "level": "Expert",
          "category": "Domain Science"
        },
        {
          "id": "7",
          "name": "Statistical Modeling & Biostatistics",
          "level": "Expert",
          "category": "Data Analysis"
        },
        {
          "id": "8",
          "name": "Peer-Reviewed Scientific Publishing",
          "level": "Expert",
          "category": "Academic Leadership"
        },
        {
          "id": "9",
          "name": "Nextflow, Docker & Git",
          "level": "Advanced",
          "category": "Computational Tools"
        },
        {
          "id": "10",
          "name": "Molecular Dynamics Simulation",
          "level": "Advanced",
          "category": "Domain Science"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "AlphaFold-Linked Targeted Oncology Binding Pipeline",
          "description": "Engineered open-source deep learning protein ligand binding prediction model achieving 94.2% structural accuracy, adopted by 80+ biotech labs globally.",
          "technologies": [
            "PyTorch",
            "AlphaFold2",
            "Nextflow",
            "CUDA",
            "Python"
          ],
          "link": "katherinebishop-lab.org/oncology-pipeline"
        }
      ]
    }
  },
  {
    "id": "finance-executive",
    "name": "Finance Executive",
    "description": "Professional design for finance and accounting roles",
    "category": "Finance",
    "difficulty": "Hard",
    "isPremium": true,
    "sampleData": {
      "personalInfo": {
        "firstName": "Richard",
        "lastName": "Hastings",
        "title": "Director of Corporate Finance & FP&A",
        "email": "richard.hastings@email.com",
        "phone": "+1 (555) 012-3456",
        "location": "New York, NY",
        "linkedin": "linkedin.com/in/richardhastings-cfa",
        "website": "richardhastings.finance"
      },
      "summary": "Strategic and results-focused Corporate Finance Director & CFA Charterholder with 12+ years of experience leading financial planning & analysis (FP&A), capital allocation, and M&A transactions. Managed $350M+ annual corporate budgets, spearheaded $1.2B in successful debt and equity financings, and delivered $28M in EBITDA margin expansions.",
      "experience": [
        {
          "id": "1",
          "company": "Apex Capital Management",
          "position": "Director of Corporate Finance & FP&A",
          "startDate": "Jan 2020",
          "endDate": "Present",
          "current": true,
          "description": [
            "Directed corporate financial modeling and annual budget allocations of $350M across 6 global operating business units.",
            "Spearheaded $1.2B syndicated credit refinancing facility, cutting annual debt servicing interest costs by $14.5M (-22%).",
            "Implemented automated ERP financial forecasting models in Adaptive Insights, shortening monthly close cycle from 12 to 3 days.",
            "Delivered cost optimization strategies that expanded operating EBITDA margins by 340 bps, adding $28M to annual net income."
          ]
        },
        {
          "id": "2",
          "company": "Goldman Sachs & Co.",
          "position": "Vice President - Investment Banking & M&A",
          "startDate": "Jul 2014",
          "endDate": "Dec 2019",
          "current": false,
          "description": [
            "Executed 14 complex M&A transactions with aggregate transaction enterprise value exceeding $4.5B.",
            "Engineered detailed 3-statement financial models, discounted cash flow (DCF), LBO, and accretion/dilution valuations.",
            "Supervised and mentored analyst squads of 8 investment banking analysts with 100% deal deliverables compliance.",
            "Presented strategic M&A fairness opinions and board decks directly to Fortune 500 CEOs and private equity sponsors."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Columbia Business School",
          "degree": "Master of Business Administration (MBA)",
          "field": "Finance & Private Equity",
          "startDate": "2012",
          "endDate": "2014",
          "gpa": "3.92"
        },
        {
          "id": "2",
          "institution": "New York University - Stern School of Business",
          "degree": "Bachelor of Science",
          "field": "Finance & Accounting",
          "startDate": "2008",
          "endDate": "2012",
          "gpa": "3.88"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Chartered Financial Analyst (CFA)",
          "level": "Expert",
          "category": "Certifications"
        },
        {
          "id": "2",
          "name": "Strategic FP&A & Corporate Budgeting",
          "level": "Expert",
          "category": "Corporate Finance"
        },
        {
          "id": "3",
          "name": "M&A Valuation & Due Diligence",
          "level": "Expert",
          "category": "Investment Banking"
        },
        {
          "id": "4",
          "name": "LBO & 3-Statement DCF Modeling",
          "level": "Expert",
          "category": "Financial Modeling"
        },
        {
          "id": "5",
          "name": "EBITDA Margin Optimization",
          "level": "Expert",
          "category": "Corporate Finance"
        },
        {
          "id": "6",
          "name": "Capital Structure & Debt Refinancing",
          "level": "Expert",
          "category": "Treasury & Capital"
        },
        {
          "id": "7",
          "name": "NetSuite, SAP ERP & Workday",
          "level": "Advanced",
          "category": "Financial Systems"
        },
        {
          "id": "8",
          "name": "Adaptive Insights & Anaplan",
          "level": "Advanced",
          "category": "Financial Systems"
        },
        {
          "id": "9",
          "name": "SQL & Advanced Financial Excel",
          "level": "Expert",
          "category": "Technical Tools"
        },
        {
          "id": "10",
          "name": "Board Reporting & SEC Compliance",
          "level": "Expert",
          "category": "Corporate Governance"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "$850M Cross-Border Tech Acquisition & Integration",
          "description": "Led end-to-end financial diligence and post-merger synergy integration, realizing $32M in cost synergies within 12 months.",
          "technologies": [
            "Financial Modeling",
            "M&A Due Diligence",
            "Valuation",
            "Synergy Tracking"
          ],
          "link": "richardhastings.finance/tech-acquisition"
        }
      ]
    }
  },
  {
    "id": "startup-founder",
    "name": "Startup Founder",
    "description": "Dynamic design for entrepreneurs and startup leaders",
    "category": "Entrepreneurship",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Elena",
        "lastName": "Rostova",
        "title": "Co-Founder & Chief Executive Officer (CEO)",
        "email": "elena.rostova@email.com",
        "phone": "+1 (555) 112-2334",
        "location": "San Francisco, CA",
        "linkedin": "linkedin.com/in/elenarostova-founder",
        "website": "elenarostova.vc"
      },
      "summary": "Serial Tech Entrepreneur and 2x Founder with 10+ years of experience scaling venture-backed SaaS startups from inception to successful $48M strategic acquisition. Raised $16.5M in Series A/B venture capital from top-tier Silicon Valley VC funds and scaled recurring revenue from $0 to $18M ARR.",
      "experience": [
        {
          "id": "1",
          "company": "DataPulse Intelligence (Acquired by CloudCorp)",
          "position": "Co-Founder & CEO",
          "startDate": "Jan 2019",
          "endDate": "Present",
          "current": true,
          "description": [
            "Bootstrapped and scaled enterprise AI analytics platform from zero to $18.4M ARR with 420+ enterprise customers.",
            "Raised $16.5M in venture capital across Seed, Series A, and Series B rounds led by tier-1 venture capital firms.",
            "Grew global team from 2 founders to 68 employees across Engineering, Product, Sales, and Marketing with 94% retention.",
            "Orchestrated competitive M&A acquisition bidding process resulting in successful $48M cash and stock exit."
          ]
        },
        {
          "id": "2",
          "company": "HyperShift Commerce",
          "position": "Co-Founder & Chief Product Officer",
          "startDate": "Mar 2015",
          "endDate": "Dec 2018",
          "current": false,
          "description": [
            "Conceived and launched automated e-commerce optimization tool, growing user base to 350,000 active online merchants.",
            "Achieved product-market fit within 6 months, scaling monthly recurring revenue (MRR) by 28% month-over-month.",
            "Secured $2.5M Seed funding and negotiated strategic distribution partnerships with Shopify and BigCommerce.",
            "Featured in TechCrunch, Forbes 30 Under 30 in Enterprise Technology, and Y Combinator Alumni spotlight."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Stanford University",
          "degree": "Bachelor of Science",
          "field": "Computer Science & Management Science & Engineering",
          "startDate": "2010",
          "endDate": "2014",
          "gpa": "3.87"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Venture Capital Fundraising (Series A/B)",
          "level": "Expert",
          "category": "Executive Strategy"
        },
        {
          "id": "2",
          "name": "0-to-1 Product Market Fit (PMF)",
          "level": "Expert",
          "category": "Product Strategy"
        },
        {
          "id": "3",
          "name": "Go-to-Market & Enterprise Sales",
          "level": "Expert",
          "category": "Commercial"
        },
        {
          "id": "4",
          "name": "P&L & Financial Capital Allocation",
          "level": "Expert",
          "category": "Executive Strategy"
        },
        {
          "id": "5",
          "name": "Mergers & Acquisitions (M&A) Exits",
          "level": "Expert",
          "category": "Executive Strategy"
        },
        {
          "id": "6",
          "name": "Executive Team Hiring & Culture",
          "level": "Expert",
          "category": "Leadership"
        },
        {
          "id": "7",
          "name": "Board of Directors Governance",
          "level": "Expert",
          "category": "Leadership"
        },
        {
          "id": "8",
          "name": "AI & SaaS Architecture",
          "level": "Advanced",
          "category": "Technology"
        },
        {
          "id": "9",
          "name": "Cap Table & Equity Structuring",
          "level": "Expert",
          "category": "Financial Management"
        },
        {
          "id": "10",
          "name": "Strategic Enterprise Partnerships",
          "level": "Expert",
          "category": "Commercial"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "DataPulse Enterprise Predictive Analytics Engine",
          "description": "Architected real-time predictive telemetry AI platform processing 5B+ daily data points for Fortune 500 enterprises with 99.99% availability.",
          "technologies": [
            "Distributed AI",
            "SaaS",
            "Cloud Architecture",
            "Kafka",
            "React"
          ],
          "link": "elenarostova.vc/datapulse"
        }
      ]
    }
  },
  {
    "id": "entry-level-graduate",
    "name": "Entry-Level Graduate",
    "description": "Ideal for recent graduates seeking their first job.",
    "category": "Graduate",
    "difficulty": "Easy",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Lucas",
        "lastName": "Bennett",
        "title": "Junior Data Analyst & Business Intelligence Specialist",
        "email": "lucas.bennett@email.com",
        "phone": "+1 (555) 223-3445",
        "location": "Seattle, WA",
        "linkedin": "linkedin.com/in/lucasbennett-data",
        "website": "lucasbennett.data"
      },
      "summary": "Detail-oriented and mathematically rigorous Junior Data Analyst with a BS in Statistics & Data Science. Proficient in SQL, Python, Tableau, and PowerBI. Developed 15+ automated executive dashboards, optimized database queries reducing runtime by 45%, and extracted actionable business insights from 2M+ records.",
      "experience": [
        {
          "id": "1",
          "company": "Cascade Analytics Group",
          "position": "Data Analytics Intern",
          "startDate": "Jun 2023",
          "endDate": "Dec 2023",
          "current": false,
          "description": [
            "Built 8 automated Tableau and PowerBI dashboards tracking weekly sales metrics across $12M in retail revenue.",
            "Optimized complex SQL queries and PostgreSQL stored procedures, reducing report generation runtimes by 45%.",
            "Conducted statistical churn analysis in Python (Pandas/Scikit-learn) identifying key behavioral drivers for 45k customers.",
            "Presented weekly exploratory data analysis (EDA) findings to Director of Analytics and commercial team leaders."
          ]
        },
        {
          "id": "2",
          "company": "University Data Science Center",
          "position": "Undergraduate Research Assistant",
          "startDate": "Sep 2022",
          "endDate": "May 2023",
          "current": false,
          "description": [
            "Cleaned and preprocessed 2.4M demographic survey records utilizing Python and Jupyter Notebooks with 99.8% data integrity.",
            "Implemented automated data validation scripts that reduced manual data cleansing time by 12 hours weekly.",
            "Co-authored undergraduate research paper on demographic economic trends published in regional statistics symposium."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "University of Washington",
          "degree": "Bachelor of Science",
          "field": "Statistics & Quantitative Data Science",
          "startDate": "2019",
          "endDate": "2023",
          "gpa": "3.84"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "SQL (PostgreSQL, MySQL, BigQuery)",
          "level": "Advanced",
          "category": "Databases & Querying"
        },
        {
          "id": "2",
          "name": "Python (Pandas, NumPy, Scikit-Learn)",
          "level": "Advanced",
          "category": "Programming"
        },
        {
          "id": "3",
          "name": "Tableau & PowerBI Visualization",
          "level": "Advanced",
          "category": "Business Intelligence"
        },
        {
          "id": "4",
          "name": "Statistical Modeling & Hypothesis Testing",
          "level": "Advanced",
          "category": "Data Analysis"
        },
        {
          "id": "5",
          "name": "Excel (VLOOKUP, Pivot, VBA)",
          "level": "Expert",
          "category": "Data Analysis"
        },
        {
          "id": "6",
          "name": "Data Wrangling & ETL Pipelines",
          "level": "Intermediate",
          "category": "Data Engineering"
        },
        {
          "id": "7",
          "name": "R & ggplot2 Statistical Analysis",
          "level": "Intermediate",
          "category": "Programming"
        },
        {
          "id": "8",
          "name": "Git & Version Control",
          "level": "Intermediate",
          "category": "Tools"
        },
        {
          "id": "9",
          "name": "A/B Testing Methodologies",
          "level": "Intermediate",
          "category": "Data Analysis"
        },
        {
          "id": "10",
          "name": "Jira & Agile Workflows",
          "level": "Intermediate",
          "category": "Tools"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "E-Commerce Customer Lifetime Value (CLV) Predictor",
          "description": "Engineered regression machine learning pipeline predicting customer spend with 89% accuracy across 100k customer transactions.",
          "technologies": [
            "Python",
            "SQL",
            "Scikit-Learn",
            "Tableau",
            "Pandas"
          ],
          "link": "github.com/lucasbennett/clv-predictor"
        }
      ]
    }
  },
  {
    "id": "it-specialist",
    "name": "IT Specialist",
    "description": "Perfect for IT professionals and tech support roles.",
    "category": "IT",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Daniel",
        "lastName": "Kowalski",
        "title": "Senior Systems & Cybersecurity Infrastructure Specialist",
        "email": "daniel.kowalski@email.com",
        "phone": "+1 (555) 334-4556",
        "location": "Dallas, TX",
        "linkedin": "linkedin.com/in/danielkowalski-it",
        "website": "danielkowalski.tech"
      },
      "summary": "Proactive and certified Senior IT & Cybersecurity Infrastructure Specialist with 8+ years of experience administering enterprise hybrid cloud environments, Active Directory, and network security. Maintained 99.98% IT system uptime for 1,800+ enterprise users and reduced support ticket resolution times by 55%.",
      "experience": [
        {
          "id": "1",
          "company": "Trident Corporate Infrastructure",
          "position": "Senior IT Systems & Network Specialist",
          "startDate": "Feb 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Administered enterprise Windows Server 2022, Microsoft 365, and Azure AD environments for 1,800+ global corporate users.",
            "Spearheaded enterprise migration to Cisco Meraki SD-WAN across 14 branch offices, cutting telecom expenses by $180k/year.",
            "Automated endpoint patch management via Microsoft Intune and PowerShell, raising patch compliance from 74% to 99.6%.",
            "Implemented Multi-Factor Authentication (MFA) and zero-trust conditional access, blocking 100% of unauthorized login attacks."
          ]
        },
        {
          "id": "2",
          "company": "OmniTech IT Solutions",
          "position": "IT Systems Support Engineer",
          "startDate": "May 2017",
          "endDate": "Jan 2021",
          "current": false,
          "description": [
            "Resolved 4,500+ Tier 2/3 technical escalation tickets across hardware, software, VPN, and VMware virtualization issues.",
            "Reduced average IT ticket resolution turnaround time by 55% by authoring 85+ comprehensive knowledge base articles.",
            "Managed automated daily Veeam backup and disaster recovery replication, ensuring zero data loss during simulated DR drills.",
            "Configured and deployed 600+ Dell and Apple corporate laptops utilizing automated Windows Autopilot and Jamf Pro."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "University of Texas at Dallas",
          "degree": "Bachelor of Science",
          "field": "Information Technology & Cybersecurity",
          "startDate": "2013",
          "endDate": "2017",
          "gpa": "3.81"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Microsoft 365 & Azure AD Administration",
          "level": "Expert",
          "category": "Cloud & Directory"
        },
        {
          "id": "2",
          "name": "Windows Server & Linux (Ubuntu/RHEL)",
          "level": "Expert",
          "category": "Operating Systems"
        },
        {
          "id": "3",
          "name": "Cisco Meraki & Network Routing/VLANs",
          "level": "Expert",
          "category": "Networking"
        },
        {
          "id": "4",
          "name": "PowerShell Automation & Scripting",
          "level": "Advanced",
          "category": "Automation"
        },
        {
          "id": "5",
          "name": "VMware ESXi & Hyper-V Virtualization",
          "level": "Advanced",
          "category": "Infrastructure"
        },
        {
          "id": "6",
          "name": "Microsoft Intune & Jamf Pro MDM",
          "level": "Advanced",
          "category": "Endpoint Management"
        },
        {
          "id": "7",
          "name": "Veeam Backup & Disaster Recovery (DR)",
          "level": "Advanced",
          "category": "Storage & Backup"
        },
        {
          "id": "8",
          "name": "CompTIA Security+ & Network+ Certified",
          "level": "Expert",
          "category": "Certifications"
        },
        {
          "id": "9",
          "name": "Firewalls, VPN & Zero-Trust MFA",
          "level": "Expert",
          "category": "Cybersecurity"
        },
        {
          "id": "10",
          "name": "ServiceNow & ITIL Incident Management",
          "level": "Expert",
          "category": "ITSM"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Enterprise Zero-Trust Remote Work Architecture",
          "description": "Engineered secure remote access infrastructure for 1,200 remote employees utilizing Azure AD Conditional Access, Zscaler, and Intune.",
          "technologies": [
            "Azure AD",
            "Zscaler",
            "Microsoft Intune",
            "PowerShell",
            "MFA"
          ],
          "link": "danielkowalski.tech/zero-trust"
        }
      ]
    }
  },
  {
    "id": "sales-representative",
    "name": "Sales Representative",
    "description": "Optimized for sales and marketing job applications.",
    "category": "Sales",
    "difficulty": "Easy",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Samantha",
        "lastName": "Hayes",
        "title": "Senior Business Development & Sales Representative",
        "email": "samantha.hayes@email.com",
        "phone": "+1 (555) 445-5667",
        "location": "Chicago, IL",
        "linkedin": "linkedin.com/in/samanthahayes-sales",
        "website": "samanthahayes.pro"
      },
      "summary": "Dynamic and goal-oriented Senior Sales Representative with 6+ years of experience driving outbound B2B prospecting, cold outreach, and pipeline growth. Generated $8.2M in qualified sales pipeline, achieved 135% average annual quota attainment, and closed 120+ mid-market contracts.",
      "experience": [
        {
          "id": "1",
          "company": "Nexus Software Group",
          "position": "Senior Account Executive",
          "startDate": "Jan 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Achieved 142% of annual sales quota, generating $3.4M in closed-won B2B software contracts across Midwest territory.",
            "Conducted 240+ product demonstration meetings with VP and C-level decision-makers, maintaining 38% discovery-to-close win rate.",
            "Negotiated annual service agreements with average contract values of $45k–$120k with 96% client retention.",
            "Mentored squad of 5 Sales Development Representatives (SDRs), increasing outbound discovery call volume by 45%."
          ]
        },
        {
          "id": "2",
          "company": "Apex Business Systems",
          "position": "Business Development Representative (BDR)",
          "startDate": "Jun 2018",
          "endDate": "Dec 2020",
          "current": false,
          "description": [
            "Generated $4.8M in qualified sales pipeline through multi-channel cold outreach (calls, customized emails, LinkedIn).",
            "Consistently ranked #1 BDR across 24 regional reps, booking 320+ verified executive discovery meetings in 12 months.",
            "Leveraged Salesforce CRM, ZoomInfo, and Outreach.io to optimize daily prospect sequencing workflows.",
            "Awarded BDR of the Year and promoted to Account Executive within 14 months of hire."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "University of Illinois at Urbana-Champaign",
          "degree": "Bachelor of Arts",
          "field": "Communications & Strategic Marketing",
          "startDate": "2014",
          "endDate": "2018",
          "gpa": "3.75"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "B2B Software Sales & Closing",
          "level": "Expert",
          "category": "Sales Execution"
        },
        {
          "id": "2",
          "name": "Salesforce CRM & Pipeline Mgmt",
          "level": "Expert",
          "category": "Sales Tools"
        },
        {
          "id": "3",
          "name": "Cold Outreach & Outbound Prospecting",
          "level": "Expert",
          "category": "Lead Generation"
        },
        {
          "id": "4",
          "name": "Discovery & Executive Presentations",
          "level": "Expert",
          "category": "Sales Execution"
        },
        {
          "id": "5",
          "name": "ZoomInfo & LinkedIn Sales Navigator",
          "level": "Expert",
          "category": "Sales Tools"
        },
        {
          "id": "6",
          "name": "Outreach.io & SalesLoft Sequences",
          "level": "Expert",
          "category": "Sales Tools"
        },
        {
          "id": "7",
          "name": "Contract Negotiation & Objection Handling",
          "level": "Expert",
          "category": "Deal Structuring"
        },
        {
          "id": "8",
          "name": "Territory Growth Strategy",
          "level": "Advanced",
          "category": "Strategy"
        },
        {
          "id": "9",
          "name": "Consultative Solution Selling",
          "level": "Expert",
          "category": "Sales Execution"
        },
        {
          "id": "10",
          "name": "Customer Relationship Retention",
          "level": "Advanced",
          "category": "Account Management"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Midwest Regional Sales Outbound Campaign",
          "description": "Orchestrated outbound prospecting campaign across 600 targeted commercial accounts, booking 84 executive demos and closing $1.4M in ARR.",
          "technologies": [
            "Salesforce",
            "Outreach.io",
            "ZoomInfo",
            "Consultative Selling"
          ],
          "link": "samanthahayes.pro/outbound-campaign"
        }
      ]
    }
  },
  {
    "id": "academic-cv",
    "name": "Academic CV",
    "description": "Structured for research, teaching, and academic positions.",
    "category": "Academic",
    "difficulty": "Hard",
    "isPremium": true,
    "sampleData": {
      "personalInfo": {
        "firstName": "Dr. Christopher",
        "lastName": "Ward",
        "title": "Associate Professor of Computer Science & Quantitative Research",
        "email": "christopher.ward@university.edu",
        "phone": "+1 (555) 556-6778",
        "location": "Philadelphia, PA",
        "linkedin": "linkedin.com/in/drchristopherward",
        "website": "christopherward-academic.org"
      },
      "summary": "Accomplished Tenured Associate Professor of Computer Science with 11+ years of university teaching, curriculum development, and academic research excellence in distributed systems and algorithmic game theory. Published 24 peer-reviewed IEEE/ACM papers, secured $3.6M in NSF research grants, and advised 8 Ph.D. dissertations.",
      "experience": [
        {
          "id": "1",
          "company": "University of Pennsylvania",
          "position": "Associate Professor of Computer Science",
          "startDate": "Sep 2018",
          "endDate": "Present",
          "current": true,
          "description": [
            "Taught undergraduate and graduate courses in Advanced Distributed Systems and Algorithms to 600+ students annually.",
            "Secured $3.6M as Principal Investigator (PI) across 3 National Science Foundation (NSF) research awards.",
            "Published 14 peer-reviewed manuscripts in top-tier conferences including ACM SIGCOMM, IEEE S&P, and OSDI.",
            "Supervised and graduated 8 Ph.D. candidates who secured tenure-track faculty and top industry research positions."
          ]
        },
        {
          "id": "2",
          "company": "Princeton University",
          "position": "Assistant Professor & Postdoctoral Fellow",
          "startDate": "Aug 2013",
          "endDate": "Jul 2018",
          "current": false,
          "description": [
            "Designed novel course curriculum for undergraduate Data Structures and Cloud Architecture with 4.9/5.0 student ratings.",
            "Published 10 peer-reviewed research papers on consensus algorithms and fault-tolerant distributed databases.",
            "Chaired Departmental Graduate Admissions Committee, evaluating 800+ international graduate applications annually.",
            "Awarded University Excellence in Teaching Award and NSF CAREER Research Award."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Carnegie Mellon University",
          "degree": "Doctor of Philosophy (Ph.D.)",
          "field": "Computer Science (Distributed Systems)",
          "startDate": "2008",
          "endDate": "2013",
          "gpa": "4.00"
        },
        {
          "id": "2",
          "institution": "Cornell University",
          "degree": "Bachelor of Science",
          "field": "Computer Science & Mathematics",
          "startDate": "2004",
          "endDate": "2008",
          "gpa": "3.94"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Distributed Systems & Consensus Protocols",
          "level": "Expert",
          "category": "Academic Research"
        },
        {
          "id": "2",
          "name": "University Teaching & Curriculum Design",
          "level": "Expert",
          "category": "Pedagogy"
        },
        {
          "id": "3",
          "name": "NSF & Federal Grant Proposal Writing",
          "level": "Expert",
          "category": "Grant Management"
        },
        {
          "id": "4",
          "name": "C++, Rust, Python & Go Programming",
          "level": "Expert",
          "category": "Languages"
        },
        {
          "id": "5",
          "name": "Algorithm Analysis & Complexity Theory",
          "level": "Expert",
          "category": "Computer Science"
        },
        {
          "id": "6",
          "name": "Ph.D. & Graduate Student Mentorship",
          "level": "Expert",
          "category": "Academic Leadership"
        },
        {
          "id": "7",
          "name": "Peer-Reviewed Publishing (ACM/IEEE)",
          "level": "Expert",
          "category": "Publishing"
        },
        {
          "id": "8",
          "name": "Formal Verification & Mathematical Proofs",
          "level": "Advanced",
          "category": "Mathematics"
        },
        {
          "id": "9",
          "name": "Academic Conference Committee Chairing",
          "level": "Expert",
          "category": "Academic Service"
        },
        {
          "id": "10",
          "name": "Linux Kernel & System Call Optimization",
          "level": "Advanced",
          "category": "Systems"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "VeriSync: Formally Verified Consensus Protocol",
          "description": "Engineered Byzantine fault-tolerant consensus protocol proven in Coq, achieving 4x throughput improvement over traditional Raft.",
          "technologies": [
            "C++",
            "Rust",
            "Coq Formal Proof",
            "Distributed Systems"
          ],
          "link": "christopherward-academic.org/verisync"
        }
      ]
    }
  },
  {
    "id": "healthcare-nursing",
    "name": "Healthcare Professional",
    "description": "Tailored for nurses, doctors, and healthcare workers.",
    "category": "Healthcare",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Amanda",
        "lastName": "Collins",
        "title": "Supervising Emergency Care & Intensive Care Nurse (BSN, RN)",
        "email": "amanda.collins@email.com",
        "phone": "+1 (555) 667-7889",
        "location": "Houston, TX",
        "linkedin": "linkedin.com/in/amandacollins-rn",
        "website": "amandacollins-nurse.org"
      },
      "summary": "Dedicated and resilient Supervising Emergency Department & Trauma Nurse with 8+ years of experience managing rapid triage, acute resuscitation, and critical patient care. Directed shift operations for 40+ medical staff, triaged 12,000+ emergency cases annually with zero triage misclassifications, and achieved 99.2% clinical compliance.",
      "experience": [
        {
          "id": "1",
          "company": "Houston Methodist Hospital",
          "position": "Charge Nurse - Emergency & Trauma Department",
          "startDate": "Jan 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Supervised clinical shift operations and staffing for 35 registered nurses and medical staff in Level 1 Trauma Center.",
            "Triaged and coordinated emergency intervention for 12,000+ annual acute trauma and cardiac arrest admissions.",
            "Reduced door-to-balloon time for STEMI cardiac patients from 68 minutes to 42 minutes (-38%), saving critical patient lives.",
            "Championed departmental clinical safety audits, achieving 99.2% Joint Commission (JCAHO) inspection score."
          ]
        },
        {
          "id": "2",
          "company": "Memorial Hermann Health System",
          "position": "Staff Emergency Room Registered Nurse (RN)",
          "startDate": "May 2016",
          "endDate": "Dec 2020",
          "current": false,
          "description": [
            "Delivered rapid trauma stabilization, advanced airway management, and IV vascular access for 30+ critical patients per shift.",
            "Administered emergency cardiac medications and titrated vasopressors with 100% medication safety accuracy.",
            "Trained 28 newly hired graduate nurses in trauma resuscitation, electronic health records (Epic), and bedside protocols.",
            "Honored with Emergency Department Nurse of the Year Award for exceptional crisis leadership and clinical proficiency."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "University of Texas Health Science Center at Houston",
          "degree": "Bachelor of Science in Nursing (BSN)",
          "field": "Nursing Practice & Emergency Medicine",
          "startDate": "2012",
          "endDate": "2016",
          "gpa": "3.91"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Emergency Triage & Trauma Resuscitation",
          "level": "Expert",
          "category": "Clinical Specialties"
        },
        {
          "id": "2",
          "name": "ACLS, BLS, PALS & TNCC Certified",
          "level": "Expert",
          "category": "Certifications"
        },
        {
          "id": "3",
          "name": "Cardiac Monitoring & ECG Interpretation",
          "level": "Expert",
          "category": "Clinical Specialties"
        },
        {
          "id": "4",
          "name": "Epic Systems EHR Documentation",
          "level": "Expert",
          "category": "Healthcare IT"
        },
        {
          "id": "5",
          "name": "IV Access, Central Lines & Phlebotomy",
          "level": "Expert",
          "category": "Clinical Skills"
        },
        {
          "id": "6",
          "name": "Charge Nurse & Shift Leadership",
          "level": "Expert",
          "category": "Administration"
        },
        {
          "id": "7",
          "name": "Rapid Response & Code Blue Protocol",
          "level": "Expert",
          "category": "Clinical Specialties"
        },
        {
          "id": "8",
          "name": "Medication Administration & Titration",
          "level": "Expert",
          "category": "Pharmacology"
        },
        {
          "id": "9",
          "name": "Patient Advocacy & Family Crisis Support",
          "level": "Expert",
          "category": "Patient Care"
        },
        {
          "id": "10",
          "name": "Joint Commission & OSHA Compliance",
          "level": "Expert",
          "category": "Compliance"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Emergency Rapid Triage Flow Optimization",
          "description": "Designed protocol redesign reducing emergency room patient wait times by 32 minutes while maintaining zero clinical escalation delays.",
          "technologies": [
            "Epic EHR",
            "Triage Protocol",
            "Quality Improvement",
            "Patient Care"
          ],
          "link": "amandacollins-nurse.org/triage-optimization"
        }
      ]
    }
  },
  {
    "id": "navy-professional",
    "name": "Navy Professional",
    "description": "Sophisticated dark blue design perfect for modern professionals",
    "category": "Professional",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Nathan",
        "lastName": "Drake",
        "title": "Senior Technical Operations & Project Manager",
        "email": "nathan.drake@email.com",
        "phone": "+1 (555) 778-8990",
        "location": "San Diego, CA",
        "linkedin": "linkedin.com/in/nathandrake-pm",
        "website": "nathandrake.pro"
      },
      "summary": "Disciplined and mission-driven Senior Technical Project & Operations Manager (PMP Certified) with 9+ years of experience leading complex IT infrastructure, engineering programs, and cross-functional teams. Delivered 30+ multi-million-dollar technology deployments with 100% on-time budget adherence and reduced operational risk by 45%.",
      "experience": [
        {
          "id": "1",
          "company": "Maritime Defense & Cloud Systems",
          "position": "Senior Technical Operations Manager",
          "startDate": "Jan 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Directed cross-functional technical teams of 32 engineers delivering $18M in secure cloud communications systems.",
            "Spearheaded transition to Agile/Scrum delivery frameworks, improving milestone completion velocity by 38%.",
            "Managed risk mitigation strategies and vendor SLAs, reducing project delivery blockers by 45%.",
            "Delivered 14 mission-critical software releases on schedule with zero critical post-launch incidents."
          ]
        },
        {
          "id": "2",
          "company": "Pacific Defense Technologies",
          "position": "Operations & Logistics Program Lead",
          "startDate": "Jun 2016",
          "endDate": "Dec 2020",
          "current": false,
          "description": [
            "Managed supply chain logistics and IT equipment deployments valued at $45M across 8 regional operational facilities.",
            "Engineered automated inventory tracking system that eliminated manual reconciliation and reduced discrepancies by 92%.",
            "Led comprehensive security compliance audits ensuring 100% adherence to NIST and DoD cybersecurity standards.",
            "Trained and mentored 45 technical personnel in project execution, quality assurance, and operational safety."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "University of California, San Diego",
          "degree": "Bachelor of Science",
          "field": "Systems Engineering & Project Management",
          "startDate": "2012",
          "endDate": "2016",
          "gpa": "3.82"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Project Management Professional (PMP)",
          "level": "Expert",
          "category": "Certifications"
        },
        {
          "id": "2",
          "name": "Agile, Scrum & Kanban Frameworks",
          "level": "Expert",
          "category": "Methodologies"
        },
        {
          "id": "3",
          "name": "Technical Operations & Infrastructure",
          "level": "Expert",
          "category": "Operations"
        },
        {
          "id": "4",
          "name": "Risk Management & Mitigation (RCA)",
          "level": "Expert",
          "category": "Management"
        },
        {
          "id": "5",
          "name": "Jira, Confluence & Asana Workflows",
          "level": "Expert",
          "category": "Project Tools"
        },
        {
          "id": "6",
          "name": "Budgeting & Resource Allocation ($18M+)",
          "level": "Expert",
          "category": "Financial"
        },
        {
          "id": "7",
          "name": "Vendor SLA & Contract Management",
          "level": "Advanced",
          "category": "Management"
        },
        {
          "id": "8",
          "name": "NIST & DoD Cybersecurity Standards",
          "level": "Advanced",
          "category": "Compliance"
        },
        {
          "id": "9",
          "name": "Stakeholder & Executive Communication",
          "level": "Expert",
          "category": "Leadership"
        },
        {
          "id": "10",
          "name": "Process Automation & Continuous Improvement",
          "level": "Advanced",
          "category": "Operations"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Enterprise Cloud Communications Rollout",
          "description": "Led $18M multi-site cloud infrastructure deployment across 8 enterprise hubs with zero downtime and 100% security audit compliance.",
          "technologies": [
            "PMP",
            "Jira",
            "Agile Delivery",
            "AWS",
            "Risk Management"
          ],
          "link": "nathandrake.pro/cloud-rollout"
        }
      ]
    }
  },
  {
    "id": "charcoal-executive",
    "name": "Charcoal Executive",
    "description": "Elegant charcoal accents for senior and executive roles",
    "category": "Executive",
    "difficulty": "Hard",
    "isPremium": true,
    "sampleData": {
      "personalInfo": {
        "firstName": "Arthur",
        "lastName": "Pendelton",
        "title": "Managing Director & Chief Strategy Officer",
        "email": "arthur.pendelton@email.com",
        "phone": "+1 (555) 889-9001",
        "location": "New York, NY",
        "linkedin": "linkedin.com/in/arthurpendelton-exec",
        "website": "arthurpendelton.com"
      },
      "summary": "Accomplished Managing Director and Chief Strategy Officer with 16+ years of executive leadership driving corporate growth, M&A integration, and enterprise business transformation. Orchestrated $2.8B in strategic acquisitions, expanded global business unit EBITDA by 44%, and led global organizations of 200+ professionals.",
      "experience": [
        {
          "id": "1",
          "company": "Sterling & Co. Capital Advisors",
          "position": "Managing Director & Global Head of Strategy",
          "startDate": "Jan 2019",
          "endDate": "Present",
          "current": true,
          "description": [
            "Formulated global corporate strategy across 5 business divisions, generating $420M in incremental enterprise valuation.",
            "Orchestrated $2.8B across 9 cross-border strategic acquisitions and successfully completed post-merger integrations.",
            "Expanded divisional operating EBITDA margins by 44% through operational restructuring and digital transformation.",
            "Advised Fortune 100 Boards of Directors on capital allocation, international market entry, and risk governance."
          ]
        },
        {
          "id": "2",
          "company": "McKinsey & Company",
          "position": "Partner - Corporate Strategy & Operations",
          "startDate": "Sep 2012",
          "endDate": "Dec 2018",
          "current": false,
          "description": [
            "Led 35+ executive consulting engagements for global tech, financial services, and energy conglomerates.",
            "Delivered operational turnaround programs that unlocked $180M in recurring cost efficiencies for Fortune 500 clients.",
            "Mentored and managed consulting cohorts of 25+ senior engagement managers and strategy associates.",
            "Co-authored 8 McKinsey Global Institute thought-leadership publications on digital transformation and executive strategy."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Harvard Business School",
          "degree": "Master of Business Administration (MBA)",
          "field": "General Management & Corporate Strategy",
          "startDate": "2010",
          "endDate": "2012",
          "gpa": "3.94"
        },
        {
          "id": "2",
          "institution": "Yale University",
          "degree": "Bachelor of Arts",
          "field": "Economics & Political Science",
          "startDate": "2004",
          "endDate": "2008",
          "gpa": "3.91"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Corporate Strategy & Governance",
          "level": "Expert",
          "category": "Executive Leadership"
        },
        {
          "id": "2",
          "name": "Mergers & Acquisitions (M&A) Due Diligence",
          "level": "Expert",
          "category": "Strategic Finance"
        },
        {
          "id": "3",
          "name": "P&L Management ($400M+)",
          "level": "Expert",
          "category": "Financial Management"
        },
        {
          "id": "4",
          "name": "EBITDA Margin Optimization",
          "level": "Expert",
          "category": "Strategic Finance"
        },
        {
          "id": "5",
          "name": "Board of Directors Advisory",
          "level": "Expert",
          "category": "Executive Leadership"
        },
        {
          "id": "6",
          "name": "Enterprise Digital Transformation",
          "level": "Expert",
          "category": "Operations"
        },
        {
          "id": "7",
          "name": "International Expansion & Market Entry",
          "level": "Expert",
          "category": "Commercial"
        },
        {
          "id": "8",
          "name": "Executive Talent Development & Hiring",
          "level": "Expert",
          "category": "Leadership"
        },
        {
          "id": "9",
          "name": "Capital Allocation & Corporate Finance",
          "level": "Expert",
          "category": "Strategic Finance"
        },
        {
          "id": "10",
          "name": "Stakeholder & Investor Relations",
          "level": "Expert",
          "category": "Executive Leadership"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "$1.4B Global Enterprise Merger Integration",
          "description": "Directed 18-month post-merger integration of 2 major European fintech institutions, achieving $65M in operational synergies.",
          "technologies": [
            "Corporate Strategy",
            "M&A Integration",
            "P&L Management",
            "Governance"
          ],
          "link": "arthurpendelton.com/merger-integration"
        }
      ]
    }
  },
  {
    "id": "forest-modern",
    "name": "Forest Modern",
    "description": "Fresh design with deep green accents",
    "category": "Creative",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Oliver",
        "lastName": "Greene",
        "title": "Lead Brand Identity & Creative Design Director",
        "email": "oliver.greene@email.com",
        "phone": "+1 (555) 990-0112",
        "location": "Portland, OR",
        "linkedin": "linkedin.com/in/olivergreene-creative",
        "website": "olivergreene.design"
      },
      "summary": "Visionary Lead Creative & Brand Identity Director with 8+ years of experience transforming brand narratives for global lifestyle and sustainable tech companies. Directed creative campaigns generating 40M+ organic impressions, increased customer brand recall by 62%, and managed design teams of 12+ creative specialists.",
      "experience": [
        {
          "id": "1",
          "company": "Verdant Creative Agency",
          "position": "Creative Director",
          "startDate": "Jan 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Directed brand identity transformations for 18 international sustainable technology and consumer lifestyle brands.",
            "Spearheaded multi-channel national ad campaign generating 40M+ organic social impressions and $8.5M in sales.",
            "Managed multidisciplinary creative squad of 12 art directors, 3D animators, copywriters, and UI designers.",
            "Won 4 Graphis Design Awards and 2 Cannes Lions shortlists for innovative sustainable packaging design."
          ]
        },
        {
          "id": "2",
          "company": "EcoStyle Media House",
          "position": "Senior Brand & Visual Designer",
          "startDate": "Mar 2017",
          "endDate": "Dec 2020",
          "current": false,
          "description": [
            "Designed cohesive visual design guidelines, typography hierarchy, and brand toolkits used across 45 retail stores.",
            "Boosted customer brand sentiment and engagement metrics by 62% across digital and print touchpoints.",
            "Collaborated with web developers to produce interactive WebGL brand experiences that won Awwwards Site of the Day.",
            "Managed annual creative production budget of $1.4M with 100% financial adherence and vendor compliance."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Pacific Northwest College of Art",
          "degree": "Bachelor of Fine Arts",
          "field": "Communication Design & Visual Identity",
          "startDate": "2013",
          "endDate": "2017",
          "gpa": "3.88"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Brand Identity & Visual Guidelines",
          "level": "Expert",
          "category": "Creative Direction"
        },
        {
          "id": "2",
          "name": "Adobe Creative Cloud (Illustrator, PS)",
          "level": "Expert",
          "category": "Design Tools"
        },
        {
          "id": "3",
          "name": "Figma & Interactive Prototyping",
          "level": "Expert",
          "category": "Digital Design"
        },
        {
          "id": "4",
          "name": "Creative Team Direction & Mentorship",
          "level": "Expert",
          "category": "Leadership"
        },
        {
          "id": "5",
          "name": "Packaging & Print Production",
          "level": "Expert",
          "category": "Print & Physical"
        },
        {
          "id": "6",
          "name": "Typography & Visual Hierarchy",
          "level": "Expert",
          "category": "Creative Direction"
        },
        {
          "id": "7",
          "name": "3D Motion Design & Cinema 4D",
          "level": "Advanced",
          "category": "Motion"
        },
        {
          "id": "8",
          "name": "Campaign Strategy & Copy Direction",
          "level": "Advanced",
          "category": "Creative Direction"
        },
        {
          "id": "9",
          "name": "Art Direction for Photography & Video",
          "level": "Expert",
          "category": "Production"
        },
        {
          "id": "10",
          "name": "UI/UX Visual Design Standards",
          "level": "Advanced",
          "category": "Digital Design"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Verdant Global Rebranding & Digital Experience",
          "description": "Orchestrated end-to-end brand identity overhaul for multi-national consumer goods company, increasing direct-to-consumer sales by 48%.",
          "technologies": [
            "Figma",
            "Illustrator",
            "3D Motion",
            "Brand Architecture"
          ],
          "link": "olivergreene.design/verdant"
        }
      ]
    }
  },
  {
    "id": "timeline-dark",
    "name": "Timeline Dark",
    "description": "A modern two-column layout featuring a prominent dark header and a vertical timeline connecting your experience.",
    "category": "Technology",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Alexander",
        "lastName": "Sterling",
        "title": "Senior Distributed Systems & Backend Engineer",
        "email": "alexander.sterling@email.com",
        "phone": "+1 (555) 102-9384",
        "location": "San Francisco, CA",
        "linkedin": "linkedin.com/in/alexandersterling-dev",
        "website": "alexandersterling.dev"
      },
      "summary": "High-performing Senior Distributed Systems Software Engineer with 8+ years of experience engineering high-throughput, low-latency microservices architectures. Architected Kafka data pipelines ingesting 100k+ events/second, reduced database query latency by 58%, and scaled distributed systems for 4M+ active users.",
      "experience": [
        {
          "id": "1",
          "company": "Apex Cloud Architecture",
          "position": "Senior Distributed Systems Engineer",
          "startDate": "Jan 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Architected distributed microservices in Go and Rust handling 4M+ daily active users with 99.99% availability.",
            "Engineered event-driven Apache Kafka stream processing engine ingesting 100k+ events/sec with sub-25ms latency.",
            "Optimized Cassandra and PostgreSQL database cluster sharding, slashing P99 query latency from 320ms to 45ms (-86%).",
            "Mentored 6 junior engineers and instituted automated chaos testing routines that decreased system outages by 65%."
          ]
        },
        {
          "id": "2",
          "company": "Nexus Real-Time Systems",
          "position": "Backend Software Engineer",
          "startDate": "May 2017",
          "endDate": "Dec 2020",
          "current": false,
          "description": [
            "Engineered high-performance gRPC and REST APIs in Go and Java Spring Boot serving 120M+ monthly requests.",
            "Implemented distributed Redis caching layer that reduced database load by 55% during peak holiday traffic surges.",
            "Designed automated Docker and Kubernetes deployment manifests with zero downtime rolling update strategies.",
            "Resolved 45+ critical high-severity production concurrency bottlenecks in multithreaded runtime environments."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "University of California, Berkeley",
          "degree": "Bachelor of Science",
          "field": "Computer Science & Distributed Systems",
          "startDate": "2013",
          "endDate": "2017",
          "gpa": "3.89"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Go (Golang) & Rust",
          "level": "Expert",
          "category": "Languages"
        },
        {
          "id": "2",
          "name": "Distributed Systems Architecture",
          "level": "Expert",
          "category": "Architecture"
        },
        {
          "id": "3",
          "name": "Apache Kafka & RabbitMQ",
          "level": "Expert",
          "category": "Event Streaming"
        },
        {
          "id": "4",
          "name": "gRPC & Protocol Buffers",
          "level": "Expert",
          "category": "Networking & APIs"
        },
        {
          "id": "5",
          "name": "PostgreSQL, Cassandra & Redis",
          "level": "Expert",
          "category": "Databases"
        },
        {
          "id": "6",
          "name": "Kubernetes (EKS) & Docker",
          "level": "Advanced",
          "category": "DevOps"
        },
        {
          "id": "7",
          "name": "Java & Spring Boot Microservices",
          "level": "Advanced",
          "category": "Languages & Frameworks"
        },
        {
          "id": "8",
          "name": "Prometheus, Grafana & Jaeger Tracing",
          "level": "Advanced",
          "category": "Observability"
        },
        {
          "id": "9",
          "name": "Multithreading & Concurrency",
          "level": "Expert",
          "category": "Systems"
        },
        {
          "id": "10",
          "name": "Linux Performance & eBPF Profiling",
          "level": "Advanced",
          "category": "Systems"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Distributed Low-Latency Key-Value Store",
          "description": "Engineered high-availability Raft consensus key-value store in Go processing 250k read/write ops/sec with sub-5ms latency.",
          "technologies": [
            "Go",
            "Raft Consensus",
            "gRPC",
            "RocksDB",
            "Docker"
          ],
          "link": "github.com/alexandersterling/distributed-kv"
        }
      ]
    }
  },
  {
    "id": "navy-sidebar",
    "name": "Navy Sidebar",
    "description": "A clean two-column design with a striking navy sidebar to highlight contact details and technical skills.",
    "category": "Data",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Elena",
        "lastName": "Vasquez",
        "title": "Lead Data Architect & Machine Learning Engineer",
        "email": "elena.vasquez@email.com",
        "phone": "+1 (555) 203-9485",
        "location": "San Jose, CA",
        "linkedin": "linkedin.com/in/elenavasquez-data",
        "website": "elenavasquez.ai"
      },
      "summary": "Distinguished Lead Data Architect & Machine Learning Engineer with 9+ years of experience architecting enterprise lakehouses, distributed ETL pipelines, and production MLOps platforms. Built Snowflake data platforms processing 50TB+ daily, reduced query processing costs by $1.2M (-48%), and deployed ML models serving 10M+ predictions daily.",
      "experience": [
        {
          "id": "1",
          "company": "Quantum Analytics Group",
          "position": "Lead Data Architect & MLOps Lead",
          "startDate": "Jan 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Architected enterprise Snowflake and Databricks lakehouse processing 50TB+ daily data from 120+ SaaS data sources.",
            "Spearheaded production MLOps pipeline using MLflow and Kubeflow, deploying 15+ models serving 10M+ daily predictions.",
            "Optimized Spark SQL distributed queries and partitioning schemas, cutting annual cloud compute costs by $1.2M (-48%).",
            "Led a high-performing engineering team of 10 data engineers and ML scientists with 100% project delivery adherence."
          ]
        },
        {
          "id": "2",
          "company": "OmniData Technologies",
          "position": "Senior Data Engineer",
          "startDate": "Jun 2017",
          "endDate": "Dec 2020",
          "current": false,
          "description": [
            "Engineered automated ETL pipelines in Apache Airflow and PySpark, reducing data ingestion latency from 8 hours to 12 minutes.",
            "Designed dimensional star-schema data warehouses supporting business intelligence reporting for 800+ internal stakeholders.",
            "Automated data quality validation and schema enforcement utilizing dbt and Great Expectations, eliminating 98% of data bugs.",
            "Mentored 6 junior data engineers in data modeling, SQL optimization, and cloud storage best practices."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Stanford University",
          "degree": "Master of Science",
          "field": "Data Science & Machine Learning Systems",
          "startDate": "2015",
          "endDate": "2017",
          "gpa": "3.92"
        },
        {
          "id": "2",
          "institution": "University of California, Davis",
          "degree": "Bachelor of Science",
          "field": "Computer Science & Applied Mathematics",
          "startDate": "2011",
          "endDate": "2015",
          "gpa": "3.86"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Snowflake & Databricks Lakehouse",
          "level": "Expert",
          "category": "Data Architecture"
        },
        {
          "id": "2",
          "name": "PySpark & Apache Spark Distributed",
          "level": "Expert",
          "category": "Data Engineering"
        },
        {
          "id": "3",
          "name": "Apache Airflow & dbt Core",
          "level": "Expert",
          "category": "Orchestration & ETL"
        },
        {
          "id": "4",
          "name": "Python, SQL & Scala Programming",
          "level": "Expert",
          "category": "Languages"
        },
        {
          "id": "5",
          "name": "MLOps (MLflow, Kubeflow, Feast)",
          "level": "Expert",
          "category": "Machine Learning"
        },
        {
          "id": "6",
          "name": "AWS (S3, EMR, Redshift, Glue)",
          "level": "Expert",
          "category": "Cloud Infrastructure"
        },
        {
          "id": "7",
          "name": "Kafka & Real-Time Data Streaming",
          "level": "Advanced",
          "category": "Data Streaming"
        },
        {
          "id": "8",
          "name": "Dimensional Modeling & Data Vault 2.0",
          "level": "Expert",
          "category": "Data Modeling"
        },
        {
          "id": "9",
          "name": "TensorFlow & Scikit-Learn",
          "level": "Advanced",
          "category": "Machine Learning"
        },
        {
          "id": "10",
          "name": "Docker, Kubernetes & CI/CD Pipelines",
          "level": "Advanced",
          "category": "DevOps"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Enterprise Real-Time Feature Store & MLOps Platform",
          "description": "Architected low-latency feature store serving real-time machine learning inference features with sub-10ms response times.",
          "technologies": [
            "Snowflake",
            "Databricks",
            "MLflow",
            "Airflow",
            "PySpark",
            "AWS"
          ],
          "link": "github.com/elenavasquez/mlops-feature-store"
        }
      ]
    }
  },
  {
    "id": "modern-yellow",
    "name": "Modern Yellow",
    "description": "A striking split layout featuring a bold yellow sidebar to highlight contact details and skills.",
    "category": "Creative",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Leo",
        "lastName": "Castillo",
        "title": "Senior Interactive UI/UX & Motion Designer",
        "email": "leo.castillo@email.com",
        "phone": "+1 (555) 304-9586",
        "location": "Los Angeles, CA",
        "linkedin": "linkedin.com/in/leocastillo-design",
        "website": "leocastillo.design"
      },
      "summary": "Dynamic and innovative Senior UI/UX & Motion Designer with 7+ years of experience crafting interactive digital products, mobile applications, and high-impact design systems. Designed award-winning web interfaces for 30+ tech startups, increased user engagement by 65%, and boosted trial conversion rates by 42%.",
      "experience": [
        {
          "id": "1",
          "company": "Verve Interactive Studio",
          "position": "Senior UI/UX & Interaction Designer",
          "startDate": "Feb 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Spearheaded interactive web design and micro-animation systems for 20+ venture-backed tech startups.",
            "Redesigned SaaS customer portal resulting in 42% increase in trial-to-paid conversion rates within 90 days.",
            "Created comprehensive Figma tokenized component library adopted by 40+ frontend engineers.",
            "Won 3 Awwwards Site of the Day and 2 FWA recognitions for pioneering 3D WebGL motion experiences."
          ]
        },
        {
          "id": "2",
          "company": "Prism Digital Agency",
          "position": "UI/UX Visual Designer",
          "startDate": "Jun 2017",
          "endDate": "Jan 2021",
          "current": false,
          "description": [
            "Designed mobile iOS and Android applications generating 1.5M+ cumulative downloads on App Store.",
            "Conducted 50+ user testing sessions, translating qualitative feedback into wireframes and high-fidelity prototypes.",
            "Collaborated with React and Three.js frontend engineers to ensure pixel-perfect design implementation.",
            "Trained 5 junior designers in interaction prototyping, user empathy mapping, and design system governance."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "ArtCenter College of Design",
          "degree": "Bachelor of Science",
          "field": "Interaction & Visual Experience Design",
          "startDate": "2013",
          "endDate": "2017",
          "gpa": "3.85"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Figma & Design Systems Tokens",
          "level": "Expert",
          "category": "Design Tools"
        },
        {
          "id": "2",
          "name": "UI/UX Wireframing & Prototyping",
          "level": "Expert",
          "category": "UI/UX Design"
        },
        {
          "id": "3",
          "name": "Motion Design & After Effects",
          "level": "Expert",
          "category": "Motion"
        },
        {
          "id": "4",
          "name": "Rive & Lottie Micro-Animations",
          "level": "Expert",
          "category": "Motion"
        },
        {
          "id": "5",
          "name": "User Testing & Usability Research",
          "level": "Advanced",
          "category": "Research"
        },
        {
          "id": "6",
          "name": "HTML5, CSS3 & Tailwind CSS",
          "level": "Advanced",
          "category": "Technical"
        },
        {
          "id": "7",
          "name": "Three.js & WebGL Visual Concepts",
          "level": "Intermediate",
          "category": "Technical"
        },
        {
          "id": "8",
          "name": "Adobe Creative Suite (PS, AI, XD)",
          "level": "Expert",
          "category": "Design Tools"
        },
        {
          "id": "9",
          "name": "Information Architecture",
          "level": "Advanced",
          "category": "UI/UX Design"
        },
        {
          "id": "10",
          "name": "Mobile App Interface Design (iOS/Android)",
          "level": "Expert",
          "category": "UI/UX Design"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Apex Interactive Fintech Mobile Platform",
          "description": "Architected mobile banking application with seamless biometric authentication, micro-interactions, and 4.9-star rating across 250k users.",
          "technologies": [
            "Figma",
            "Protopie",
            "Design System",
            "After Effects"
          ],
          "link": "leocastillo.design/apex-fintech"
        }
      ]
    }
  },
  {
    "id": "formal-red",
    "name": "Formal Red",
    "description": "A classic formal resume with elegant serif fonts and distinguished red accents.",
    "category": "Professional",
    "difficulty": "Hard",
    "isPremium": true,
    "sampleData": {
      "personalInfo": {
        "firstName": "Victoria",
        "lastName": "Sterling",
        "title": "Senior Corporate Legal Counsel & Compliance Director (JD)",
        "email": "victoria.sterling@email.com",
        "phone": "+1 (555) 405-9687",
        "location": "Washington, DC",
        "linkedin": "linkedin.com/in/victoriasterling-jd",
        "website": "victoriasterling-legal.com"
      },
      "summary": "Distinguished Corporate Legal Counsel & Regulatory Compliance Director with 12+ years of experience structuring multi-billion dollar commercial contracts, managing enterprise risk, and navigating international SEC and GDPR governance. Negotiated $1.8B+ in complex M&A agreements with zero regulatory penalties.",
      "experience": [
        {
          "id": "1",
          "company": "Vanguard Global Enterprise Legal",
          "position": "Senior Corporate Legal Counsel & Compliance Director",
          "startDate": "Jan 2019",
          "endDate": "Present",
          "current": true,
          "description": [
            "Advised Executive Leadership and Board of Directors on corporate governance, SEC filings, and cross-border regulatory compliance.",
            "Structured, drafted, and negotiated 150+ enterprise technology and SaaS agreements totaling $1.8B in contract value.",
            "Engineered corporate data privacy compliance program for GDPR, CCPA, and HIPAA, reducing corporate exposure by 60%.",
            "Managed outside litigation defense counsel, resolving commercial disputes and saving $14M in potential liabilities."
          ]
        },
        {
          "id": "2",
          "company": "Covington & Burling LLP",
          "position": "Senior Corporate Associate Attorney",
          "startDate": "Sep 2013",
          "endDate": "Dec 2018",
          "current": false,
          "description": [
            "Executed 28 strategic M&A transactions and corporate restructuring agreements with aggregate deal value of $3.5B.",
            "Conducted extensive legal due diligence, antitrust regulatory reviews, and Hart-Scott-Rodino (HSR) filings.",
            "Drafted master service agreements (MSAs), intellectual property licensing contracts, and executive employment packages.",
            "Supervised junior associate attorneys and legal paralegals with 100% compliance across all filing deadlines."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Georgetown University Law Center",
          "degree": "Juris Doctor (J.D.)",
          "field": "Corporate Law & Securities Regulation",
          "startDate": "2010",
          "endDate": "2013",
          "gpa": "3.91"
        },
        {
          "id": "2",
          "institution": "University of Virginia",
          "degree": "Bachelor of Arts",
          "field": "Economics & History",
          "startDate": "2006",
          "endDate": "2010",
          "gpa": "3.89"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Corporate Governance & Board Advisory",
          "level": "Expert",
          "category": "Legal & Governance"
        },
        {
          "id": "2",
          "name": "M&A Transactions & Due Diligence",
          "level": "Expert",
          "category": "Corporate Transactions"
        },
        {
          "id": "3",
          "name": "Enterprise Contract Negotiation ($1.8B+)",
          "level": "Expert",
          "category": "Commercial Law"
        },
        {
          "id": "4",
          "name": "SEC Compliance & Securities Filings",
          "level": "Expert",
          "category": "Regulatory Compliance"
        },
        {
          "id": "5",
          "name": "GDPR, CCPA & Data Privacy Law",
          "level": "Expert",
          "category": "Privacy & Compliance"
        },
        {
          "id": "6",
          "name": "Intellectual Property Licensing",
          "level": "Advanced",
          "category": "IP Law"
        },
        {
          "id": "7",
          "name": "Commercial Litigation & Dispute Resolution",
          "level": "Advanced",
          "category": "Litigation Management"
        },
        {
          "id": "8",
          "name": "Antitrust & Regulatory Filings",
          "level": "Advanced",
          "category": "Regulatory Compliance"
        },
        {
          "id": "9",
          "name": "Risk Assessment & Compliance Audits",
          "level": "Expert",
          "category": "Risk Management"
        },
        {
          "id": "10",
          "name": "District of Columbia & NY Bar Member",
          "level": "Expert",
          "category": "Bar Admissions"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "$650M International Technology Acquisition Governance",
          "description": "Spearheaded comprehensive legal and regulatory due diligence for cross-border tech acquisition, obtaining unconditional antitrust approvals.",
          "technologies": [
            "Corporate Law",
            "M&A Due Diligence",
            "Antitrust Filing",
            "Regulatory Governance"
          ],
          "link": "victoriasterling-legal.com/merger-governance"
        }
      ]
    }
  },
  {
    "id": "geometric-blue",
    "name": "Geometric Blue",
    "description": "A modern design featuring a striking geometric header and clearly structured timeline sections.",
    "category": "Creative",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Julian",
        "lastName": "Mercer",
        "title": "Senior Product Designer & Design Systems Lead",
        "email": "julian.mercer@email.com",
        "phone": "+1 (555) 506-9788",
        "location": "San Francisco, CA",
        "linkedin": "linkedin.com/in/julianmercer-design",
        "website": "julianmercer.design"
      },
      "summary": "Strategic Senior Product Designer & Design Systems Architect with 8+ years of experience building scalable design languages for enterprise SaaS platforms. Created multi-platform tokenized design systems used by 120+ engineers, reduced front-end UI bugs by 65%, and boosted customer product satisfaction scores to 94%.",
      "experience": [
        {
          "id": "1",
          "company": "Helix Cloud Technologies",
          "position": "Senior Design Systems Lead",
          "startDate": "Jan 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Architected scalable multi-brand Figma design system supporting 14 enterprise product suites and 120+ software engineers.",
            "Reduced design-to-development handoff cycle from 3 weeks to 3 days (-80%) through automated Figma-to-React tokens.",
            "Conducted accessibility audits ensuring 100% WCAG 2.1 AA compliance across 350+ production web components.",
            "Mentored 6 product designers and established design review councils, increasing UI consistency scores from 64% to 98%."
          ]
        },
        {
          "id": "2",
          "company": "Vortex Interactive Labs",
          "position": "Senior Product Designer",
          "startDate": "May 2017",
          "endDate": "Dec 2020",
          "current": false,
          "description": [
            "Led end-to-end UX/UI redesign for core SaaS project management app, scaling active user base from 150k to 1.2M users.",
            "Boosted customer activation rates by 48% by simplifying multi-step user onboarding and workflow automation.",
            "Partnered with product managers and engineers in agile 2-week sprints delivering 100% of quarterly roadmap features.",
            "Authored 45+ comprehensive design documentation guidelines on Zeroheight and Storybook."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "California College of the Arts (CCA)",
          "degree": "Bachelor of Fine Arts",
          "field": "Interaction Design & Human-Computer Interaction",
          "startDate": "2013",
          "endDate": "2017",
          "gpa": "3.87"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Figma & Design Systems Architecture",
          "level": "Expert",
          "category": "Design Systems"
        },
        {
          "id": "2",
          "name": "Design Tokens & Zeroheight/Storybook",
          "level": "Expert",
          "category": "Design Systems"
        },
        {
          "id": "3",
          "name": "Product Discovery & Usability Testing",
          "level": "Expert",
          "category": "UX Research"
        },
        {
          "id": "4",
          "name": "WCAG 2.1 AA Accessibility Standards",
          "level": "Expert",
          "category": "Compliance"
        },
        {
          "id": "5",
          "name": "Wireframing & Interactive Prototyping",
          "level": "Expert",
          "category": "UI/UX Design"
        },
        {
          "id": "6",
          "name": "React.js, HTML5 & Tailwind CSS",
          "level": "Advanced",
          "category": "Technical"
        },
        {
          "id": "7",
          "name": "Information Architecture & User Flows",
          "level": "Expert",
          "category": "UX Strategy"
        },
        {
          "id": "8",
          "name": "Protopie & Advanced Micro-Interactions",
          "level": "Advanced",
          "category": "Prototyping"
        },
        {
          "id": "9",
          "name": "Adobe Creative Cloud Suite",
          "level": "Advanced",
          "category": "Design Tools"
        },
        {
          "id": "10",
          "name": "Cross-Functional Team Leadership",
          "level": "Expert",
          "category": "Leadership"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Helix Enterprise Design Language & Token Engine",
          "description": "Architected open-source enterprise token system accelerating front-end UI velocity by 45% across 14 product squads.",
          "technologies": [
            "Figma Tokens",
            "Storybook",
            "React",
            "Zeroheight",
            "Accessibility"
          ],
          "link": "julianmercer.design/helix-tokens"
        }
      ]
    }
  },
  {
    "id": "professional-navy",
    "name": "Professional Navy",
    "description": "A distinguished navy blue header coupled with a classic two-column presentation, ideal for experienced data analysts and engineers.",
    "category": "Data",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Gabriel",
        "lastName": "Moretti",
        "title": "Principal Business Intelligence & Data Analytics Lead",
        "email": "gabriel.moretti@email.com",
        "phone": "+1 (555) 607-9889",
        "location": "Chicago, IL",
        "linkedin": "linkedin.com/in/gabrielmoretti-bi",
        "website": "gabrielmoretti.data"
      },
      "summary": "Data analytics powerhouse and Principal Business Intelligence Architect with 10+ years of experience leading enterprise data warehousing, predictive analytics, and executive dashboard engineering. Built PowerBI and Tableau telemetry systems tracking $850M+ in annual revenue and reduced query latencies by 60%.",
      "experience": [
        {
          "id": "1",
          "company": "Apex Global Financial Analytics",
          "position": "Principal BI & Analytics Architect",
          "startDate": "Jan 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Architected enterprise PowerBI and Tableau reporting infrastructure tracking $850M+ in annual corporate revenue.",
            "Spearheaded dimensional modeling on Snowflake data warehouse, reducing query runtimes from 45 minutes to 45 seconds (-98%).",
            "Implemented automated predictive customer churn forecasting in Python, saving $12M in annual customer retention revenue.",
            "Supervised and mentored high-performing team of 12 data analysts, BI developers, and data engineers."
          ]
        },
        {
          "id": "2",
          "company": "Trident Data Intelligence",
          "position": "Senior Business Intelligence Developer",
          "startDate": "Mar 2016",
          "endDate": "Dec 2020",
          "current": false,
          "description": [
            "Designed 45+ interactive executive dashboards utilized daily by C-suite leaders for strategic operational planning.",
            "Automated daily ETL data extraction pipelines using SQL and Python scripts, eliminating 20+ hours of manual reporting weekly.",
            "Trained 250+ non-technical corporate business users across 6 departments in self-service BI reporting.",
            "Awarded Excellence in Analytics Award for delivering multi-touch marketing attribution model that unlocked $4.2M in ROI."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Northwestern University",
          "degree": "Master of Science",
          "field": "Predictive Analytics & Enterprise Data Science",
          "startDate": "2014",
          "endDate": "2016",
          "gpa": "3.93"
        },
        {
          "id": "2",
          "institution": "University of Michigan",
          "degree": "Bachelor of Science",
          "field": "Industrial Engineering & Operations Research",
          "startDate": "2010",
          "endDate": "2014",
          "gpa": "3.86"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "PowerBI (DAX, Power Query, Dataflows)",
          "level": "Expert",
          "category": "Business Intelligence"
        },
        {
          "id": "2",
          "name": "Tableau Desktop & Tableau Server",
          "level": "Expert",
          "category": "Business Intelligence"
        },
        {
          "id": "3",
          "name": "SQL (Snowflake, BigQuery, PostgreSQL)",
          "level": "Expert",
          "category": "Databases & Querying"
        },
        {
          "id": "4",
          "name": "Python (Pandas, NumPy, Scikit-Learn)",
          "level": "Expert",
          "category": "Programming & Data"
        },
        {
          "id": "5",
          "name": "Dimensional Modeling (Kimball Star Schema)",
          "level": "Expert",
          "category": "Data Architecture"
        },
        {
          "id": "6",
          "name": "ETL / ELT Pipelines & dbt Core",
          "level": "Advanced",
          "category": "Data Engineering"
        },
        {
          "id": "7",
          "name": "Predictive Statistical Modeling",
          "level": "Expert",
          "category": "Data Science"
        },
        {
          "id": "8",
          "name": "Excel (VBA, Power Pivot, Macros)",
          "level": "Expert",
          "category": "Data Analysis"
        },
        {
          "id": "9",
          "name": "Executive Presentation & Storytelling",
          "level": "Expert",
          "category": "Leadership"
        },
        {
          "id": "10",
          "name": "Data Governance & Data Quality (DQ)",
          "level": "Advanced",
          "category": "Governance"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Executive Financial Telemetry & Churn Analytics Hub",
          "description": "Engineered comprehensive real-time BI telemetry platform serving 500+ global corporate managers with automated executive alert triggers.",
          "technologies": [
            "PowerBI",
            "Snowflake",
            "Python",
            "SQL",
            "dbt"
          ],
          "link": "gabrielmoretti.data/bi-hub"
        }
      ]
    }
  },
  {
    "id": "clean-blue",
    "name": "Clean Blue Accent",
    "description": "A crisp, high-contrast resume template utilizing bright blue text accents and clear section separations.",
    "category": "Data",
    "difficulty": "Easy",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "William",
        "lastName": "Patel",
        "title": "Lead Cloud Database & Big Data Solutions Architect",
        "email": "william.patel@email.com",
        "phone": "+1 (555) 708-9900",
        "location": "Dallas, TX",
        "linkedin": "linkedin.com/in/williampatel-db",
        "website": "williampatel.cloud"
      },
      "summary": "High-impact Lead Cloud Database & Big Data Solutions Architect with 9+ years of experience designing resilient distributed database clusters, petabyte-scale data lakes, and automated real-time stream processing engines. Scaled cloud databases to support 15M+ active users with 99.999% availability and cut AWS database costs by 45%.",
      "experience": [
        {
          "id": "1",
          "company": "CloudData Solutions Corp",
          "position": "Lead Database Solutions Architect",
          "startDate": "Jan 2021",
          "endDate": "Present",
          "current": true,
          "description": [
            "Architected distributed multi-region AWS Aurora PostgreSQL and DynamoDB clusters supporting 15M+ active users.",
            "Spearheaded real-time Kafka streaming data lakehouse processing 2.5B+ daily financial records with sub-20ms latency.",
            "Optimized database indexing, vacuum strategies, and partition pruning, slashing cloud infrastructure costs by $1.4M (-45%).",
            "Supervised database engineering team of 8 senior DBAs and site reliability engineers with zero unplanned outages."
          ]
        },
        {
          "id": "2",
          "company": "Nexus Enterprise Databases",
          "position": "Senior Database Administrator & Architect",
          "startDate": "Mar 2016",
          "endDate": "Dec 2020",
          "current": false,
          "description": [
            "Migrated 85 TB of on-premise Oracle databases to AWS RDS PostgreSQL with zero customer data loss or downtime.",
            "Automated database disaster recovery replication across 3 geographic availability zones with RPO < 1 sec and RTO < 3 min.",
            "Engineered automated database provisioning and telemetry monitoring using Terraform, Prometheus, and Grafana.",
            "Conducted 50+ database performance tuning reviews, resolving query execution bottlenecks for top tier enterprise clients."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "University of Texas at Austin",
          "degree": "Bachelor of Science",
          "field": "Computer Engineering & Database Systems",
          "startDate": "2012",
          "endDate": "2016",
          "gpa": "3.88"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "PostgreSQL & AWS Aurora DB Tuning",
          "level": "Expert",
          "category": "Relational Databases"
        },
        {
          "id": "2",
          "name": "MongoDB, Cassandra & DynamoDB",
          "level": "Expert",
          "category": "NoSQL Databases"
        },
        {
          "id": "3",
          "name": "Apache Kafka & Distributed Streaming",
          "level": "Expert",
          "category": "Data Streaming"
        },
        {
          "id": "4",
          "name": "AWS Cloud Architecture (RDS, S3, EMR)",
          "level": "Expert",
          "category": "Cloud Infrastructure"
        },
        {
          "id": "5",
          "name": "Terraform & Infrastructure as Code",
          "level": "Advanced",
          "category": "DevOps"
        },
        {
          "id": "6",
          "name": "Database Replication, HA & Disaster Recovery",
          "level": "Expert",
          "category": "Reliability & SRE"
        },
        {
          "id": "7",
          "name": "SQL & Database Performance Optimization",
          "level": "Expert",
          "category": "Relational Databases"
        },
        {
          "id": "8",
          "name": "Python, BASH & Shell Scripting",
          "level": "Advanced",
          "category": "Programming"
        },
        {
          "id": "9",
          "name": "Redis Caching & In-Memory Stores",
          "level": "Expert",
          "category": "In-Memory Data"
        },
        {
          "id": "10",
          "name": "Prometheus, Grafana & Datadog Alerts",
          "level": "Advanced",
          "category": "Observability"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Multi-Region Distributed Financial Ledger Database",
          "description": "Architected high-throughput globally replicated distributed database cluster processing 50,000 ACID transactions/sec with 99.999% uptime.",
          "technologies": [
            "AWS Aurora",
            "PostgreSQL",
            "DynamoDB",
            "Kafka",
            "Terraform"
          ],
          "link": "williampatel.cloud/ledger-db"
        }
      ]
    }
  },
  {
    "id": "classic-split",
    "name": "Classic Split-Column",
    "description": "A formal serif template featuring top/bottom bordered headers, a centered summary, and a vertical two-column layout.",
    "category": "Formal",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Henry",
        "lastName": "Fairchild",
        "title": "Senior Financial Controller & Audit Director (CPA)",
        "email": "henry.fairchild@email.com",
        "phone": "+1 (555) 809-1122",
        "location": "Boston, MA",
        "linkedin": "linkedin.com/in/henryfairchild-cpa",
        "website": "henryfairchild.cpa"
      },
      "summary": "Distinguished and meticulous Certified Public Accountant (CPA) & Senior Financial Controller with 12+ years of experience directing corporate accounting operations, SEC financial reporting, and Sarbanes-Oxley (SOX) internal compliance. Managed $250M+ in corporate balance sheet assets and achieved 100% clean audit opinions.",
      "experience": [
        {
          "id": "1",
          "company": "Beacon Hill Financial Management",
          "position": "Senior Financial Controller & Audit Director",
          "startDate": "Jan 2019",
          "endDate": "Present",
          "current": true,
          "description": [
            "Directed corporate accounting, monthly close, and financial reporting operations managing $250M in balance sheet assets.",
            "Shortened corporate monthly close cycle from 10 days to 3 business days by implementing automated ERP reconciliation rules.",
            "Led annual external financial audits with Big Four auditing firms, consistently achieving 100% clean, unqualified audit opinions.",
            "Supervised departmental accounting staff of 15 senior accountants, payroll managers, and tax specialists."
          ]
        },
        {
          "id": "2",
          "company": "Deloitte & Touche LLP",
          "position": "Senior Audit Manager",
          "startDate": "Sep 2012",
          "endDate": "Dec 2018",
          "current": false,
          "description": [
            "Planned and executed 30+ complex financial statement and SOX 404 internal control audits for public enterprise clients.",
            "Identified $18M in accounting misstatements and internal control weaknesses, formulating remedial accounting frameworks.",
            "Drafted SEC Form 10-K, 10-Q, and 8-K filings in strict compliance with US GAAP and PCAOB standards.",
            "Trained and developed 40+ audit associates in technical GAAP accounting standards and automated audit analytics."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Boston College - Carroll School of Management",
          "degree": "Master of Science",
          "field": "Accounting & Financial Forensics",
          "startDate": "2011",
          "endDate": "2012",
          "gpa": "3.94"
        },
        {
          "id": "2",
          "institution": "Boston University",
          "degree": "Bachelor of Science",
          "field": "Business Administration (Accounting Concentration)",
          "startDate": "2007",
          "endDate": "2011",
          "gpa": "3.89"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Certified Public Accountant (CPA)",
          "level": "Expert",
          "category": "Certifications"
        },
        {
          "id": "2",
          "name": "US GAAP & SEC Reporting (10-K / 10-Q)",
          "level": "Expert",
          "category": "Accounting Standards"
        },
        {
          "id": "3",
          "name": "Sarbanes-Oxley (SOX 404) Compliance",
          "level": "Expert",
          "category": "Internal Controls"
        },
        {
          "id": "4",
          "name": "NetSuite, SAP ERP & Workday Financials",
          "level": "Expert",
          "category": "Financial Systems"
        },
        {
          "id": "5",
          "name": "Corporate Financial Close Optimization",
          "level": "Expert",
          "category": "Accounting Operations"
        },
        {
          "id": "6",
          "name": "Big Four Audit Leadership & Oversight",
          "level": "Expert",
          "category": "Auditing"
        },
        {
          "id": "7",
          "name": "Balance Sheet & Treasury Management ($250M+)",
          "level": "Expert",
          "category": "Treasury"
        },
        {
          "id": "8",
          "name": "Tax Compliance & Transfer Pricing",
          "level": "Advanced",
          "category": "Taxation"
        },
        {
          "id": "9",
          "name": "Financial Forecasting & Budgetary Control",
          "level": "Expert",
          "category": "Corporate Finance"
        },
        {
          "id": "10",
          "name": "Team Leadership & Departmental Governance",
          "level": "Expert",
          "category": "Leadership"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Enterprise ERP Financial System Modernization",
          "description": "Led multi-subsidiary financial transformation to NetSuite ERP, eliminating 35 hours of manual journal entry workflows monthly.",
          "technologies": [
            "NetSuite ERP",
            "US GAAP",
            "SOX 404",
            "Financial Automation"
          ],
          "link": "henryfairchild.cpa/erp-modernization"
        }
      ]
    }
  },
  {
    "id": "developer-portfolio",
    "name": "Developer Portfolio",
    "description": "Executive ATS developer layout featuring serif headers, categorized technical skills, structured project bullets, and full lifecycle engineering credentials",
    "category": "Technical",
    "difficulty": "Medium",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Ethan",
        "lastName": "Vance",
        "title": "Full Stack Java & React Developer",
        "email": "ethan.vance@email.com",
        "phone": "+1 (555) 382-9104",
        "location": "Austin, TX",
        "linkedin": "linkedin.com/in/ethanvance-dev",
        "website": "ethanvance.dev"
      },
      "summary": "Results-driven Full Stack Developer & Software Engineer with 4+ years of professional engineering experience in full lifecycle software development (SDLC), system design, and building scalable microservices architectures and responsive user interfaces. Proven expertise in Java (Core Java, JDK 17/21), Spring Boot 3, Spring Security, RESTful Web Services, React.js, Next.js, TypeScript, PostgreSQL, and Docker. Demonstrated success in designing resilient backend APIs with JWT & OAuth 2.0 authentication, optimizing database queries with Spring Data JPA & Hibernate (sub-120ms latency), implementing automated quality assurance with JUnit 5, Mockito & Playwright (Unit, Integration & E2E Testing), and managing containerized CI/CD deployment pipelines.",
      "experience": [
        {
          "id": "1",
          "company": "Apex Enterprise Cloud Solutions",
          "position": "Senior Full Stack Software Engineer",
          "startDate": "Jan 2022",
          "endDate": "Present",
          "current": true,
          "description": [
            "Architected and delivered end-to-end full-stack web applications, microservices, and enterprise automation tools for 400k+ active users using Java Spring Boot 3, React.js, Next.js, TypeScript, and PostgreSQL.",
            "Engineered secure RESTful APIs with Spring Security, JWT stateless session authentication, and role-based access control (RBAC), consistently maintaining sub-120ms response latency.",
            "Designed and maintained high-performance relational and NoSQL database schemas with automated migrations, optimized indexing, and transactional integrity, cutting query runtimes by 42%.",
            "Integrated third-party APIs including automated transactional messaging webhooks, Brevo API for transactional email delivery, and SMS notification gateways.",
            "Established containerized deployment workflows using Docker, Docker Compose, and automated GitHub Actions CI/CD pipelines, ensuring zero-downtime rollouts and 99.99% uptime."
          ]
        },
        {
          "id": "2",
          "company": "Vanguard HR Tech Systems",
          "position": "Full Stack Developer",
          "startDate": "Jun 2020",
          "endDate": "Dec 2021",
          "current": false,
          "description": [
            "Engineered full-stack HRMS modules covering dynamic payroll computations, attendance tracking, leave management, and employee lifecycle workflows for 800+ active enterprise corporate users.",
            "Built a high-fidelity client-side PDF document generation worker utilizing React, TypeScript, and custom styling engines, eliminating server-side rendering bottlenecks.",
            "Implemented comprehensive automated testing suite using Playwright and JUnit 5 covering 90+ critical user journeys, reducing regression defect escape rate by 45%.",
            "Engineered the automated enterprise document and payslip generator with transactional messaging integrations, reducing monthly payroll administrative turnaround time by 75%."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "University of Texas at Austin",
          "degree": "Master of Science (M.S.)",
          "field": "Software Engineering & Distributed Systems",
          "startDate": "2018",
          "endDate": "2020",
          "gpa": "3.90 / 4.0"
        },
        {
          "id": "2",
          "institution": "Texas A&M University",
          "degree": "Bachelor of Science (B.S.)",
          "field": "Computer Science",
          "startDate": "2014",
          "endDate": "2018",
          "gpa": "3.85 / 4.0"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Java (Core Java, JDK 8/11/17/21)",
          "level": "Expert",
          "category": "Programming Languages"
        },
        {
          "id": "2",
          "name": "TypeScript & JavaScript (ES6+)",
          "level": "Expert",
          "category": "Programming Languages"
        },
        {
          "id": "3",
          "name": "SQL & HTML5 / CSS3",
          "level": "Expert",
          "category": "Programming Languages"
        },
        {
          "id": "4",
          "name": "Spring Boot 3 & Spring MVC",
          "level": "Expert",
          "category": "Backend & Microservices"
        },
        {
          "id": "5",
          "name": "Spring Data JPA & Hibernate ORM",
          "level": "Expert",
          "category": "Backend & Microservices"
        },
        {
          "id": "6",
          "name": "Spring Security & JWT / OAuth 2.0",
          "level": "Expert",
          "category": "Backend & Microservices"
        },
        {
          "id": "7",
          "name": "RESTful Web Services & Swagger / OpenAPI 3.0",
          "level": "Expert",
          "category": "Backend & Microservices"
        },
        {
          "id": "8",
          "name": "Node.js & Express.js",
          "level": "Advanced",
          "category": "Backend & Microservices"
        },
        {
          "id": "9",
          "name": "React.js & Next.js (App Router, SSR)",
          "level": "Expert",
          "category": "Frontend Development"
        },
        {
          "id": "10",
          "name": "Tailwind CSS & Component Architecture",
          "level": "Expert",
          "category": "Frontend Development"
        },
        {
          "id": "11",
          "name": "PostgreSQL, MySQL & MongoDB Atlas",
          "level": "Expert",
          "category": "Databases & Storage"
        },
        {
          "id": "12",
          "name": "Docker, Docker Compose & Containerization",
          "level": "Advanced",
          "category": "DevOps, Cloud & Tools"
        },
        {
          "id": "13",
          "name": "Git, GitHub Actions & CI/CD Pipelines",
          "level": "Advanced",
          "category": "DevOps, Cloud & Tools"
        },
        {
          "id": "14",
          "name": "JUnit 5, Mockito & Playwright E2E Testing",
          "level": "Expert",
          "category": "Testing & Quality Assurance"
        },
        {
          "id": "15",
          "name": "Microservices Architecture & System Design",
          "level": "Advanced",
          "category": "Architecture & Practices"
        },
        {
          "id": "16",
          "name": "Agile (Scrum), SDLC & Code Reviews",
          "level": "Expert",
          "category": "Architecture & Practices"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "OmniHR Enterprise Workforce Platform & Test Harness",
          "description": "Architected full-stack enterprise HR and payroll management system with real-time employee attendance tracking, automated salary slip generator, and Playwright E2E test harness covering 90+ regression user flows.",
          "technologies": [
            "React.js",
            "TypeScript",
            "Node.js",
            "Express",
            "MongoDB",
            "Playwright",
            "Docker"
          ],
          "link": "github.com/ethanvance-dev/omnihr-platform"
        },
        {
          "id": "2",
          "name": "Secure Identity Verification & Cryptographic Signature Engine",
          "description": "Engineered high-security in-memory identity verification pipeline ingesting password-protected archive packages, verifying digital signatures against root certificates, and extracting sanitized biometric records with sub-30ms execution throughput.",
          "technologies": [
            "Java 21",
            "Spring Boot 3",
            "Bouncy Castle Crypto",
            "XML Signature Validator",
            "In-Memory Stream Unzipper"
          ],
          "link": "github.com/ethanvance-dev/identity-verification-engine"
        },
        {
          "id": "3",
          "name": "Apex Ledger & Micro-Lending Financial Platform",
          "description": "Developed a full-stack financial ledger management system with double-entry accounting audits, dynamic interest calculation formulas, and automated repayment schedules with sub-150ms query response speeds.",
          "technologies": [
            "Node.js",
            "Express.js",
            "React.js",
            "MongoDB Atlas",
            "Brevo API",
            "Twilio SMS"
          ],
          "link": "github.com/ethanvance-dev/apex-financial-ledger"
        },
        {
          "id": "4",
          "name": "Enterprise Document Generation & Dispatch Automation Engine",
          "description": "Architected an automated enterprise compensation generator delivering encrypted PDF documents to 500+ employees monthly with automated transactional messaging. Built zero-latency client-side PDF rendering engine and payroll computation modules.",
          "technologies": [
            "React.js",
            "TypeScript",
            "MongoDB",
            "WhatsApp Cloud API",
            "Dynamic PDF Worker"
          ],
          "link": "github.com/ethanvance-dev/document-automation-engine"
        }
      ],
      "customSections": [
        {
          "id": "certifications-learning",
          "title": "Certifications & Specializations",
          "items": [
            {
              "id": "c1",
              "name": "Java Full Stack Development Specialization",
              "description": "Comprehensive training in Core Java, Spring Boot, Microservices, Spring Security, React.js, and SQL.",
              "date": "2023"
            },
            {
              "id": "c2",
              "name": "Full Stack Web Engineering & Cloud Deployment",
              "description": "Specialized mastery in cloud-native web applications, containerization with Docker, and CI/CD pipelines.",
              "date": "2024"
            }
          ]
        }
      ]
    }
  },
  {
    "id": "fresher-cs-engineer",
    "name": "Fresher CS & Software Engineer",
    "description": "ATS-optimized single-column layout crafted specifically for fresh graduates in Computer Science, highlighting algorithms, capstone projects, and technical skills.",
    "category": "Fresher",
    "difficulty": "Easy",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Rohan",
        "lastName": "Sharma",
        "title": "Associate Software Engineer / CS Graduate",
        "email": "rohan.sharma@email.com",
        "phone": "+91 98765 43210",
        "location": "Bengaluru, Karnataka, India",
        "linkedin": "linkedin.com/in/rohansharma-cs",
        "website": "github.com/rohansharma-dev"
      },
      "summary": "Enthusiastic and analytically strong Computer Science graduate (B.Tech CSE, CGPA 8.85/10) with solid foundations in Data Structures, Algorithms, Core Java, C++, and Full Stack Web Development. Solved 450+ algorithmic problems across LeetCode & CodeChef, engineered 4 full-stack applications with 95%+ test coverage, and won 1st Place at National Smart India Hackathon 2023.",
      "experience": [
        {
          "id": "1",
          "company": "Infosys InStep Engineering Labs",
          "position": "Software Engineering Intern",
          "startDate": "Jan 2024",
          "endDate": "Jun 2024",
          "current": false,
          "description": [
            "Engineered microservices backend in Java Spring Boot and PostgreSQL, serving 25k+ active daily campus users.",
            "Optimized relational database queries and cache layers with Redis, slashing median API latency from 240ms to sub-45ms (-81%).",
            "Implemented automated unit testing with JUnit 5 and Mockito, increasing module code coverage from 64% to 92%.",
            "Collaborated in agile 2-week sprints delivering 18 user stories ahead of scheduled release milestones."
          ]
        },
        {
          "id": "2",
          "company": "Department of Computer Science, NIT Karnataka",
          "position": "Student Technical Lead & Teaching Assistant",
          "startDate": "Aug 2023",
          "endDate": "Dec 2023",
          "current": false,
          "description": [
            "Mentored 120+ sophomore students in Data Structures, OOPs in C++, and Algorithm Optimization.",
            "Conducted 16 hands-on coding workshops on Git, GitHub workflows, and RESTful web development.",
            "Automated lab assignment code evaluation scripts in Python, saving faculty 15+ grading hours per week."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "National Institute of Technology (NIT) Karnataka",
          "degree": "Bachelor of Technology (B.Tech)",
          "field": "Computer Science & Engineering",
          "startDate": "2020",
          "endDate": "2024",
          "gpa": "8.85 / 10"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Java (Core Java, OOPs, Collections)",
          "level": "Expert",
          "category": "Programming Languages"
        },
        {
          "id": "2",
          "name": "C++ & Data Structures / Algorithms",
          "level": "Expert",
          "category": "Programming Languages"
        },
        {
          "id": "3",
          "name": "JavaScript (ES6+) & TypeScript",
          "level": "Advanced",
          "category": "Programming Languages"
        },
        {
          "id": "4",
          "name": "Spring Boot 3 & RESTful APIs",
          "level": "Advanced",
          "category": "Backend Development"
        },
        {
          "id": "5",
          "name": "React.js & Tailwind CSS",
          "level": "Advanced",
          "category": "Frontend Development"
        },
        {
          "id": "6",
          "name": "PostgreSQL & MySQL Databases",
          "level": "Advanced",
          "category": "Databases"
        },
        {
          "id": "7",
          "name": "Git, GitHub & Version Control",
          "level": "Expert",
          "category": "Tools & DevOps"
        },
        {
          "id": "8",
          "name": "Docker & Linux/BASH Scripting",
          "level": "Intermediate",
          "category": "Tools & DevOps"
        },
        {
          "id": "9",
          "name": "JUnit 5 & Integration Testing",
          "level": "Advanced",
          "category": "Testing & QA"
        },
        {
          "id": "10",
          "name": "Competitive Programming (LeetCode 450+)",
          "level": "Expert",
          "category": "Core Competencies"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Algorithmic Stock Trading Simulator & Analytics",
          "description": "Architected full-stack trading simulation engine in React and Python processing real-time WebSocket price feeds with sub-50ms execution latency.",
          "technologies": [
            "React",
            "Python",
            "FastAPI",
            "WebSocket",
            "PostgreSQL",
            "Docker"
          ],
          "link": "github.com/rohansharma-dev/trading-simulator"
        },
        {
          "id": "2",
          "name": "Campus Automated Room & Resource Scheduler",
          "description": "Engineered multi-tenant resource scheduling portal used by 3,000+ university students with zero double-booking scheduling conflicts.",
          "technologies": [
            "Java Spring Boot",
            "React.js",
            "PostgreSQL",
            "JWT Auth"
          ],
          "link": "github.com/rohansharma-dev/campus-scheduler"
        }
      ],
      "customSections": [
        {
          "id": "honors-achievements",
          "title": "Honors & Extracurricular Achievements",
          "items": [
            {
              "id": "h1",
              "name": "1st Place Winner - Smart India Hackathon (SIH 2023)",
              "description": "Built an AI-driven disaster response dispatch portal among 500+ national competing collegiate teams.",
              "date": "2023"
            },
            {
              "id": "h2",
              "name": "Top 5% Global Rank - LeetCode Biweekly Contests",
              "description": "Knight Badge holder with 1850+ contest rating across 450+ solved algorithmic problems.",
              "date": "2024"
            }
          ]
        }
      ]
    }
  },
  {
    "id": "fresher-frontend-dev",
    "name": "Fresher Frontend & React Developer",
    "description": "Modern layout tailored for fresh web developers to spotlight interactive React/Next.js projects, UI/UX aesthetics, and responsive web design mastery.",
    "category": "Fresher",
    "difficulty": "Easy",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Priya",
        "lastName": "Patel",
        "title": "Junior Frontend & React Developer",
        "email": "priya.patel@email.com",
        "phone": "+91 98123 45678",
        "location": "Pune, Maharashtra, India",
        "linkedin": "linkedin.com/in/priyapatel-ui",
        "website": "priyapatel.dev"
      },
      "summary": "Creative and performance-driven Junior Frontend Developer (B.E. IT, CGPA 8.70/10) with expertise in React.js, Next.js 14, TypeScript, and Tailwind CSS. Built 6+ responsive web applications achieving 100% Google Lighthouse scores, reduced JavaScript bundle sizes by 48%, and demonstrated strong mastery in modern component-driven UI architecture.",
      "experience": [
        {
          "id": "1",
          "company": "TechWave Studios",
          "position": "Frontend Developer Intern",
          "startDate": "Feb 2024",
          "endDate": "Jul 2024",
          "current": false,
          "description": [
            "Engineered responsive customer web portal with React, Next.js 14, and Tailwind CSS, increasing mobile user engagement by 44%.",
            "Implemented lazy loading, dynamic code splitting, and WebP asset optimization, cutting initial page load time by 52%.",
            "Integrated RESTful APIs and TanStack React Query for seamless asynchronous caching, eliminating redundant network calls.",
            "Ensured 100% WCAG 2.1 AA accessibility compliance across 35+ reusable UI components."
          ]
        },
        {
          "id": "2",
          "company": "PICT Developer Student Club",
          "position": "Lead Web Designer & Frontend Contributor",
          "startDate": "Aug 2023",
          "endDate": "Jan 2024",
          "current": false,
          "description": [
            "Spearheaded development of annual college technical fest website, handling 45k+ page views over 3 festival days.",
            "Designed interactive UI wireframes in Figma and translated them into pixel-perfect modular React components.",
            "Conducted code reviews for 10 junior club contributors, maintaining strict TypeScript and ESLint standards."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Pune Institute of Computer Technology (PICT)",
          "degree": "Bachelor of Engineering (B.E.)",
          "field": "Information Technology",
          "startDate": "2020",
          "endDate": "2024",
          "gpa": "8.70 / 10"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "React.js & Next.js 14",
          "level": "Expert",
          "category": "Frontend Frameworks"
        },
        {
          "id": "2",
          "name": "TypeScript & JavaScript (ES6+)",
          "level": "Expert",
          "category": "Languages"
        },
        {
          "id": "3",
          "name": "Tailwind CSS & CSS Modules",
          "level": "Expert",
          "category": "Styling & UI"
        },
        {
          "id": "4",
          "name": "HTML5 Semantic Markup & Web Accessibility",
          "level": "Expert",
          "category": "Core Web"
        },
        {
          "id": "5",
          "name": "Redux Toolkit & Zustand State Mgmt",
          "level": "Advanced",
          "category": "State Management"
        },
        {
          "id": "6",
          "name": "REST APIs & GraphQL Integration",
          "level": "Advanced",
          "category": "API Integration"
        },
        {
          "id": "7",
          "name": "Figma UI/UX Prototyping",
          "level": "Advanced",
          "category": "Design Tools"
        },
        {
          "id": "8",
          "name": "Git, GitHub & Vercel Deployments",
          "level": "Expert",
          "category": "DevOps & Tools"
        },
        {
          "id": "9",
          "name": "Jest & React Testing Library",
          "level": "Advanced",
          "category": "Testing"
        },
        {
          "id": "10",
          "name": "Performance Optimization & Lighthouse",
          "level": "Advanced",
          "category": "Web Vitals"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "DevConnect: Developer Community & Blog Platform",
          "description": "Engineered full-featured social platform for software engineers featuring markdown editor, live code snippet execution, and dark/light themes.",
          "technologies": [
            "Next.js 14",
            "TypeScript",
            "Tailwind CSS",
            "Supabase",
            "Vercel"
          ],
          "link": "github.com/priyapatel-ui/devconnect"
        },
        {
          "id": "2",
          "name": "Prism UI: Open-Source Accessible Component Library",
          "description": "Built accessible, headless UI component kit published on NPM with 1,200+ weekly downloads and comprehensive Storybook documentation.",
          "technologies": [
            "React",
            "TypeScript",
            "Storybook",
            "Tailwind CSS",
            "NPM"
          ],
          "link": "github.com/priyapatel-ui/prism-ui"
        }
      ],
      "customSections": [
        {
          "id": "certifications",
          "title": "Certifications & Open Source",
          "items": [
            {
              "id": "c1",
              "name": "Meta Front-End Developer Professional Certificate",
              "description": "Coursera & Meta, Specialized mastery in React, UI/UX, and Web Architecture",
              "date": "2023"
            },
            {
              "id": "c2",
              "name": "Hacktoberfest Open-Source Super Contributor",
              "description": "Merged 14 pull requests across major open-source web tooling repositories",
              "date": "2023"
            }
          ]
        }
      ]
    }
  },
  {
    "id": "fresher-java-backend",
    "name": "Fresher Java & Spring Boot Developer",
    "description": "Clean, robust layout highlighting Core Java, Spring Boot microservices, REST APIs, and database design for junior backend roles.",
    "category": "Fresher",
    "difficulty": "Easy",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Aditya",
        "lastName": "Verma",
        "title": "Junior Java & Spring Boot Backend Developer",
        "email": "aditya.verma@email.com",
        "phone": "+91 99234 56789",
        "location": "Hyderabad, Telangana, India",
        "linkedin": "linkedin.com/in/adityaverma-java",
        "website": "github.com/adityaverma-dev"
      },
      "summary": "Motivated Junior Java Software Engineer (B.Tech CSE, CGPA 8.65/10) with hands-on proficiency in Core Java (JDK 17/21), Spring Boot 3, Spring Security, Hibernate ORM, and PostgreSQL. Architected resilient RESTful microservices maintaining sub-100ms response latencies, integrated JWT authentication, and achieved 92% automated test coverage.",
      "experience": [
        {
          "id": "1",
          "company": "Cognizant Digital Engineering Labs",
          "position": "Java Backend Intern",
          "startDate": "Jan 2024",
          "endDate": "Jun 2024",
          "current": false,
          "description": [
            "Developed RESTful API endpoints using Java 21, Spring Boot 3, and Spring Data JPA for enterprise client management.",
            "Implemented JWT authentication with role-based access control (RBAC), securing 25+ sensitive backend endpoints.",
            "Optimized PostgreSQL complex queries and database indexing, reducing batch data processing time by 45%.",
            "Authored unit and integration test suites with JUnit 5 and Mockito, raising code coverage from 60% to 92%."
          ]
        },
        {
          "id": "2",
          "company": "Campus Open ERP Software Initiative",
          "position": "Backend Developer Trainee",
          "startDate": "Jul 2023",
          "endDate": "Dec 2023",
          "current": false,
          "description": [
            "Built student attendance and examination grading module handling 4,000+ active student records with zero data anomalies.",
            "Engineered automated PDF report card generation module utilizing iText library and background threading.",
            "Participated in weekly code reviews and adopted SonarQube static analysis to resolve 30+ code smell issues."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Jawaharlal Nehru Technological University (JNTU) Hyderabad",
          "degree": "Bachelor of Technology (B.Tech)",
          "field": "Computer Science & Engineering",
          "startDate": "2020",
          "endDate": "2024",
          "gpa": "8.65 / 10"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Java (Core Java, JDK 8/11/17/21)",
          "level": "Expert",
          "category": "Programming Languages"
        },
        {
          "id": "2",
          "name": "Spring Boot 3 & Spring MVC",
          "level": "Expert",
          "category": "Backend Frameworks"
        },
        {
          "id": "3",
          "name": "Spring Data JPA & Hibernate ORM",
          "level": "Expert",
          "category": "Backend Frameworks"
        },
        {
          "id": "4",
          "name": "Spring Security & JWT Authentication",
          "level": "Advanced",
          "category": "Backend Frameworks"
        },
        {
          "id": "5",
          "name": "PostgreSQL, MySQL & SQL Queries",
          "level": "Expert",
          "category": "Databases"
        },
        {
          "id": "6",
          "name": "RESTful Web Services & Swagger / OpenAPI",
          "level": "Expert",
          "category": "API Architecture"
        },
        {
          "id": "7",
          "name": "Docker & Containerization",
          "level": "Intermediate",
          "category": "DevOps & Tools"
        },
        {
          "id": "8",
          "name": "Git, Maven & CI/CD Basics",
          "level": "Advanced",
          "category": "DevOps & Tools"
        },
        {
          "id": "9",
          "name": "JUnit 5, Mockito & Test-Driven Dev",
          "level": "Advanced",
          "category": "Testing & QA"
        },
        {
          "id": "10",
          "name": "Multithreading & OOP Design Patterns",
          "level": "Advanced",
          "category": "Core Java"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "E-Commerce Microservices Backend Platform",
          "description": "Architected distributed backend with Spring Cloud Config, Eureka Discovery, API Gateway, and resilient PostgreSQL services handling 500+ requests/sec.",
          "technologies": [
            "Java 21",
            "Spring Boot 3",
            "Spring Cloud",
            "PostgreSQL",
            "Docker"
          ],
          "link": "github.com/adityaverma-dev/ecommerce-microservices"
        },
        {
          "id": "2",
          "name": "Bank Account & Transaction Security System",
          "description": "Engineered secure banking ledger API with double-entry accounting validations, ACID compliance, and instant transaction notifications.",
          "technologies": [
            "Spring Boot",
            "Spring Security",
            "JWT",
            "Hibernate",
            "MySQL"
          ],
          "link": "github.com/adityaverma-dev/secure-banking-api"
        }
      ],
      "customSections": [
        {
          "id": "certifications",
          "title": "Certifications & Training",
          "items": [
            {
              "id": "c1",
              "name": "Oracle Certified Associate: Java SE Programmer",
              "description": "Oracle University, Validated object-oriented Java programming mastery",
              "date": "2023"
            },
            {
              "id": "c2",
              "name": "Spring Boot Microservices Certification",
              "description": "Udemy & Telusko, Certified microservices design and cloud integration",
              "date": "2024"
            }
          ]
        }
      ]
    }
  },
  {
    "id": "fresher-data-analyst",
    "name": "Fresher Data Analyst & BI Trainee",
    "description": "Structured layout emphasizing SQL querying, Python data analytics, Tableau dashboards, and statistical problem-solving for data fresher roles.",
    "category": "Fresher",
    "difficulty": "Easy",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Ananya",
        "lastName": "Deshmukh",
        "title": "Junior Data Analyst & Business Intelligence Specialist",
        "email": "ananya.deshmukh@email.com",
        "phone": "+91 97345 67890",
        "location": "Mumbai, Maharashtra, India",
        "linkedin": "linkedin.com/in/ananyadeshmukh-data",
        "website": "ananyadeshmukh.data"
      },
      "summary": "Analytically rigorous Junior Data Analyst (B.Sc. Statistics, CGPA 9.10/10) with advanced capabilities in SQL, Python (Pandas/NumPy), Tableau, and Excel. Analyzed 1.5M+ retail customer transaction records, automated business intelligence reporting dashboards that saved 70% in weekly reporting effort, and built predictive models with 88% accuracy.",
      "experience": [
        {
          "id": "1",
          "company": "Mu Sigma Analytics Inc.",
          "position": "Data Analytics Intern",
          "startDate": "Feb 2024",
          "endDate": "Jul 2024",
          "current": false,
          "description": [
            "Analyzed 1.5M+ customer transaction datasets in SQL and Python, identifying purchasing patterns across 14 product categories.",
            "Designed 6 interactive Tableau executive dashboards tracking $8.5M in quarterly commercial sales performance.",
            "Automated weekly data extraction and ETL cleaning pipelines in Python, eliminating 12 hours of manual data collation.",
            "Presented data-driven churn findings to senior analytics directors, recommending retention strategies that increased retention by 18%."
          ]
        },
        {
          "id": "2",
          "company": "St. Xavier’s Statistical Consulting Cell",
          "position": "Academic Data Science Trainee",
          "startDate": "Jul 2023",
          "endDate": "Jan 2024",
          "current": false,
          "description": [
            "Conducted hypothesis testing, ANOVA, and multivariate regression modeling for 8 cross-departmental research projects.",
            "Cleaned and normalized complex healthcare survey datasets with 99.8% verified data integrity.",
            "Authored statistical summary reports utilizing R Markdown and Python visualizations (Seaborn/Matplotlib)."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "St. Xavier's College, Mumbai",
          "degree": "Bachelor of Science (B.Sc.)",
          "field": "Statistics & Applied Data Science",
          "startDate": "2021",
          "endDate": "2024",
          "gpa": "9.10 / 10"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "SQL (PostgreSQL, MySQL, BigQuery)",
          "level": "Expert",
          "category": "Databases & Querying"
        },
        {
          "id": "2",
          "name": "Python (Pandas, NumPy, Matplotlib)",
          "level": "Expert",
          "category": "Programming & Data"
        },
        {
          "id": "3",
          "name": "Tableau Desktop & Public Dashboards",
          "level": "Expert",
          "category": "Business Intelligence"
        },
        {
          "id": "4",
          "name": "Power BI & DAX Calculations",
          "level": "Advanced",
          "category": "Business Intelligence"
        },
        {
          "id": "5",
          "name": "Advanced Excel (VLOOKUP, Pivot, VBA)",
          "level": "Expert",
          "category": "Data Analysis"
        },
        {
          "id": "6",
          "name": "Statistical Hypothesis Testing & Regression",
          "level": "Expert",
          "category": "Statistics"
        },
        {
          "id": "7",
          "name": "ETL Pipelines & Data Cleaning",
          "level": "Advanced",
          "category": "Data Engineering"
        },
        {
          "id": "8",
          "name": "Scikit-Learn (Classification, Clustering)",
          "level": "Intermediate",
          "category": "Machine Learning"
        },
        {
          "id": "9",
          "name": "R Programming & ggplot2",
          "level": "Advanced",
          "category": "Statistics"
        },
        {
          "id": "10",
          "name": "Data Storytelling & Executive Presentations",
          "level": "Expert",
          "category": "Core Competencies"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Global E-Commerce Sales & Profitability Dashboard",
          "description": "Engineered comprehensive Tableau dashboard tracking sales velocity across 50+ countries with dynamic drill-down filters and automated KPI variance alerts.",
          "technologies": [
            "Tableau",
            "SQL",
            "Python",
            "Excel"
          ],
          "link": "ananyadeshmukh.data/sales-dashboard"
        },
        {
          "id": "2",
          "name": "Telecom Customer Churn Predictor & Cohort Model",
          "description": "Built machine learning classification pipeline in Python predicting customer churn with 88% precision across 7,000+ subscriber accounts.",
          "technologies": [
            "Python",
            "Pandas",
            "Scikit-Learn",
            "Seaborn"
          ],
          "link": "github.com/ananyadeshmukh/churn-predictor"
        }
      ],
      "customSections": [
        {
          "id": "certifications",
          "title": "Certifications & Honors",
          "items": [
            {
              "id": "c1",
              "name": "Google Data Analytics Professional Certificate",
              "description": "Coursera & Google, Mastery in SQL, R, Tableau, and Data Analysis",
              "date": "2023"
            },
            {
              "id": "c2",
              "name": "1st Rank in Department of Statistics",
              "description": "St. Xavier's College Mumbai, Academic Excellence Gold Medalist",
              "date": "2024"
            }
          ]
        }
      ]
    }
  },
  {
    "id": "fresher-cloud-devops",
    "name": "Fresher Cloud & DevOps Engineer",
    "description": "High-visibility layout showcasing Linux administration, Docker containerization, AWS cloud architecture, and CI/CD automation.",
    "category": "Fresher",
    "difficulty": "Easy",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Aryan",
        "lastName": "Nair",
        "title": "Junior Cloud & DevOps Infrastructure Engineer",
        "email": "aryan.nair@email.com",
        "phone": "+91 96456 78901",
        "location": "Chennai, Tamil Nadu, India",
        "linkedin": "linkedin.com/in/aryannair-cloud",
        "website": "github.com/aryannair-devops"
      },
      "summary": "Proactive and AWS-certified Junior Cloud & DevOps Engineer (B.Tech IT, CGPA 8.75/10) with hands-on expertise in Linux administration, Docker, GitHub Actions, Terraform, and AWS cloud architecture. Automated deployment pipelines for 5+ full-stack web applications reducing release cycle times by 60%, configured Prometheus/Grafana monitoring, and maintained 99.9% uptime.",
      "experience": [
        {
          "id": "1",
          "company": "CloudWave Solutions Labs",
          "position": "Cloud & DevOps Intern",
          "startDate": "Jan 2024",
          "endDate": "Jun 2024",
          "current": false,
          "description": [
            "Architected automated CI/CD pipelines via GitHub Actions, reducing application build and deployment time by 60%.",
            "Containerized 8 full-stack Node.js and Python microservices with multi-stage Dockerfiles, cutting image sizes by 55%.",
            "Provisioned AWS infrastructure (EC2, S3, RDS, VPC) for 4 environments utilizing Terraform (IaC) with zero drift.",
            "Configured Prometheus and Grafana telemetry alerts, reducing mean-time-to-detection (MTTD) for server bottlenecks by 40%."
          ]
        },
        {
          "id": "2",
          "company": "SRM University Computing & Network Center",
          "position": "Systems Administration Trainee",
          "startDate": "Aug 2023",
          "endDate": "Dec 2023",
          "current": false,
          "description": [
            "Administered 45+ Ubuntu and CentOS Linux servers across campus computer labs with 99.9% operational availability.",
            "Automated daily server log rotation and backup cron scripts in BASH, saving 8 hours of manual maintenance weekly.",
            "Hardened SSH configurations and firewall rules (UFW/iptables), securing 120+ active student computing terminals."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "SRM Institute of Science and Technology",
          "degree": "Bachelor of Technology (B.Tech)",
          "field": "Information Technology",
          "startDate": "2020",
          "endDate": "2024",
          "gpa": "8.75 / 10"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Linux Server Administration (Ubuntu/CentOS)",
          "level": "Expert",
          "category": "Operating Systems"
        },
        {
          "id": "2",
          "name": "Docker & Multi-Stage Containerization",
          "level": "Expert",
          "category": "Containers"
        },
        {
          "id": "3",
          "name": "AWS Cloud (EC2, S3, RDS, IAM, VPC)",
          "level": "Advanced",
          "category": "Cloud Infrastructure"
        },
        {
          "id": "4",
          "name": "GitHub Actions & CI/CD Automation",
          "level": "Expert",
          "category": "DevOps & CI/CD"
        },
        {
          "id": "5",
          "name": "Terraform (Infrastructure as Code)",
          "level": "Advanced",
          "category": "IaC"
        },
        {
          "id": "6",
          "name": "BASH Shell Scripting & Python Automation",
          "level": "Expert",
          "category": "Scripting"
        },
        {
          "id": "7",
          "name": "Prometheus & Grafana Monitoring",
          "level": "Advanced",
          "category": "Observability"
        },
        {
          "id": "8",
          "name": "Kubernetes (K8s) Cluster Fundamentals",
          "level": "Intermediate",
          "category": "Containers"
        },
        {
          "id": "9",
          "name": "Nginx Web Server & Reverse Proxies",
          "level": "Advanced",
          "category": "Networking"
        },
        {
          "id": "10",
          "name": "Git & GitOps Workflows",
          "level": "Expert",
          "category": "DevOps & Tools"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "Automated Multi-Tier Cloud Deployment Pipeline",
          "description": "Engineered production-grade CI/CD pipeline building, testing, and deploying containerized applications to AWS EC2 with automated health check rollbacks across 100+ simulated builds.",
          "technologies": [
            "GitHub Actions",
            "Docker",
            "AWS EC2",
            "Nginx",
            "BASH"
          ],
          "link": "github.com/aryannair-devops/automated-cloud-pipeline"
        },
        {
          "id": "2",
          "name": "Terraform AWS Cloud Infrastructure Blueprint",
          "description": "Authored modular Terraform templates provisioning secure multi-AZ VPC, auto-scaling EC2 instances, Application Load Balancers, and RDS databases supporting 10k+ requests/sec.",
          "technologies": [
            "Terraform",
            "AWS VPC",
            "ALB",
            "RDS",
            "Security Groups"
          ],
          "link": "github.com/aryannair-devops/terraform-aws-blueprint"
        }
      ],
      "customSections": [
        {
          "id": "certifications",
          "title": "Cloud Certifications",
          "items": [
            {
              "id": "c1",
              "name": "AWS Certified Cloud Practitioner (CLF-C02)",
              "description": "Amazon Web Services, Verified foundational cloud architecture mastery",
              "date": "2023"
            },
            {
              "id": "c2",
              "name": "Linux Foundation Certified System Administrator (LFCS Trainee)",
              "description": "The Linux Foundation, Mastery in Linux enterprise administration",
              "date": "2024"
            }
          ]
        }
      ]
    }
  },
  {
    "id": "fresher-business-analyst",
    "name": "Fresher Business Analyst & Associate",
    "description": "Executive single-column layout crafted for BBA/MBA freshers focusing on business process mapping, Excel modeling, and market research.",
    "category": "Fresher",
    "difficulty": "Easy",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Sneha",
        "lastName": "Kulkarni",
        "title": "Junior Business Analyst & Management Trainee",
        "email": "sneha.kulkarni@email.com",
        "phone": "+91 95567 89012",
        "location": "New Delhi / Gurugram, India",
        "linkedin": "linkedin.com/in/snehakulkarni-ba",
        "website": "snehakulkarni.pro"
      },
      "summary": "Dynamic and strategic Junior Business Analyst (BBA, CGPA 8.92/10) with strong proficiencies in Advanced Financial Excel, SQL data extraction, Business Process Modeling (BPMN), and Agile User Stories. Executed 10+ business strategy and market entry case studies driving 30% process efficiency improvements in corporate internship projects.",
      "experience": [
        {
          "id": "1",
          "company": "Deloitte USI Advisory",
          "position": "Business Analyst Intern",
          "startDate": "Feb 2024",
          "endDate": "Jun 2024",
          "current": false,
          "description": [
            "Conducted financial variance analysis and process mapping for $14M enterprise supply chain client engagement.",
            "Gathered and translated client business requirements into 45+ detailed Agile user stories and acceptance criteria in Jira.",
            "Built financial forecasting models in Excel (VLOOKUP, INDEX-MATCH, Scenario Manager), improving budgeting precision by 28%.",
            "Delivered executive presentation decks to Senior Managers with 100% positive stakeholder feedback ratings."
          ]
        },
        {
          "id": "2",
          "company": "SSCBS Placement Cell & Business Conclave",
          "position": "Student President & Strategy Coordinator",
          "startDate": "Aug 2023",
          "endDate": "Jan 2024",
          "current": false,
          "description": [
            "Managed corporate placement drive coordination for 450+ graduating students across 80+ visiting enterprise recruiters.",
            "Negotiated corporate sponsorship partnerships valued at INR 1.2M for the annual national business leadership conclave.",
            "Led a student committee of 25 peers across public relations, corporate communications, and event logistics."
          ]
        }
      ],
      "education": [
        {
          "id": "1",
          "institution": "Shaheed Sukhdev College of Business Studies (SSCBS)",
          "degree": "Bachelor of Business Administration (BBA)",
          "field": "Financial & Management Studies",
          "startDate": "2021",
          "endDate": "2024",
          "gpa": "8.92 / 10"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "Advanced Excel & Financial Modeling",
          "level": "Expert",
          "category": "Financial Tools"
        },
        {
          "id": "2",
          "name": "Business Process Mapping (BPMN & Visio)",
          "level": "Expert",
          "category": "Business Analysis"
        },
        {
          "id": "3",
          "name": "Agile User Stories & Jira Management",
          "level": "Expert",
          "category": "Project Management"
        },
        {
          "id": "4",
          "name": "SQL Querying & Data Extraction",
          "level": "Advanced",
          "category": "Data & Databases"
        },
        {
          "id": "5",
          "name": "Power BI & Executive Dashboards",
          "level": "Advanced",
          "category": "Business Intelligence"
        },
        {
          "id": "6",
          "name": "Market Research & Competitor Benchmarking",
          "level": "Expert",
          "category": "Strategy"
        },
        {
          "id": "7",
          "name": "Financial Statement & Variance Analysis",
          "level": "Advanced",
          "category": "Finance"
        },
        {
          "id": "8",
          "name": "Stakeholder Communication & Decks",
          "level": "Expert",
          "category": "Leadership"
        },
        {
          "id": "9",
          "name": "UML Use Case Diagrams & Wireframing",
          "level": "Advanced",
          "category": "Business Analysis"
        },
        {
          "id": "10",
          "name": "Problem Solving & Critical Thinking",
          "level": "Expert",
          "category": "Core Competencies"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "FinTech Consumer Micro-Lending Feasibility Study",
          "description": "Engineered comprehensive unit economics financial model and market valuation forecast for digital micro-credit adoption across Tier 2 Indian cities.",
          "technologies": [
            "Advanced Excel",
            "Financial Modeling",
            "Power BI",
            "Market Research"
          ],
          "link": "snehakulkarni.pro/fintech-study"
        },
        {
          "id": "2",
          "name": "Automated Retail Inventory Optimization Analysis",
          "description": "Analyzed SKU velocity and lead times across 20,000 product items, proposing safety stock formula that reduced stockout rates by 35%.",
          "technologies": [
            "SQL",
            "Excel",
            "BPMN",
            "Power BI"
          ],
          "link": "snehakulkarni.pro/inventory-optimization"
        }
      ],
      "customSections": [
        {
          "id": "honors",
          "title": "Academic Honors & Leadership",
          "items": [
            {
              "id": "h1",
              "name": "National Winner - EY Corporate Strategy Case Competition",
              "description": "Won 1st prize among 350+ participating national undergraduate business teams",
              "date": "2023"
            },
            {
              "id": "h2",
              "name": "Dean’s Honor List for Academic Excellence",
              "description": "Awarded to top 5% percentile students across all 3 academic years",
              "date": "2024"
            }
          ]
        }
      ]
    }
  },
  {
    "id": "fresher-ece-embedded",
    "name": "Fresher ECE & Embedded Systems Engineer",
    "description": "ATS-optimized single-column layout crafted specifically for B.Tech ECE fresh graduates, highlighting IoT capstones, microcontroller firmware, and core electronics & software skills.",
    "category": "Fresher",
    "difficulty": "Easy",
    "isPremium": false,
    "sampleData": {
      "personalInfo": {
        "firstName": "Rohan",
        "lastName": "Sharma",
        "title": "B.Tech ECE Final Year | Aspiring Embedded & Software Engineer",
        "email": "rohan.sharma@email.com",
        "phone": "+91 98765 43210",
        "location": "Hyderabad, India",
        "linkedin": "linkedin.com/in/rohansharma-ece",
        "website": "github.com/rohansharma-ece"
      },
      "summary": "Proactive final-year B.Tech Electronics & Communication Engineering (ECE) student with strong fundamentals in C, C++, Python, Embedded C, and Data Structures & Algorithms. Experienced in architecting IoT prototypes, STM32/ESP32 firmware, and sensor integration across 4+ academic capstone projects. Eager to contribute technical rigor and fast learning agility to an entry-level software or embedded engineering role.",
      "experience": [],
      "education": [
        {
          "id": "1",
          "institution": "JNTU College of Engineering",
          "degree": "Bachelor of Technology (B.Tech)",
          "field": "Electronics & Communication Engineering",
          "startDate": "2021",
          "endDate": "2025",
          "gpa": "8.4 / 10.0"
        }
      ],
      "skills": [
        {
          "id": "1",
          "name": "C & Embedded C",
          "level": "Expert",
          "category": "Programming Languages"
        },
        {
          "id": "2",
          "name": "C++ (OOPs & STL)",
          "level": "Expert",
          "category": "Programming Languages"
        },
        {
          "id": "3",
          "name": "Python",
          "level": "Advanced",
          "category": "Programming Languages"
        },
        {
          "id": "4",
          "name": "Data Structures & Algorithms (DSA)",
          "level": "Advanced",
          "category": "Core Fundamentals"
        },
        {
          "id": "5",
          "name": "STM32 & ARM Cortex-M",
          "level": "Advanced",
          "category": "Hardware & Microcontrollers"
        },
        {
          "id": "6",
          "name": "ESP32 & Arduino",
          "level": "Expert",
          "category": "Hardware & Microcontrollers"
        },
        {
          "id": "7",
          "name": "UART, SPI, I2C & MQTT",
          "level": "Advanced",
          "category": "Protocols & Communication"
        },
        {
          "id": "8",
          "name": "MATLAB & Simulink",
          "level": "Intermediate",
          "category": "Hardware & Tools"
        },
        {
          "id": "9",
          "name": "Git & GitHub",
          "level": "Advanced",
          "category": "Software & Tools"
        },
        {
          "id": "10",
          "name": "Linux / Bash & Keil µVision",
          "level": "Intermediate",
          "category": "Software & Tools"
        }
      ],
      "projects": [
        {
          "id": "1",
          "name": "IoT Smart Energy Meter & Fault Detection System (Final Year Capstone)",
          "description": "Designed and deployed an IoT smart metering prototype that measures real-time AC voltage, current, and active power with 98.5% precision. Programmed ESP32 firmware using Embedded C and MQTT protocol to stream telemetry data to cloud dashboards with sub-2s alert latency during power surges.",
          "technologies": [
            "Embedded C",
            "ESP32",
            "MQTT",
            "Python",
            "Firebase",
            "React.js"
          ],
          "link": "github.com/rohansharma-ece/iot-smart-meter"
        },
        {
          "id": "2",
          "name": "Autonomous Obstacle Avoidance & Surveillance Rover",
          "description": "Engineered an autonomous 4WD rover powered by Arduino and Ultrasonic sensor arrays with multi-sensor fusion logic. Optimized sensor polling routines via timer interrupts, achieving a 35% reduction in CPU idle cycles and responsive 360-degree navigation.",
          "technologies": [
            "C++",
            "Arduino",
            "Ultrasonic Sensors",
            "FreeRTOS",
            "Motor Drivers"
          ],
          "link": "github.com/rohansharma-ece/obstacle-rover"
        },
        {
          "id": "3",
          "name": "Student Academic Record & GPA Management System",
          "description": "Developed a robust C++ CLI application implementing Binary Search Trees and file serialization for sub-millisecond query retrieval and sorting across 5,000+ student academic records.",
          "technologies": [
            "C++",
            "Data Structures",
            "Algorithms",
            "File I/O"
          ],
          "link": "github.com/rohansharma-ece/student-record-system"
        }
      ],
      "customSections": [
        {
          "id": "certifications",
          "title": "Certifications & Coursework",
          "items": [
            {
              "id": "c1",
              "name": "Data Structures & Algorithms in C++ - NPTEL / Coursera",
              "description": "Scored in top 5% with Gold Elite certificate",
              "date": "2024"
            },
            {
              "id": "c2",
              "name": "Embedded Systems and IoT Specialization",
              "description": "Hands-on ARM microcontroller and sensor interfacing",
              "date": "2024"
            }
          ]
        },
        {
          "id": "achievements",
          "title": "Academic Achievements & Extracurriculars",
          "items": [
            {
              "id": "a1",
              "name": "Competitive Programming & Problem Solving",
              "description": "Solved 250+ DSA problems across LeetCode & HackerRank (C++ & Python)",
              "date": "2024"
            },
            {
              "id": "a2",
              "name": "Finalist - State Level College IoT & Robotics Hackathon",
              "description": "Competed among 80+ engineering teams across the state",
              "date": "2024"
            },
            {
              "id": "a3",
              "name": "Technical Lead - College Electronics & Robotics Club",
              "description": "Conducted hands-on workshops on Arduino and Microcontrollers for 120+ juniors",
              "date": "2023 - 2024"
            }
          ]
        }
      ]
    }
  }
];

export const getResumeTemplates = (): ResumeTemplate[] =>
  resumeTemplatesBase.map((t) => ({
    ...t,
    sampleData: structuredClone(t.sampleData),
  }));
