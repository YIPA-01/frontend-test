// Import project images
import erpImage from '../assets/images/projects/ERP/Screenshot 2025-05-04 at 14.57.21.png'
import dmcImage from '../assets/images/projects/DMC/Screenshot 2025-05-04 at 14.53.53.png'
import aopImage from '../assets/images/projects/AOP/Screenshot 2025-01-28 at 19.26.25.png'

// Mock data for development
export const mockProjects = [
  {
    id: 1,
    title: "ERP Management System",
    description: "A comprehensive Enterprise Resource Planning system built with modern web technologies for efficient business management",
    technologies: ["Vue.js", "Laravel", "MySQL", "Tailwind CSS","Filament"],
    featured: true,
    images: [
      {
        id: 1,
        url: erpImage,
        alt: "ERP Management System Dashboard"
      }
    ],
    github_url: "https://github.com/redayahyani/erp-system",
    live_url: "https://erp-demo.example.com",
    created_at: "2025-05-04"
  },
  {
    id: 2,
    title: "Dental Management System",
    description: "Dental Management System for a dental clinic to manage their patients, appointments, and other activities",
    technologies: ["Vue.js", "Laravel", "MySQL", "Tailwind CSS","Filament"],
    featured: true,
    images: [
      {
        id: 2,
        url: dmcImage,
        alt: "DMC Platform Interface"
      }
    ],
    github_url: "https://github.com/redayahyani/dmc-platform",
    live_url: "https://dmc-demo.example.com",
    created_at: "2025-05-04"
  },
  {
    id: 3,
    title: "Academic Orientation Platform",
    description: "Academic Orientation Platform for students to get information about the university and the courses they offer",
    technologies: ["Vue.js", "Laravel", "PostgreSQL", "Chart.js","Shadcn UI"],
    featured: false,
    images: [
      {
        id: 3,
        url: aopImage,
        alt: "AOP Analytics Dashboard"
      }
    ],
    github_url: "https://github.com/redayahyani/aop-dashboard",
    live_url: "https://aop-demo.example.com",
    created_at: "2025-01-28"
  }
];

export const mockSkills = [
  {
    id: 1,
    name: "Vue.js",
    level: "expert",
    category: "Frontend",
    years_experience: 4,
    description: "Advanced Vue.js development with Composition API"
  },
  {
    id: 2,
    name: "Laravel",
    level: "expert",
    category: "Backend",
    years_experience: 5,
    description: "Full-stack Laravel development and API design"
  },
  {
    id: 3,
    name: "JavaScript",
    level: "expert",
    category: "Programming",
    years_experience: 6,
    description: "Modern JavaScript ES6+ and TypeScript"
  },
  {
    id: 4,
    name: "PHP",
    level: "expert",
    category: "Backend",
    years_experience: 5,
    description: "Object-oriented PHP and modern frameworks"
  },
  {
    id: 5,
    name: "MySQL",
    level: "advanced",
    category: "Database",
    years_experience: 4,
    description: "Database design and optimization"
  },
  {
    id: 6,
    name: "Tailwind CSS",
    level: "advanced",
    category: "Frontend",
    years_experience: 3,
    description: "Utility-first CSS framework"
  }
];

export const mockEducation = [
  {
    id: 1,
    institution: "University of Technology SUPMTI",
    degree: "Bachelor of Computer Science",
    field_of_study: "Software Engineering",
    start_date: "2018-09-01",
    end_date: "2022-06-30",
    description: "Focused on software development, algorithms, and system design",
    gpa: "3.8/4.0"
  },
];

export const mockStats = {
  total_projects: 15,
  total_skills: 12,
  years_experience: 4,
  total_messages: 45
};

export const mockRecentMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    content: "Hi, I'm interested in discussing a project with you.",
    created_at: "2024-01-20T10:30:00Z",
    read: false
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    content: "Love your portfolio! Would like to collaborate.",
    created_at: "2024-01-19T15:45:00Z",
    read: true
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    content: "Question about your Vue.js experience.",
    created_at: "2024-01-18T09:15:00Z",
    read: true
  }
]; 