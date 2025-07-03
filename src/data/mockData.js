// Import project images

import dmcImage from '../assets/images/projects/DMC/Screenshot 2025-05-04 at 14.53.53.png'
import dmcImage1 from '../assets/images/projects/DMC/Screenshot 2025-07-03 at 16.52.34.png'
import dmcImage2 from '../assets/images/projects/DMC/Screenshot 2025-07-03 at 16.52.38.png' 
import dmcImage3 from '../assets/images/projects/DMC/Screenshot 2025-07-03 at 16.52.51.png'
import dmcImage4 from '../assets/images/projects/DMC/Screenshot 2025-07-03 at 16.53.00.png'
import dmcImage5 from '../assets/images/projects/DMC/Screenshot 2025-07-03 at 16.53.42.png'

import aopImage from '../assets/images/projects/AOP/Screenshot 2025-01-28 at 19.26.25.png'
import aopImage1 from '../assets/images/projects/AOP/Screenshot 2025-07-03 at 16.35.28.png'
import aopImage2 from '../assets/images/projects/AOP/Screenshot 2025-07-03 at 16.36.05.png'
import aopImage3 from '../assets/images/projects/AOP/Screenshot 2025-07-03 at 16.37.14.png'
import aopImage4 from '../assets/images/projects/AOP/Screenshot 2025-07-03 at 16.38.04.png'
import cdmImage1 from '../assets/images/projects/CDM/Screenshot 2025-07-02 at 22.05.57.png'
import cdmImage2 from '../assets/images/projects/CDM/Screenshot 2025-07-02 at 22.06.11.png'
import cdmImage3 from '../assets/images/projects/CDM/Screenshot 2025-07-02 at 22.07.44.png'
import hlpImage from '../assets/images/HLP/Screenshot 2025-07-03 at 16.20.03.png'
import hlpImage2 from '../assets/images/HLP/Screenshot 2025-07-03 at 16.20.33.png'
import hlpImage3 from '../assets/images/HLP/Screenshot 2025-07-03 at 16.20.33.png'

// Mock data for development
export const mockProjects = [
  {
    id:5,
    title:"Dar Imim Hostel",
    description:"A comprehensive Landing Page for a hostel to manage their customers, orders, and other activities",
    technologies:["React.js","Shadcn UI","Tailwind CSS"],
    featured:true,
    images:[
      {
        id:7,
        url:hlpImage,
        alt:"Landing Page for Dar Imim Hostel",
      },
      {
        id:8,
        url:hlpImage2,
        alt:"Dar Imim Hostel Landing Page"
      },
      {
        id:9,
        url:hlpImage3,
        alt:"Dar Imim Hostel Landing Page"
      }
    ],
    github_url:"https://github.com/YIPA-01/dar-imim",
    live_url:"https://yipa-01.github.io/dar-imim/",
    created_at:"2025-07-03"
  },
  {
    id: 4,
    title: "La cuchina de mama",
    description: "A comprehensive Landing Page for a restaurant to manage their customers, orders, and other activities",
    technologies: ["React.js", "Shadcn UI", "Tailwind CSS"],
    featured: true,
    images: [
      {
        id: 4,
        url: cdmImage3,
        alt: "CDM Dashboard Overview"
      },
      {
        id: 5,
        url: cdmImage2,
        alt: "CDM Analytics Interface"
      },
      {
        id: 6,
        url: cdmImage1,
        alt: "CDM Data Management"
      }
    ],
    github_url: "https://github.com/YIPA-01/la-cuchina-de-mama",
    live_url: "https://yipa-01.github.io/la-cuchina-de-mama",
    created_at: "2023-07-12"
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
      },
      {
        id: 3,
        url: dmcImage1,
        alt: "DMC Platform Interface"
      },
      {
        id: 4,
        url: dmcImage2,
        alt: "DMC Platform Interface"
      },
      {
        id: 5,
        url: dmcImage3,
        alt: "DMC Platform Interface"
      },
      {
        id: 6,
        url: dmcImage4,
        alt: "DMC Platform Interface"
      },
      {
        id: 7,
        url: dmcImage5,
      } 
    ],
    github_url: "https://github.com/YIPA-01/pharmacy-management-system",
    live_url: null,
    created_at: "2024-05-04"
  },
  {
    id: 3,
    title: "Gen.Z",
    description: "Academic Orientation Platform for students to get information about the university and the courses they offer",
    technologies: ["Vue.js", "Laravel", "PostgreSQL", "Chart.js","Shadcn UI"],
    featured: true,
    images: [
      {
        id: 3,
        url: aopImage,
        alt: "AOP Analytics Dashboard"
      },
      {
        id: 4,
        url: aopImage1,
        alt: "AOP Analytics Dashboard"
      },
      {
        id: 5,
        url: aopImage2,
        alt: "AOP Analytics Dashboard"
      },
      {
        id: 6,
        url: aopImage3,
        alt: "AOP Analytics Dashboard"
      },
      {
        id: 7,
        url: aopImage4,
        alt: "AOP Analytics Dashboard"
      }
    ],
    github_url: "https://github.com/YIPA-01/GenZ-Platform",
    live_url: null,
    created_at: "2024-06-28"
  },


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