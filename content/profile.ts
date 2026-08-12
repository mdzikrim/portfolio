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
  // Keep this timeless — no job titles, enrollment status, or dates. Those
  // belong in `experience` and `education` below, where they carry a date range
  // and can be updated in one place.
  tagline:
    "I build systems that learn from data — behavioral biometrics that recognize how someone types, computer-vision models that run on a phone, public datasets turned into maps you can actually search. What I enjoy is the unglamorous middle: cleaning the data, evaluating it honestly, and making the result survive contact with a real user.",

  // Longer bio for the About section. Each string is a paragraph.
  bio: [
    "My background is Computer Engineering, and my work sits between machine learning, data analysis, and security. Most of it has involved taking a model out of a notebook and making it part of something a person can actually operate.",
    "That transition is where projects usually stall, and it is the part I have gotten better at: reconciling data that disagrees with itself, checking whether a good score is real before reporting it, and building the interface that decides whether any of the work gets used. I try to be direct about limits too. If an accuracy number looks too clean, I would rather explain why in the README than let it stand.",
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
      period: "Sep 2025 — Aug 2026",
      location: "Bandung, Indonesia",
      points: [
        "Taught core practical modules: ethical hacking, firewall implementation, and secure coding.",
        "Maintained lab infrastructure for penetration testing, network monitoring, and vulnerability assessment sessions.",
        "Built and maintained virtual environments that simulate varied cybersecurity scenarios.",
        "Co-developed training material on cryptography, digital forensics, and web application security with instructors.",
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
