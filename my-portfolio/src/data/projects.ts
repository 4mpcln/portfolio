export type ProjectCategory = 'all' | 'design';

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  techStack: string[];
  summary: string;
  sampleImages?: string[];
  paperImages?: string[]; // รูปภาพที่แสดงในกระดาษของ Folder (สูงสุด 3 ใบ)
  projectUrl?: string | string[]; // ลิงก์ไปยัง GitHub (all) หรือ Figma (design) - รองรับหลาย URLs
}

export const projects: Project[] = [
  {
    id: 'Doctora-featured',
    category: 'all',
    title: 'Doctora',
    techStack: ['Next.js', 'TypeScript','Tailwind CSS', 'Spring Boot', 'PostgresSQL','Docker'],
    summary: 'This project is a system-oriented full-stack web application for online doctor appointment booking. Patients can search for doctors by specialty, view real-time availability, and book appointments, while doctors manage schedules, approve bookings, and handle patient queues. Administrators oversee doctors, specialties, and system usage. The application is built with a 3-tier architecture using Next.js and TypeScript for the frontend, Spring Boot (Java) for the backend, and PostgreSQL as the database, with REST APIs secured by JWT authentication',
    paperImages: ['/featured-project/Doctora/2.png', '/featured-project/Doctora/3.png', '/featured-project/Doctora/1.png'],
    projectUrl: 'https://github.com/annop07/FrontendDoctora.git',
    sampleImages: [
      '/featured-project/Doctora/1.png',
      '/featured-project/Doctora/2.png',
      '/featured-project/Doctora/3.png',
      '/featured-project/Doctora/4.png',
      '/featured-project/Doctora/5.png',
      '/featured-project/Doctora/6.png',
      '/featured-project/Doctora/7.png',
      '/featured-project/Doctora/8.png',
      '/featured-project/Doctora/9.png',
      '/featured-project/Doctora/10.png',
      '/featured-project/Doctora/11.png',
      '/featured-project/Doctora/12.png',
    ]
  },
  {
    id: 'DoctoraMobile-featured',
    category: 'all',
    title: 'Doctora Mobile',
    techStack: ['React Native', 'TypeScript', 'Expo', 'REST'],
    summary: 'This project is a system-oriented mobile application for doctor appointment booking on smartphones. It allows patients to find and select doctors based on specialty and availability, view schedules in real time, manage appointments, and receive instant updates. The application is developed using React Native and Expo, with backend integration through the Doctora API for cross-platform support',
    paperImages: ['/featured-project/DoctoraMobile/2.png', '/featured-project/DoctoraMobile/1.png', '/featured-project/DoctoraMobile/3.png'],
    projectUrl: 'https://github.com/annop07/doctora-mobile.git',
    sampleImages: [
      '/featured-project/DoctoraMobile/1.png',
      '/featured-project/DoctoraMobile/2.png',
      '/featured-project/DoctoraMobile/3.png',
      '/featured-project/DoctoraMobile/4.png',
      '/featured-project/DoctoraMobile/5.png',
      '/featured-project/DoctoraMobile/6.png',
      '/featured-project/DoctoraMobile/7.png',
      '/featured-project/DoctoraMobile/8.png',
      '/featured-project/DoctoraMobile/9.png',
      '/featured-project/DoctoraMobile/10.png',
      '/featured-project/DoctoraMobile/11.png',
      '/featured-project/DoctoraMobile/12.png',
      '/featured-project/DoctoraMobile/13.png',
      '/featured-project/DoctoraMobile/14.png',
      '/featured-project/DoctoraMobile/15.png'
    ]
  },
  {
    id: 'PharmacyPOS-featured',
    category: 'all',
    title: 'Phamacy POS',
    techStack: ['PHP', 'Laravel Framework', 'MySQL', 'JavaScript', 'CSS', 'Bootstrap'],
    summary: 'This project is a web-based pharmacy management application developed using Laravel (PHP) and MySQL to simulate key operations in a pharmacy setting. It enables real-time management of inventory, sales, suppliers, and customer transactions through a user-friendly interface built with Blade templates, Bootstrap, and JavaScript. The system allows pharmacists and staff to efficiently track medicine stocks, process sales, and manage related data in a structured and organized environment.',
    paperImages: ['/featured-project/PharmarcyPOS/2.png', '/featured-project/PharmarcyPOS/1.png'],
    projectUrl: 'https://github.com/nicky-wrc/Pharmacy-Project.git',
    sampleImages: [
      '/featured-project/PharmarcyPOS/1.png',
      '/featured-project/PharmarcyPOS/2.png',
    ]
  },
  {
    id: 'EatAtHome-featured',
    category: 'all',
    title: 'Eat At Home',
    techStack: ['Flutter', 'Dart', 'Kotlin', 'Firebase'],
    summary: 'This project is a mobile application that simulates an online food ordering system. It is developed using Android Studio with Kotlin, allowing customers to search for restaurants and food items, place orders, and track order status. Restaurant owners can create and manage their restaurants, add food menus, and receive incoming orders. The application demonstrates a real-world food ordering workflow with role-based user functionality.',
    projectUrl: [
  'https://github.com/nicky-wrc/UserEatAtHome.git',
  'https://github.com/nicky-wrc/AdminEatAtHome.git'
],
  paperImages: ['','','','']
  },
  {
    id: 'FaceCheck-featured',
    category: 'all',
    title: 'FaceCheck',
    techStack: ['Python', 'OpenCV', 'SQLite'],
    summary: 'This project is a Python-based application that simulates a face recognition attendance system.It is developed using Python and OpenCV to enable real-time camera access and facial detection, allowing attendance to be recorded by recognizing individuals’ faces in a classroom environment.',
    paperImages: ['/featured-project/FaceCheck/2.jpg', '/featured-project/FaceCheck/1.jpg'],
    projectUrl: 'https://github.com/nicky-wrc/Face-Recognition-Attendance-project.git',
    sampleImages: [
      '/featured-project/FaceCheck/1.jpg',
      '/featured-project/FaceCheck/2.jpg',
    ]
  },
  {
    id: 'RealTimeChat-featured',
    category: 'all',
    title: 'Real Time Chat',
  techStack: ['HTML','CSS','JavaScript','Node.js', 'Express.js','Socket.IO'],
    summary: 'This project is a real-time chat application developed as part of a course assignment to simulate real-time text communication over HTTP. It is built using Node.js and Express.js for the backend, with Socket.IO enabling live message exchange between users. The system demonstrates real-time communication concepts by managing client connections and broadcasting messages efficiently. The frontend is implemented using EJS templates along with HTML, CSS, and JavaScript to provide a simple and interactive chat interface.',
        paperImages: ['/featured-project/RealTimeChat/1.jpg'],
    projectUrl: 'https://github.com/4mpcln/RealTimeChat.git',
    sampleImages: [
      '/featured-project/RealTimeChat/1.jpg'
    ]
  },
  {
    id: 'EatAtHome-Design',
    category: 'design',
    title: 'Eat At Home',
    techStack: ['Figma', 'Canva'],
    summary: 'In this project, I designed wireframes for a mobile application that simulates an online food ordering system for both customers and restaurant owners. Customers can browse and search for restaurants or menus and place food orders, while restaurant owners can register their restaurants, manage menus, receive orders, and update delivery statuses',
    paperImages: ['/Design/EatAtHome/77.jpg', '/Design/EatAtHome/9.jpg', '/Design/EatAtHome/1.jpg'],
    projectUrl: 'https://www.figma.com/design/SwBG8jvC401Z73mbVAxx18/EatAtHome?node-id=0-1&m=dev&t=haJLaFFp03D05Olk-1',
    sampleImages: [
      '/Design/EatAtHome/1.jpg',
      '/Design/EatAtHome/2.jpg',
      '/Design/EatAtHome/3.jpg',
      '/Design/EatAtHome/4.jpg',
      '/Design/EatAtHome/5.jpg',
      '/Design/EatAtHome/66.jpg',
      '/Design/EatAtHome/77.jpg',
      '/Design/EatAtHome/8.jpg',
      '/Design/EatAtHome/9.jpg',
      '/Design/EatAtHome/10.jpg',
      '/Design/EatAtHome/11.jpg',
      '/Design/EatAtHome/12.jpg',
      '/Design/EatAtHome/13.jpg',
      '/Design/EatAtHome/14.jpg',
      '/Design/EatAtHome/15.jpg',
      '/Design/EatAtHome/16.jpg',
      '/Design/EatAtHome/17.jpg',
      '/Design/EatAtHome/18.jpg',
      '/Design/EatAtHome/20.jpg',
      '/Design/EatAtHome/21.jpg',
      '/Design/EatAtHome/22.jpg',
      '/Design/EatAtHome/23.jpg',
      '/Design/EatAtHome/24.jpg',
      '/Design/EatAtHome/25.jpg',
      '/Design/EatAtHome/26.jpg',
    ]
  },
  {
    id: 'Doctora-Design',
    category: 'design',
    title: 'Doctora',
    techStack: ['Figma'],
    summary: 'In this project, I was responsible for designing wireframes for an online doctor appointment web application in order to establish a shared understanding with the development team and to facilitate further frontend development.',
    paperImages: ['/Design/Doctora/1.jpg', '/Design/Doctora/12.jpg', '/Design/Doctora/10.jpg'],
    projectUrl: 'https://www.figma.com/design/qTf5bGDSNlYPHPKEhrCd5x/Doctora--Web-Application-?node-id=3-37&m=dev&t=jEIVlYfSSS9PSXGb-1',
    sampleImages: [
      '/Design/Doctora/1.jpg',
      '/Design/Doctora/2.jpg',
      '/Design/Doctora/3.jpg',
      '/Design/Doctora/4.jpg',
      '/Design/Doctora/5.jpg',
      '/Design/Doctora/6.jpg',
      '/Design/Doctora/7.jpg',
      '/Design/Doctora/8.jpg',
      '/Design/Doctora/9.jpg',
      '/Design/Doctora/10.jpg',
      '/Design/Doctora/11.jpg',
      '/Design/Doctora/12.jpg',
    ]
  },
  {
    id: 'DoctoraMobile-Design',
    category: 'design',
    title: 'Doctora Mobile',
    techStack: ['Figma'],
    summary: 'In this project, I was responsible for designing wireframes for a mobile online doctor appointment application, which were intended to be used by the team for further development of the mobile application',
    paperImages: ['/Design/DoctoraMobile/10.jpg', '/Design/DoctoraMobile/11.jpg', '/Design/DoctoraMobile/8.jpg'],
    projectUrl: 'https://www.figma.com/design/BlrJrEzooCjfBLSv7XOFhd/Doctora--Mobile-?node-id=0-1&m=dev&t=Bc9CqN2cUKeLy56o-1',
    sampleImages: [
      '/Design/DoctoraMobile/1.jpg',
      '/Design/DoctoraMobile/2.jpg',
      '/Design/DoctoraMobile/3.jpg',
      '/Design/DoctoraMobile/4.jpg',
      '/Design/DoctoraMobile/5.jpg',
      '/Design/DoctoraMobile/6.jpg',
      '/Design/DoctoraMobile/7.jpg',
      '/Design/DoctoraMobile/8.jpg',
      '/Design/DoctoraMobile/9.jpg',
      '/Design/DoctoraMobile/10.jpg',
      '/Design/DoctoraMobile/11.jpg'
    ]
  },
  {
    id: 'EliteTutor',
    category: 'design',
    title: 'Elite Tutor',
    techStack: ['Figma'],
    summary: 'In this project, I designed mobile application wireframes for an online English learning application developed using Thunkable, as required by the course. The application supports two types of users: teachers, who can post instructional materials, and students, who can access and learn from the content provided by the teachers.',
    paperImages: ['/Design/EliteTutor/7.jpg', '/Design/EliteTutor/11.jpg', '/Design/EliteTutor/1.jpg'],
    projectUrl: 'https://www.figma.com/design/YBB9t4B1BeufhU6jBCSUXC/Elite-Tutor?node-id=0-1&m=dev&t=nju3veoOXHGz12rF-1',
    sampleImages: [
      '/Design/EliteTutor/1.jpg',
      '/Design/EliteTutor/2.jpg',
      '/Design/EliteTutor/3.jpg',
      '/Design/EliteTutor/4.jpg',
      '/Design/EliteTutor/5.jpg',
      '/Design/EliteTutor/6.jpg',
      '/Design/EliteTutor/7.jpg',
      '/Design/EliteTutor/8.jpg',
      '/Design/EliteTutor/9.jpg',
      '/Design/EliteTutor/10.jpg',
      '/Design/EliteTutor/11.jpg',
      '/Design/EliteTutor/12.jpg',
      '/Design/EliteTutor/13.jpg',
      '/Design/EliteTutor/14.jpg',
      '/Design/EliteTutor/15.jpg',
    ]
  },
  {
    id: 'LaundryTracker',
    category: 'design',
    title: 'Laundry Tracker',
    techStack: ['Figma'],
    summary: 'In this project, I designed wireframe screens for a laundry service tracking system that monitors the status of washing, drying, and folding processes. The system was intended to support two types of users: shop owners, who could update laundry statuses through the system, and customers, who could track the progress of their laundry, check weather suitability for doing laundry, and view shop availability. However, due to unforeseen circumstances, the project was discontinued and not further developed',
    paperImages: ['/Design/LaundryTracker/1.jpg', '/Design/LaundryTracker/6.jpg', '/Design/LaundryTracker/3.jpg'],
    projectUrl: 'https://www.figma.com/design/azSBMRLhdAVTauFyCcdcBX/Laundry-Tracker?node-id=0-1&m=dev&t=R8vS8DVg0BzY4KD2-1',
    sampleImages: [
      '/Design/LaundryTracker/1.jpg',
      '/Design/LaundryTracker/2.jpg',
      '/Design/LaundryTracker/3.jpg',
      '/Design/LaundryTracker/4.jpg',
      '/Design/LaundryTracker/5.jpg',
      '/Design/LaundryTracker/6.jpg',
      '/Design/LaundryTracker/7.jpg',
      '/Design/LaundryTracker/8.jpg',
      '/Design/LaundryTracker/9.jpg',
      '/Design/LaundryTracker/10.jpg',
      '/Design/LaundryTracker/11.jpg',
    ]
  },
  {
    id: 'RealTimeChat-Design',
    category: 'design',
    title: 'RealTimeChat',
    techStack: ['Figma'],
    summary: 'In this project, I designed wireframe screens for an experimental project focused on real-time message transmission over HTTP',
    paperImages: ['/Design/RealTimeChat/1.jpg'],
    projectUrl: 'https://www.figma.com/design/X5HJLxx5X85UHpEgcGEnWo/RealTimeChat?node-id=0-1&m=dev&t=xsFUg1wuoEILluai-1',
    sampleImages: [
      '/Design/RealTimeChat/1.jpg'
    ]
  }
];
