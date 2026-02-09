export type ProjectCategory = 'all' | 'design';

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  techStack: string[];
  summary: string;
  sampleImages?: string[];
  paperImages?: string[]; // รูปภาพที่แสดงในกระดาษของ Folder (สูงสุด 3 ใบ)
}

export const projects: Project[] = [
  {
    id: 'featured-1',
    category: 'all',
    title: 'Doctora',
    techStack: ['Next.js', 'Spring Boot', 'TypeScript', 'PostgresSQL'],
    summary: 'A full-stack health platform that streamlines clinic workflows and patient management.',
    paperImages: ['/next.png', '/fm.png', '/node']
  },
  {
    id: 'featured-2',
    category: 'all',
    title: 'Doctora Mobile',
    techStack: ['React Native', 'TypeScript', 'Expo', 'REST'],
    summary: 'Mobile companion app for on-the-go consultations and appointment tracking.',
    paperImages: ['/rc.png', '/fm.png', '/node']
  },
  {
    id: 'featured-3',
    category: 'all',
    title: 'Phamacy POS',
    techStack: ['React', 'Tailwind', 'Prisma'],
    summary: 'Point-of-sale interface for pharmacies with inventory and sales reporting.',
    paperImages: ['/rc.png', '/tw.png']
  },
  {
    id: 'featured-4',
    category: 'all',
    title: 'EatAtHome',
    techStack: ['Figma', 'Framer'],
    summary: 'Product design case study for a food delivery experience.',
    paperImages: ['/fm.png', '/canva.png']
  },
  {
    id: 'featured-5',
    category: 'all',
    title: 'FaceCheck',
    techStack: ['Figma', 'Illustrator'],
    summary: 'Identity verification concept focused on safe user onboarding.',
    paperImages: ['/fm.png']
  },
  {
    id: 'featured-6',
    category: 'all',
    title: 'Real Time Chat',
    techStack: ['Photoshop', 'After Effects'],
    summary: 'Motion-driven visual concept for a real-time chat brand.',
    paperImages: ['/canva.png', '/capcut.png']
  },
  {
    id: 'design-1',
    category: 'design',
    title: 'Doctora',
    techStack: ['Figma'],
    summary: 'Design system and UX flows for clinic scheduling.',
    paperImages: ['/fm.png','/canva.png','']
  },
  {
    id: 'design-2',
    category: 'design',
    title: 'Doctora Mobile',
    techStack: ['Figma'],
    summary: 'Mobile-first UX prototypes for patient interactions.',
    paperImages: ['/fm.png']
  },
  {
    id: 'design-3',
    category: 'design',
    title: 'Eat At Home',
    techStack: ['Figma', 'Canva'],
    summary: 'Product design for an at-home food delivery experience.',
    paperImages: ['/fm.png', '/canva.png','/rc.png']
  },
  {
    id: 'design-4',
    category: 'design',
    title: 'Elite Tutor',
    techStack: ['Figma'],
    summary: 'Education marketplace UX for booking tutors.',
    paperImages: ['/fm.png']
  },
  {
    id: 'design-5',
    category: 'design',
    title: 'Laundry Tracker',
    techStack: ['Figma'],
    summary: 'Service design for tracking laundry pickup and delivery.',
    paperImages: ['/fm.png']
  },
  {
    id: 'design-6',
    category: 'design',
    title: 'Real Time Chat',
    techStack: ['Figma'],
    summary: 'UI/UX concept for a chat platform.',
    paperImages: ['/fm.png']
  }
];
