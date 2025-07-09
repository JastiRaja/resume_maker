import { CoverLetterTemplate } from '../types/coverLetter';

export const getCoverLetterTemplates = (): CoverLetterTemplate[] => [
  {
    id: 'professional-standard',
    name: 'Professional Standard',
    description: 'Classic business letter format perfect for corporate positions',
    category: 'Professional',
    difficulty: 'Easy',
    isPremium: false,
    sampleData: {
      senderInfo: {
        name: 'Sarah Johnson',
        address: '123 Main Street\nSan Francisco, CA 94102',
        phone: '(555) 123-4567',
        email: 'sarah.johnson@email.com'
      },
      recipientInfo: {
        name: 'John Smith',
        title: 'Hiring Manager',
        company: 'TechCorp Inc.',
        address: '456 Business Ave\nSan Francisco, CA 94105'
      },
      date: new Date().toLocaleDateString(),
      subject: 'Application for Senior Software Engineer Position',
      content: `I am writing to express my strong interest in the Senior Software Engineer position at TechCorp Inc. With over 8 years of experience in full-stack development and a proven track record of leading successful projects, I am confident that I would be a valuable addition to your team.

In my current role at my previous company, I have successfully led the development of microservices architecture serving over 1 million users, resulting in a 40% improvement in application performance. My experience with modern technologies including React, Node.js, and cloud platforms aligns perfectly with the requirements outlined in your job posting.

What particularly excites me about this opportunity is TechCorp's commitment to innovation and scalable solutions. I am eager to contribute my expertise in system design and team leadership to help drive your technology initiatives forward.

I would welcome the opportunity to discuss how my background and passion for technology can contribute to TechCorp's continued success. Thank you for considering my application.`,
      closing: 'Sincerely',
      signature: 'Sarah Johnson'
    }
  },
  {
    id: 'modern-creative',
    name: 'Modern Creative',
    description: 'Contemporary design for creative and tech professionals',
    category: 'Creative',
    difficulty: 'Medium',
    isPremium: false,
    sampleData: {
      senderInfo: {
        name: 'Michael Chen',
        address: '789 Design Street\nNew York, NY 10001',
        phone: '(555) 987-6543',
        email: 'michael.chen@email.com'
      },
      recipientInfo: {
        name: 'Emma Wilson',
        title: 'Creative Director',
        company: 'Design Studio Pro',
        address: '321 Creative Blvd\nNew York, NY 10002'
      },
      date: new Date().toLocaleDateString(),
      subject: 'UX/UI Designer Position - Portfolio Attached',
      content: `Hello Emma,

I'm thrilled to submit my application for the UX/UI Designer position at Design Studio Pro. As a passionate designer with 6 years of experience crafting user-centered digital experiences, I'm excited about the opportunity to contribute to your team's innovative projects.

My approach to design combines deep user research with creative problem-solving. In my recent project, I led the UX redesign for a mobile banking app that resulted in a 60% increase in user engagement and a 35% reduction in support tickets. This experience taught me the importance of balancing user needs with business objectives.

What draws me to Design Studio Pro is your commitment to pushing creative boundaries while maintaining exceptional usability standards. I'm particularly inspired by your recent work on the sustainable fashion platform – the seamless integration of complex filtering with intuitive navigation is exactly the kind of thoughtful design I strive to create.

I'd love to discuss how my experience in user research, prototyping, and design systems can help elevate your clients' digital experiences. My portfolio showcases several projects that demonstrate my ability to solve complex UX challenges while delivering visually compelling solutions.

Looking forward to hearing from you!`,
      closing: 'Best regards',
      signature: 'Michael Chen'
    }
  },
  {
    id: 'executive-formal',
    name: 'Executive Formal',
    description: 'Sophisticated format for senior-level positions',
    category: 'Executive',
    difficulty: 'Advanced',
    isPremium: true,
    sampleData: {
      senderInfo: {
        name: 'Emily Rodriguez',
        address: '567 Executive Drive\nAustin, TX 78701',
        phone: '(555) 456-7890',
        email: 'emily.rodriguez@email.com'
      },
      recipientInfo: {
        name: 'David Thompson',
        title: 'CEO',
        company: 'InnovateNow Corp',
        address: '890 Innovation Way\nAustin, TX 78702'
      },
      date: new Date().toLocaleDateString(),
      subject: 'Chief Technology Officer Position',
      content: `Dear Mr. Thompson,

I am writing to express my interest in the Chief Technology Officer position at InnovateNow Corp. With over 15 years of progressive leadership experience in technology organizations, I have successfully guided companies through transformative growth phases while building high-performing engineering teams.

Throughout my career, I have consistently delivered measurable results: scaling engineering organizations from 50 to 200+ employees, architecting cloud migrations that reduced operational costs by 30%, and establishing robust data governance frameworks that ensured compliance across multiple regulatory environments. My experience leading technical due diligence for three successful acquisitions has given me deep insight into identifying and capitalizing on technological synergies.

InnovateNow's reputation for fostering innovation while maintaining operational excellence aligns perfectly with my leadership philosophy. I am particularly drawn to your company's commitment to sustainable technology solutions and your recent initiatives in AI-driven automation. I believe my experience in strategic technology planning and team development would be instrumental in supporting your continued growth trajectory.

I would welcome the opportunity to discuss how my track record of building scalable technology organizations and driving digital transformation can contribute to InnovateNow's strategic objectives. I am confident that my combination of technical expertise, leadership experience, and business acumen would make me a valuable addition to your executive team.

Thank you for your consideration. I look forward to the opportunity to discuss this position further.`,
      closing: 'Respectfully',
      signature: 'Emily Rodriguez'
    }
  },
  {
    id: 'entry-level-enthusiastic',
    name: 'Entry Level Enthusiastic',
    description: 'Energetic tone perfect for recent graduates',
    category: 'Entry Level',
    difficulty: 'Easy',
    isPremium: false,
    sampleData: {
      senderInfo: {
        name: 'Alex Thompson',
        address: '234 Student Lane\nDenver, CO 80202',
        phone: '(555) 234-5678',
        email: 'alex.thompson@email.com'
      },
      recipientInfo: {
        name: 'Lisa Garcia',
        title: 'Development Team Lead',
        company: 'WebTech Solutions',
        address: '345 Tech Street\nDenver, CO 80203'
      },
      date: new Date().toLocaleDateString(),
      subject: 'Application for Junior Web Developer Position',
      content: `Dear Lisa,

I am excited to apply for the Junior Web Developer position at WebTech Solutions. As a recent graduate with a passion for web development and a strong foundation in modern technologies, I am eager to begin my career with a company known for its innovative approach to digital solutions.

During my intensive full-stack development bootcamp, I discovered my love for problem-solving through code. I built five complete applications using React, Node.js, and MongoDB, each project teaching me valuable lessons about user experience, database design, and collaborative development. My final project, a task management application with real-time collaboration features, showcased my ability to integrate multiple technologies while maintaining clean, maintainable code.

What excites me most about WebTech Solutions is your commitment to mentoring junior developers and your diverse portfolio of client projects. I'm particularly impressed by your recent work on the e-commerce platform for local businesses – it's exactly the kind of meaningful project where I'd love to contribute my skills and continue learning.

While I may be early in my career, I bring enthusiasm, adaptability, and a strong work ethic. My background in psychology has given me valuable insights into user behavior and team dynamics, skills that I believe complement my technical abilities. I'm eager to learn from your experienced team while contributing fresh perspectives and modern development practices.

I would love the opportunity to discuss how my passion for web development and commitment to continuous learning can contribute to WebTech Solutions' continued success. Thank you for considering my application!`,
      closing: 'Enthusiastically',
      signature: 'Alex Thompson'
    }
  },
  {
    id: 'marketing-persuasive',
    name: 'Marketing Persuasive',
    description: 'Compelling format for marketing professionals',
    category: 'Marketing',
    difficulty: 'Medium',
    isPremium: false,
    sampleData: {
      senderInfo: {
        name: 'Jessica Martinez',
        address: '456 Marketing Ave\nLos Angeles, CA 90210',
        phone: '(555) 345-6789',
        email: 'jessica.martinez@email.com'
      },
      recipientInfo: {
        name: 'Mark Johnson',
        title: 'Marketing Director',
        company: 'GrowthBrand Agency',
        address: '123 Brand Street\nLos Angeles, CA 90211'
      },
      date: new Date().toLocaleDateString(),
      subject: 'Digital Marketing Manager Position - Let\'s Drive Results Together',
      content: `Dear Mark,

Your recent campaign for the sustainable fashion brand caught my attention – the way you seamlessly integrated storytelling with data-driven targeting was brilliant. As someone who's spent 7+ years crafting campaigns that not only engage audiences but drive measurable business results, I'm excited to apply for the Digital Marketing Manager position at GrowthBrand Agency.

Numbers tell stories, and mine speak to impact: I've increased client revenue by 150% through strategic multi-channel campaigns, managed $2M+ in annual advertising spend while maintaining positive ROI, and grown social media communities from thousands to hundreds of thousands of engaged followers. But beyond the metrics, I'm passionate about the psychology behind effective marketing – understanding what motivates people to act and crafting messages that resonate on an emotional level.

What sets me apart is my ability to see the bigger picture while executing flawlessly on the details. When I launched a content marketing strategy that increased organic traffic by 300%, it wasn't just about SEO – it was about creating genuine value for our audience while building brand authority. This holistic approach to marketing has consistently delivered results across B2B and B2C clients in industries ranging from tech startups to established e-commerce brands.

GrowthBrand's reputation for innovative campaigns and client success aligns perfectly with my professional values. I'm particularly drawn to your data-driven approach and your commitment to staying ahead of industry trends. I believe my experience with emerging platforms and my track record of adapting strategies to changing market conditions would be valuable assets to your team.

I'd love to discuss how my passion for performance marketing and strategic thinking can help drive GrowthBrand's continued success. Let's chat about how we can create campaigns that not only capture attention but convert it into lasting business value.`,
      closing: 'Excited to connect',
      signature: 'Jessica Martinez'
    }
  },
  {
    id: 'healthcare-professional',
    name: 'Healthcare Professional',
    description: 'Compassionate tone for healthcare positions',
    category: 'Healthcare',
    difficulty: 'Medium',
    isPremium: true,
    sampleData: {
      senderInfo: {
        name: 'Dr. Robert Kim',
        address: '789 Medical Center Dr\nSeattle, WA 98101',
        phone: '(555) 567-8901',
        email: 'robert.kim@email.com'
      },
      recipientInfo: {
        name: 'Dr. Sarah Mitchell',
        title: 'Chief of Emergency Medicine',
        company: 'Seattle General Hospital',
        address: '321 Hospital Way\nSeattle, WA 98102'
      },
      date: new Date().toLocaleDateString(),
      subject: 'Application for Attending Emergency Physician Position',
      content: `Dear Dr. Mitchell,

I am writing to express my strong interest in the Attending Emergency Physician position at Seattle General Hospital. As a board-certified emergency medicine physician with 10 years of experience in high-acuity emergency departments, I am drawn to Seattle General's reputation for excellence in patient care and commitment to medical education.

Throughout my career, I have been dedicated to providing compassionate, evidence-based care to patients and their families during their most vulnerable moments. In my current role, I manage the care of over 15,000 patients annually while leading interdisciplinary teams in complex trauma and critical care situations. My experience has taught me that exceptional emergency medicine requires not only clinical expertise but also strong leadership, clear communication, and the ability to remain calm under pressure.

What particularly attracts me to Seattle General is your department's focus on quality improvement and patient safety initiatives. I have been actively involved in similar programs at my current institution, including serving on the hospital's quality improvement committee and leading a project that reduced patient wait times by 25%. I am passionate about using data-driven approaches to enhance patient outcomes while maintaining the highest standards of care.

As an educator, I find great fulfillment in mentoring emergency medicine residents and medical students. I believe that teaching the next generation of physicians is one of our most important responsibilities, and I am committed to fostering an environment where learners can develop both their clinical skills and their professional values.

I would welcome the opportunity to discuss how my clinical expertise, leadership experience, and dedication to patient care can contribute to Seattle General's mission. Thank you for considering my application, and I look forward to the possibility of joining your exceptional team.`,
      closing: 'Sincerely',
      signature: 'Dr. Robert Kim, MD'
    }
  }
];