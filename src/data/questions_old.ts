import type { ProfileQuestion } from "@/types/profile";

export const profileQuestions: ProfileQuestion[] = [
  // ===== BASIC INFORMATION (1-15) =====
  {
    id: 'full_name',
    category: 'basic_info',
    question: 'What is your full name?',
    type: 'text',
    required: true,
    placeholder: 'e.g., John Michael Smith'
  },
  {
    id: 'email',
    category: 'basic_info',
    question: 'What is your email address?',
    type: 'text',
    required: true,
    placeholder: 'example@email.com'
  },
  {
    id: 'phone',
    category: 'basic_info',
    question: 'What is your phone number?',
    type: 'text',
    required: true,
    placeholder: '+1 (555) 123-4567'
  },
  {
    id: 'location',
    category: 'basic_info',
    question: 'What is your current location?',
    type: 'text',
    required: false,
    placeholder: 'City, State, ZIP code'
  },
  {
    id: 'professional_summary',
    category: 'basic_info',
    question: 'Provide a brief professional summary (2-3 sentences)',
    type: 'textarea',
    required: false,
    placeholder: 'Describe your professional background and key achievements'
  },
  {
    id: 'linkedin_profile',
    category: 'basic_info',
    question: 'What is your LinkedIn profile URL?',
    type: 'text',
    required: false,
    placeholder: 'https://linkedin.com/in/yourprofile'
  },
  {
    id: 'work_authorization',
    category: 'basic_info',
    question: 'What is your work authorization status in the US?',
    type: 'select',
    options: ['US Citizen', 'Green Card Holder', 'H1B Visa', 'OPT/CPT', 'TN Visa', 'Other Work Visa', 'Require Sponsorship'],
    required: true
  },
  {
    id: 'years_experience',
    category: 'basic_info',
    question: 'How many years of total work experience do you have?',
    type: 'select',
    options: ['0-1 years', '1-2 years', '2-5 years', '5-10 years', '10-15 years', '15+ years'],
    required: false
  },
  {
    id: 'portfolio_website',
    category: 'basic_info',
    question: 'Do you have a portfolio or personal website?',
    type: 'text',
    required: false,
    placeholder: 'https://yourportfolio.com'
  },
  {
    id: 'github_profile',
    category: 'basic_info',
    question: 'What is your GitHub profile URL?',
    type: 'text',
    required: false,
    placeholder: 'https://github.com/yourusername'
  },
  {
    id: 'languages',
    category: 'basic_info',
    question: 'What languages do you speak and at what level?',
    type: 'multiselect',
    options: ['English (Native)', 'English (Fluent)', 'English (Conversational)', 'English (Basic)', 'Spanish', 'French', 'German', 'Chinese (Mandarin)', 'Chinese (Cantonese)', 'Japanese', 'Korean', 'Arabic', 'Portuguese', 'Italian', 'Russian', 'Hindi'],
    required: true,
    allowOther: true
  },
  {
    id: 'willing_to_relocate',
    category: 'basic_info',
    question: 'Are you willing to relocate for work?',
    type: 'select',
    options: ['Yes, anywhere in the US', 'Yes, within my state', 'Yes, within my region', 'No, local only'],
    required: false
  },
  {
    id: 'remote_work_preference',
    category: 'basic_info',
    question: 'What is your remote work preference?',
    type: 'select',
    options: ['Remote only', 'Hybrid preferred', 'On-site preferred', 'No preference'],
    required: false
  },
  {
    id: 'salary_expectation',
    category: 'basic_info',
    question: 'What is your salary expectation range?',
    type: 'range',
    scale: { min: 30000, max: 300000, step: 5000 },
    required: false,
    helpText: 'Annual salary in USD'
  },
  {
    id: 'availability',
    category: 'basic_info',
    question: 'When are you available to start?',
    type: 'select',
    options: ['Immediately', 'Within 2 weeks', 'Within 1 month', 'Within 2 months', 'More than 2 months'],
    required: false
  },

  // ===== EDUCATION (16-35) =====
  {
    id: 'highest_education',
    category: 'education',
    question: 'What is your highest level of education?',
    type: 'select',
    options: ['High School Diploma/GED', 'Some College', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctoral Degree', 'Professional Degree (JD, MD, etc.)', 'Trade/Vocational Certification'],
    required: true
  },
  {
    id: 'degree_field',
    category: 'education',
    question: 'What field did you study?',
    type: 'text',
    required: false,
    placeholder: 'e.g., Computer Science, Business Administration'
  },
  {
    id: 'university_name',
    category: 'education',
    question: 'What institution did you attend?',
    type: 'text',
    required: false,
    placeholder: 'University/College name'
  },
  {
    id: 'graduation_year',
    category: 'education',
    question: 'What year did you graduate?',
    type: 'select',
    options: ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', 'Before 2015', 'Current Student'],
    required: false
  },
  {
    id: 'gpa',
    category: 'education',
    question: 'What was your GPA? (if 3.5 or higher)',
    type: 'text',
    required: false,
    placeholder: '3.8/4.0'
  },
  {
    id: 'relevant_coursework',
    category: 'education',
    question: 'List any relevant coursework',
    type: 'textarea',
    required: false,
    placeholder: 'Data Structures, Algorithms, Database Systems...'
  },
  {
    id: 'academic_achievements',
    category: 'education',
    question: 'Any academic honors, awards, or achievements?',
    type: 'textarea',
    required: false,
    placeholder: 'Dean\'s List, Summa Cum Laude, Phi Beta Kappa...'
  },
  {
    id: 'additional_education',
    category: 'education',
    question: 'Do you have additional degrees or certifications?',
    type: 'textarea',
    required: false,
    placeholder: 'List other degrees, certifications, or continuing education'
  },
  {
    id: 'study_abroad',
    category: 'education',
    question: 'Did you study abroad or participate in exchange programs?',
    type: 'textarea',
    required: false,
    placeholder: 'Country, institution, duration'
  },
  {
    id: 'research_experience',
    category: 'education',
    question: 'Do you have research experience?',
    type: 'textarea',
    required: false,
    placeholder: 'Research projects, publications, thesis work'
  },
  {
    id: 'extracurricular_activities',
    category: 'education',
    question: 'What extracurricular activities were you involved in?',
    type: 'multiselect',
    options: ['Student Government', 'Greek Life', 'Sports Teams', 'Academic Clubs', 'Volunteer Organizations', 'Professional Societies', 'Honor Societies', 'Arts/Music Groups', 'Debate Team', 'Student Publications'],
    required: false,
    allowOther: true
  },
  {
    id: 'leadership_roles',
    category: 'education',
    question: 'Did you hold any leadership positions in school?',
    type: 'textarea',
    required: false,
    placeholder: 'Club president, team captain, committee chair...'
  },
  {
    id: 'internships',
    category: 'education',
    question: 'Did you complete any internships?',
    type: 'textarea',
    required: false,
    placeholder: 'Company, role, duration, key responsibilities'
  },
  {
    id: 'study_groups',
    category: 'education',
    question: 'Were you involved in study groups or tutoring?',
    type: 'multiselect',
    options: ['Led study groups', 'Participated in study groups', 'Tutored other students', 'Received tutoring', 'Peer mentor', 'Teaching assistant'],
    required: false
  },
  {
    id: 'capstone_project',
    category: 'education',
    question: 'Did you complete a capstone or senior project?',
    type: 'textarea',
    required: false,
    placeholder: 'Project title, description, outcomes'
  },
  {
    id: 'continuing_education',
    category: 'education',
    question: 'Are you currently pursuing any continuing education?',
    type: 'textarea',
    required: false,
    placeholder: 'Online courses, certifications, additional degrees'
  },
  {
    id: 'educational_goals',
    category: 'education',
    question: 'Do you have any future educational goals?',
    type: 'textarea',
    required: false,
    placeholder: 'Plans for additional degrees, certifications, or training'
  },
  {
    id: 'scholarships',
    category: 'education',
    question: 'Did you receive any scholarships or grants?',
    type: 'textarea',
    required: false,
    placeholder: 'Scholarship names, amounts, criteria'
  },
  {
    id: 'academic_projects',
    category: 'education',
    question: 'What significant academic projects did you complete?',
    type: 'textarea',
    required: false,
    placeholder: 'Major projects, group work, presentations'
  },
  {
    id: 'learning_disabilities',
    category: 'education',
    question: 'Did you overcome any learning challenges or disabilities?',
    type: 'textarea',
    required: false,
    placeholder: 'Only include if it demonstrates resilience or unique perspective'
  },

  // ===== TECHNICAL SKILLS (36-70) =====
  {
    id: 'programming_languages',
    category: 'technical_skills',
    question: 'Rate your proficiency in programming languages',
    type: 'skill_matrix',
    matrix: {
      items: ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB'],
      scale: { min: 1, max: 5, labels: ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'web_technologies',
    category: 'technical_skills',
    question: 'Rate your proficiency in web technologies',
    type: 'skill_matrix',
    matrix: {
      items: ['HTML/CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'jQuery', 'Bootstrap', 'Tailwind CSS', 'SASS/SCSS'],
      scale: { min: 1, max: 5, labels: ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'databases',
    category: 'technical_skills',
    question: 'Rate your proficiency with databases',
    type: 'skill_matrix',
    matrix: {
      items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'SQL Server', 'SQLite', 'Redis', 'Cassandra', 'DynamoDB', 'Firebase'],
      scale: { min: 1, max: 5, labels: ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'cloud_platforms',
    category: 'technical_skills',
    question: 'Rate your experience with cloud platforms',
    type: 'skill_matrix',
    matrix: {
      items: ['AWS', 'Google Cloud', 'Microsoft Azure', 'Heroku', 'DigitalOcean', 'Vercel', 'Netlify'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'devops_tools',
    category: 'technical_skills',
    question: 'Rate your proficiency with DevOps and deployment tools',
    type: 'skill_matrix',
    matrix: {
      items: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI/CD', 'GitHub Actions', 'Terraform', 'Ansible', 'Chef', 'Puppet'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'mobile_development',
    category: 'technical_skills',
    question: 'Rate your mobile development experience',
    type: 'skill_matrix',
    matrix: {
      items: ['React Native', 'Flutter', 'iOS (Swift)', 'Android (Kotlin/Java)', 'Xamarin', 'Ionic', 'Cordova'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'testing_frameworks',
    category: 'technical_skills',
    question: 'Rate your experience with testing frameworks',
    type: 'skill_matrix',
    matrix: {
      items: ['Jest', 'Mocha', 'Jasmine', 'Cypress', 'Selenium', 'PyTest', 'JUnit', 'TestNG', 'Postman'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'version_control',
    category: 'technical_skills',
    question: 'Rate your version control experience',
    type: 'skill_matrix',
    matrix: {
      items: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN', 'Mercurial'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'data_analysis',
    category: 'technical_skills',
    question: 'Rate your data analysis and visualization skills',
    type: 'skill_matrix',
    matrix: {
      items: ['Excel', 'Tableau', 'Power BI', 'D3.js', 'Matplotlib', 'Seaborn', 'Pandas', 'NumPy', 'SciPy', 'R'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'machine_learning',
    category: 'technical_skills',
    question: 'Rate your machine learning and AI experience',
    type: 'skill_matrix',
    matrix: {
      items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'NLP', 'Deep Learning', 'Computer Vision'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'operating_systems',
    category: 'technical_skills',
    question: 'Rate your proficiency with operating systems',
    type: 'skill_matrix',
    matrix: {
      items: ['Windows', 'macOS', 'Linux (Ubuntu)', 'Linux (CentOS)', 'Unix', 'Windows Server'],
      scale: { min: 1, max: 5, labels: ['Basic User', 'Intermediate', 'Advanced', 'Power User', 'System Admin'] }
    },
    required: false
  },
  {
    id: 'networking',
    category: 'technical_skills',
    question: 'Rate your networking knowledge',
    type: 'skill_matrix',
    matrix: {
      items: ['TCP/IP', 'DNS', 'HTTP/HTTPS', 'VPN', 'Firewalls', 'Load Balancing', 'CDN', 'REST APIs', 'GraphQL'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'security',
    category: 'technical_skills',
    question: 'Rate your cybersecurity knowledge',
    type: 'skill_matrix',
    matrix: {
      items: ['OWASP', 'Penetration Testing', 'Encryption', 'OAuth/JWT', 'SSL/TLS', 'GDPR Compliance', 'SOC2', 'PCI DSS'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'project_management_tools',
    category: 'technical_skills',
    question: 'Rate your experience with project management tools',
    type: 'skill_matrix',
    matrix: {
      items: ['Jira', 'Asana', 'Trello', 'Monday.com', 'Slack', 'Microsoft Teams', 'Notion', 'Confluence'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Power User'] }
    },
    required: false
  },
  {
    id: 'design_tools',
    category: 'technical_skills',
    question: 'Rate your proficiency with design tools',
    type: 'skill_matrix',
    matrix: {
      items: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Sketch', 'InVision', 'Adobe XD', 'Canva', 'GIMP'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'cms_platforms',
    category: 'technical_skills',
    question: 'Rate your experience with CMS platforms',
    type: 'skill_matrix',
    matrix: {
      items: ['WordPress', 'Drupal', 'Joomla', 'Shopify', 'Magento', 'Wix', 'Squarespace', 'Ghost'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'automation_tools',
    category: 'technical_skills',
    question: 'Rate your experience with automation tools',
    type: 'skill_matrix',
    matrix: {
      items: ['Zapier', 'IFTTT', 'Power Automate', 'Selenium', 'Puppet', 'Chef', 'Ansible'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'api_development',
    category: 'technical_skills',
    question: 'Rate your API development experience',
    type: 'skill_matrix',
    matrix: {
      items: ['REST APIs', 'GraphQL', 'SOAP', 'gRPC', 'WebSockets', 'API Documentation', 'Postman', 'Swagger'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'blockchain',
    category: 'technical_skills',
    question: 'Rate your blockchain and cryptocurrency knowledge',
    type: 'skill_matrix',
    matrix: {
      items: ['Solidity', 'Ethereum', 'Bitcoin', 'Smart Contracts', 'Web3.js', 'Truffle', 'Hardhat', 'NFTs'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'iot_embedded',
    category: 'technical_skills',
    question: 'Rate your IoT and embedded systems experience',
    type: 'skill_matrix',
    matrix: {
      items: ['Arduino', 'Raspberry Pi', 'C/C++ for embedded', 'MQTT', 'LoRaWAN', 'Bluetooth', 'WiFi', 'Sensors'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'game_development',
    category: 'technical_skills',
    question: 'Rate your game development experience',
    type: 'skill_matrix',
    matrix: {
      items: ['Unity', 'Unreal Engine', 'Godot', 'GameMaker', 'Phaser', 'Three.js', '2D Graphics', '3D Modeling'],
      scale: { min: 1, max: 5, labels: ['None', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'technical_certifications',
    category: 'technical_skills',
    question: 'What technical certifications do you hold?',
    type: 'multiselect',
    options: [
      'AWS Certified Solutions Architect',
      'AWS Certified Developer',
      'Google Cloud Professional',
      'Microsoft Azure Fundamentals',
      'Microsoft Azure Developer',
      'CompTIA A+',
      'CompTIA Network+',
      'CompTIA Security+',
      'CISSP',
      'CEH (Certified Ethical Hacker)',
      'PMP',
      'Scrum Master',
      'Oracle Certified Professional',
      'Microsoft Certified: Azure',
      'Salesforce Certified',
      'Cisco CCNA',
      'Red Hat Certified',
      'VMware Certified'
    ],
    required: false,
    allowOther: true
  },
  {
    id: 'learning_new_tech',
    category: 'technical_skills',
    question: 'How do you stay current with technology trends?',
    type: 'multiselect',
    options: [
      'Online courses (Coursera, Udemy, etc.)',
      'Tech blogs and articles',
      'YouTube tutorials',
      'GitHub projects',
      'Tech conferences',
      'Meetups and networking',
      'Podcasts',
      'Stack Overflow',
      'Reddit communities',
      'Company training programs'
    ],
    required: false
  },
  {
    id: 'open_source_contributions',
    category: 'technical_skills',
    question: 'Have you contributed to open source projects?',
    type: 'textarea',
    required: false,
    placeholder: 'Describe your open source contributions, projects maintained, or communities involved'
  },
  {
    id: 'technical_blog_writing',
    category: 'technical_skills',
    question: 'Do you write technical blogs or documentation?',
    type: 'textarea',
    required: false,
    placeholder: 'Links to blogs, technical writing, or documentation you\'ve created'
  },
  {
    id: 'hackathons',
    category: 'technical_skills',
    question: 'Have you participated in hackathons or coding competitions?',
    type: 'textarea',
    required: false,
    placeholder: 'Event names, awards, projects built'
  },
  {
    id: 'code_review_experience',
    category: 'technical_skills',
    question: 'Do you have experience with code reviews and mentoring?',
    type: 'multiselect',
    options: [
      'Conducted code reviews',
      'Received code reviews',
      'Mentored junior developers',
      'Pair programming',
      'Led technical discussions',
      'Created coding standards'
    ],
    required: false
  },
  {
    id: 'system_architecture',
    category: 'technical_skills',
    question: 'Have you designed system architecture or made technical decisions?',
    type: 'textarea',
    required: false,
    placeholder: 'Describe systems you\'ve architected, technical decisions you\'ve made, or scalability challenges you\'ve solved'
  },
  {
    id: 'debugging_troubleshooting',
    category: 'technical_skills',
    question: 'Rate your debugging and troubleshooting abilities',
    type: 'skill_matrix',
    matrix: {
      items: ['Log analysis', 'Performance profiling', 'Database optimization', 'Network troubleshooting', 'Memory leak detection', 'Bug reproduction'],
      scale: { min: 1, max: 5, labels: ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
    },
    required: false
  },
  {
    id: 'software_methodologies',
    category: 'technical_skills',
    question: 'What software development methodologies have you worked with?',
    type: 'multiselect',
    options: [
      'Agile/Scrum',
      'Waterfall',
      'Kanban',
      'Lean',
      'DevOps',
      'Test-Driven Development (TDD)',
      'Behavior-Driven Development (BDD)',
      'Continuous Integration/Deployment'
    ],
    required: false
  },
  {
    id: 'technical_leadership',
    category: 'technical_skills',
    question: 'Have you provided technical leadership or guidance?',
    type: 'textarea',
    required: false,
    placeholder: 'Examples of technical leadership, team guidance, or project ownership'
  },
  {
    id: 'performance_optimization',
    category: 'technical_skills',
    question: 'Have you worked on performance optimization?',
    type: 'textarea',
    required: false,
    placeholder: 'Examples of performance improvements, optimization techniques used, results achieved'
  },
  {
    id: 'technology_evaluation',
    category: 'technical_skills',
    question: 'Have you evaluated or recommended new technologies?',
    type: 'textarea',
    required: false,
    placeholder: 'Technologies you\'ve researched, evaluated, or recommended for adoption'
  },

  // ===== WORK EXPERIENCE & CAREER HISTORY (71-110) =====
  
  {
    id: 'tech_2',
    category: 'tech',
    question: 'Опишите ваш опыт работы с базами данных',
    type: 'textarea',
    required: false
  },
  
  {
    id: 'tech_3',
    category: 'tech',
    question: 'Работали ли вы с облачными платформами?',
    type: 'multiselect',
    options: ['AWS', 'Google Cloud', 'Azure', 'Heroku', 'DigitalOcean', 'Vercel', 'Netlify', 'Не работал с облачными платформами'],
    required: false
  },

  // Гостеприимство
  {
    id: 'hospitality_1',
    category: 'hospitality',
    question: 'Есть ли у вас опыт работы в сфере гостеприимства?',
    type: 'boolean',
    required: false,
    followUp: ['hospitality_2', 'hospitality_3']
  },
  
  {
    id: 'hospitality_2',
    category: 'hospitality',
    question: 'В каких областях гостеприимства вы работали?',
    type: 'multiselect',
    options: ['Отели', 'Рестораны', 'Кафе', 'Бары', 'Event-организация', 'Туризм', 'Авиакомпании', 'Круизы'],
    required: false
  },
  
  {
    id: 'hospitality_3',
    category: 'hospitality',
    question: 'Опишите ваши навыки работы с клиентами',
    type: 'textarea',
    required: false
  },
  
  {
    id: 'hospitality_4',
    category: 'hospitality',
    question: 'Умеете ли вы работать с системами бронирования?',
    type: 'multiselect',
    options: ['Booking.com', 'Airbnb', 'Hotel PMS', 'Opera', 'Fidelio', 'Amadeus', 'Не работал с системами бронирования'],
    required: false
  },

  // Клининг
  {
    id: 'cleaning_1',
    category: 'cleaning',
    question: 'Есть ли у вас опыт профессиональной уборки?',
    type: 'boolean',
    required: false,
    followUp: ['cleaning_2', 'cleaning_3']
  },
  
  {
    id: 'cleaning_2',
    category: 'cleaning',
    question: 'С какими типами помещений вы работали?',
    type: 'multiselect',
    options: ['Жилые помещения', 'Офисы', 'Медицинские учреждения', 'Рестораны/кафе', 'Отели', 'Торговые центры', 'Промышленные объекты'],
    required: false
  },
  
  {
    id: 'cleaning_3',
    category: 'cleaning',
    question: 'Знакомы ли вы с профессиональным клининговым оборудованием?',
    type: 'textarea',
    required: false
  },

  // Лабораторная работа
  {
    id: 'lab_1',
    category: 'laboratory',
    question: 'Есть ли у вас опыт работы в лабораториях?',
    type: 'boolean',
    required: false,
    followUp: ['lab_2', 'lab_3']
  },
  
  {
    id: 'lab_2',
    category: 'laboratory',
    question: 'В каких типах лабораторий вы работали?',
    type: 'multiselect',
    options: ['Медицинские', 'Химические', 'Биологические', 'Физические', 'Пищевые', 'Экологические', 'Криминалистические'],
    required: false
  },
  
  {
    id: 'lab_3',
    category: 'laboratory',
    question: 'С каким лабораторным оборудованием вы умеете работать?',
    type: 'textarea',
    required: false
  },

  // Личностные качества
  {
    id: 'personality_1',
    category: 'personality',
    question: 'Как вы работаете в команде?',
    type: 'scale',
    required: false
  },
  
  {
    id: 'personality_2',
    category: 'personality',
    question: 'Опишите ситуацию, когда вам пришлось решать сложную проблему',
    type: 'textarea',
    required: false
  },
  
  {
    id: 'personality_3',
    category: 'personality',
    question: 'Что вас мотивирует в работе?',
    type: 'multiselect',
    options: ['Возможность обучения', 'Карьерный рост', 'Стабильность', 'Творческая свобода', 'Командная работа', 'Автономность', 'Помощь людям', 'Решение сложных задач'],
    required: false
  },

  // Рабочие предпочтения
  {
    id: 'work_pref_1',
    category: 'work_preferences',
    question: 'Какой тип занятости вас интересует?',
    type: 'multiselect',
    options: ['Полная занятость', 'Частичная занятость', 'Проектная работа', 'Фриланс', 'Стажировка', 'Временная работа'],
    required: true
  },
  
  {
    id: 'work_pref_2',
    category: 'work_preferences',
    question: 'Предпочитаемый формат работы?',
    type: 'multiselect',
    options: ['Удаленно', 'В офисе', 'Гибридный формат', 'Готов к командировкам', 'Гибкий график'],
    required: true
  },
  
  {
    id: 'work_pref_3',
    category: 'work_preferences',
    question: 'В каких отраслях вы хотели бы работать?',
    type: 'multiselect',
    options: ['IT и технологии', 'Гостеприимство и туризм', 'Клининговые услуги', 'Наука и исследования', 'Медицина', 'Образование', 'Финансы', 'Маркетинг', 'Другое'],
    required: true
  }
];

export const getQuestionsByCategory = (category: string): ProfileQuestion[] => {
  return profileQuestions.filter(q => q.category === category);
};

export const getFollowUpQuestions = (questionId: string): ProfileQuestion[] => {
  const question = profileQuestions.find(q => q.id === questionId);
  if (!question?.followUp) return [];
  
  return profileQuestions.filter(q => question.followUp?.includes(q.id));
};
