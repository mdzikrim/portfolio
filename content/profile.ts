/**
 * Everything about *you* lives here.
 * Editing this one file updates the whole site (nav, hero, about, experience, contact, SEO).
 * Projects live separately, as Markdown files in `content/projects/`.
 */

export const profile = {
  name: "Muhammad Dzikri Muqimulhaq",
  shortName: "Dzikri",
  // Shown under your name in the hero. Keep it to one line.
  role: "AI / Machine Learning Engineer",
  // Rotating words in the hero. Add or remove freely.
  focusAreas: ["Machine Learning", "Data Analysis", "Cybersecurity"],
  location: "Bandung, West Java, Indonesia",

  // One-paragraph pitch on the hero. Two or three sentences max.
  tagline:
    "I build systems that learn from data — from behavioral biometrics for authentication to computer-vision models running on a phone. Computer Engineering student at Telkom University, security lab assistant, and a stubborn debugger.",

  // Longer bio for the About section. Each string is a paragraph.
  bio: [
    "I'm a Computer Engineering student at Telkom University and a Laboratory Assistant at SECULAB, working at the intersection of data science and cybersecurity. Most of what I build starts as a question: can a model tell *who* is typing, not just *what* was typed? Can a phone sort household waste well enough to actually be useful?",
    "My comfort zone is the full lifecycle — collecting and cleaning the dataset, training and evaluating the model, then wrapping it in something a person can actually click. I care about being honest with results: if a 99% accuracy number smells like overfitting, I'd rather say so in the README than hide it.",
  ],

  // Contact + social. Leave a value as an empty string to hide that link.
  email: "muhamaddzikri2004@gmail.com",
  phone: "+62 851-1761-2506",
  socials: {
    github: "https://github.com/mdzikrim",
    linkedin: "https://www.linkedin.com/in/mohammad-dzikri-muqimulhaq",
    medium: "",
    instagram: "",
  },

  // Put the PDF in `public/` and point to it here.
  cv: {
    href: "/Muhammad-Dzikri-Muqimulhaq-CV.pdf",
    label: "Download CV",
  },

  // Grouped so the About section can render them as columns.
  skills: [
    {
      group: "Machine Learning & Deep Learning",
      items: [
        "scikit-learn",
        "TensorFlow / Keras",
        "PyTorch",
        "CNN (MobileNetV2)",
        "Random Forest",
        "Model evaluation & cross-validation",
      ],
    },
    {
      group: "Data Analysis",
      items: [
        "Python (pandas, NumPy)",
        "SQL",
        "Power BI",
        "Tableau",
        "Statistical analysis",
        "Data cleaning & EDA",
      ],
    },
    {
      group: "Cybersecurity",
      items: [
        "Ethical hacking",
        "Penetration testing",
        "Network monitoring",
        "Vulnerability assessment",
        "Behavioral biometrics",
        "Digital forensics",
      ],
    },
    {
      group: "Engineering & Tools",
      items: [
        "Flask",
        "Django REST Framework",
        "React",
        "Kotlin / Android",
        "PostgreSQL / PostGIS",
        "Git & GitHub",
      ],
    },
  ],

  education: [
    {
      school: "Telkom University",
      degree: "B.Eng. Computer Engineering",
      period: "Aug 2022 — Present",
      location: "Bandung, Indonesia",
      notes: [
        "Final research: Hydroponic Plant Maintenance and Growth Monitoring System.",
        "Lab research: Keystroke Dynamics Authentication Using Random Forest.",
      ],
    },
  ],

  // Work / research / teaching. Newest first.
  experience: [
    {
      role: "Laboratory Assistant",
      org: "Security Laboratory (SECULAB), Telkom University",
      period: "Dec 2025 — Present",
      location: "Bandung, Indonesia",
      points: [
        "Teach core practical modules: ethical hacking, firewall implementation, and secure coding.",
        "Maintain lab infrastructure for penetration testing, network monitoring, and vulnerability assessment sessions.",
        "Build and maintain virtual environments that simulate varied cybersecurity scenarios.",
        "Co-develop training material on cryptography, digital forensics, and web application security with instructors.",
      ],
    },
    {
      role: "AI Engineer Intern",
      org: "ProCodeCG",
      period: "Jul — Sep 2025",
      location: "Bandung, Indonesia",
      points: [
        "Built a waste classification system using CNN architectures to automate categorization of household waste.",
        "Ran preprocessing and augmentation to lift accuracy and keep performance stable across waste categories.",
        "Owned the end-to-end ML pipeline with the engineering team: dataset collection, training, and system integration.",
        "Tuned deep learning models in TensorFlow and PyTorch for faster, more reliable image recognition.",
      ],
    },
    {
      role: "Research Team Lead — Behavioral Biometrics",
      org: "Research Group, Security Laboratory",
      period: "Apr — Jun 2025",
      location: "Bandung, Indonesia",
      points: [
        "Led a research team building keystroke-dynamics authentication with a Random Forest classifier.",
        "Designed a web application that analyzes hold time and flight time as an implicit second factor (2FA).",
        "Applied scikit-learn to capture sequential typing patterns while keeping overfitting in check.",
        "Managed the full research workflow: respondent dataset collection, troubleshooting, and login-interface testing against brute-force attempts.",
      ],
    },
  ],

  // Organization, committee, volunteering. Newest first.
  activities: [
    {
      role: "Organizing Committee",
      org: "Palo Alto Networks × Telkom University Collaboration",
      period: "Oct 2025",
      points: [
        'Helped run the "Cybersafe Kids" seminar and the accompanying Capture The Flag competition.',
        "Coordinated across divisions and directly supervised CTF participants during the event.",
      ],
    },
    {
      role: "Staff, Media Communication & Information Division",
      org: "Perhimpunan Mahasiswa Bandung (PERMIB)",
      period: "Oct 2024 — Jun 2025",
      points: [
        "Managed the organization's social media presence.",
        "Produced digital content and documented organizational activities to grow brand visibility.",
      ],
    },
  ],

  languages: [
    { name: "Indonesian", level: "Native" },
    { name: "English", level: "Intermediate" },
    { name: "Japanese", level: "Basic" },
  ],

  interests: ["Data Science & Analysis", "Security Systems", "Threat Intelligence"],
} as const;

export type Profile = typeof profile;
