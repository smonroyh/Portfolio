// ============================================================
//  ARCHIVO DE CONFIGURACIÓN DE TU PORTAFOLIO
//  Edita este archivo con tu información personal
// ============================================================

export const personal = {
  name: "Tu Nombre",
  role: "Full Stack Developer",
  bio: "Breve descripción de quién eres, qué construyes y cuántos años de experiencia tienes.",
  avatar: "TN", // Iniciales para el avatar
  location: "Ciudad, País",
  availableForWork: true, // Cambia a false si no estás disponible
  links: {
    github: "https://github.com/tu-usuario",
    linkedin: "https://linkedin.com/in/tu-perfil",
    cv: "/cv.pdf", // Pon el link a tu CV
    email: "tu@email.com",
  },
};

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React / Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 88 },
      { name: "React Native", level: 70 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js / Express", level: 88 },
      { name: "Python / Django", level: 75 },
      { name: "GraphQL", level: 65 },
      { name: "REST APIs", level: 95 },
    ],
  },
  {
    category: "Bases de datos",
    items: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 70 },
      { name: "Prisma ORM", level: 82 },
    ],
  },
  {
    category: "DevOps / Cloud",
    items: [
      { name: "AWS (EC2/S3/Lambda)", level: 75 },
      { name: "Docker / Compose", level: 82 },
      { name: "CI/CD GitHub Actions", level: 78 },
      { name: "Linux / Bash", level: 74 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Nombre del Proyecto",
    description: "Descripción corta del proyecto. Qué hace, para quién, y qué impacto tuvo.",
    tags: ["React", "Node.js", "PostgreSQL"],
    status: "live", // "live" | "wip"
    github: "https://github.com/tu-usuario/proyecto",
    demo: "https://tu-proyecto.com",
    icon: "chart-bar", // Nombre de ícono de Tabler Icons
    color: "#1e1b4b",   // Color de fondo del ícono
    iconColor: "#a5b4fc",
  },
  {
    id: 2,
    title: "Otro Proyecto",
    description: "Descripción del segundo proyecto.",
    tags: ["Express", "TypeScript", "Docker"],
    status: "live",
    github: "https://github.com/tu-usuario/proyecto2",
    demo: "https://tu-proyecto2.com",
    icon: "shopping-cart",
    color: "#134e4a",
    iconColor: "#5eead4",
  },
  {
    id: 3,
    title: "Proyecto en Progreso",
    description: "Algo que estás construyendo actualmente.",
    tags: ["Next.js", "OpenAI", "Prisma"],
    status: "wip",
    github: "https://github.com/tu-usuario/proyecto3",
    demo: null,
    icon: "robot",
    color: "#3b0764",
    iconColor: "#d8b4fe",
  },
];

export const experience = [
  {
    id: 1,
    role: "Senior Full Stack Developer",
    company: "Nombre Empresa",
    location: "Ciudad",
    period: "2023 – presente",
    description: "Describe tu rol, responsabilidades y logros más importantes. Usa números cuando puedas (ej: reduje el tiempo de carga un 40%).",
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Otra Empresa",
    location: "Ciudad (remoto)",
    period: "2021 – 2023",
    description: "Descripción de este rol y tecnologías usadas.",
  },
  {
    id: 3,
    role: "Junior Developer",
    company: "Primera Empresa",
    location: "Ciudad",
    period: "2020 – 2021",
    description: "Cómo comenzaste y qué aprendiste.",
  },
];