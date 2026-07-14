// ============================================================
//  DATOS DE PROYECTOS PARA LAS PÁGINAS DE DETALLE
//  Los `id` son slugs que se usan en la URL (/projects/{id})
//  y deben coincidir con los Links de src/components/BentoProjects.tsx
//  Rellena los campos marcados con TODO con tu información real.
// ============================================================

export interface Project {
  id: string; // slug para la URL, ej. 'sistema-de-reservas'
  index: string; // numeración mostrada en la tarjeta, ej. '01'
  title: string;
  shortDescription: string; // para la tarjeta en la home
  longDescription: string; // para la página de detalle
  problem: string; // qué problema resuelve
  solution: string; // cómo lo resuelve
  techStack: string[];
  features: string[]; // funcionalidades destacadas
  architecture?: string; // decisiones de arquitectura (opcional)
  images: string[]; // rutas a capturas / GIFs (en /public)
  liveUrl?: string; // link al deploy
  githubUrl?: string; // link al repo
  highlights?: string[]; // logros o aprendizajes clave
}

export const projects: Project[] = [
  {
    id: "sistema-de-reservas",
    index: "01",
    title: "Sistema de Reservas",
    shortDescription:
      "Plataforma web para la gestión de reservas, sedes y alojamientos, con panel administrativo y cálculo de tarifas.",
    longDescription:
      "Plataforma web para administrar reservas de alojamientos en múltiples sedes. Incluye un panel administrativo para gestionar disponibilidad, tarifas dinámicas y ocupación, además de un flujo de reserva para el usuario final.",
    problem:
      "La gestión de reservas, sedes y tarifas se hacía de forma manual, lo que generaba errores de disponibilidad y dificultaba el control de la ocupación.",
    solution:
      "Una plataforma centralizada que automatiza el cálculo de tarifas, controla la disponibilidad en tiempo real y ofrece un panel administrativo para gestionar sedes y alojamientos.",
    techStack: [".NET Core", "SQL Server", "Entity Framework Core"],
    features: [
      "Gestión de reservas, sedes y alojamientos desde un panel administrativo",
      "Cálculo automático de tarifas según fechas y tipo de alojamiento",
      "Control de disponibilidad y ocupación semanal",
      "Validaciones de negocio para evitar reservas solapadas",
    ],
    architecture:
      "Backend en .NET Core con Entity Framework Core sobre SQL Server, siguiendo una separación por capas (dominio, servicios y acceso a datos). TODO: amplía con tus decisiones de arquitectura reales.",
    images: [
      // TODO: coloca tus capturas en /public/projects/sistema-de-reservas/
      // "/projects/sistema-de-reservas/demo.png",
      "/reservas/captura1.png",
      "/reservas/captura2.png",
    ],
    liveUrl: "https://fondoxyzweb-cye9g0b6btesf4de.mexicocentral-01.azurewebsites.net/", // TODO: link al deploy si existe
    githubUrl: undefined, // TODO: link al repo si existe
    highlights: [
      "Modelado de tarifas dinámicas y reglas de disponibilidad",
      "Diseño de un esquema relacional para sedes y alojamientos",
    ],
  },
  {
    id: "panel-de-productos",
    index: "02",
    title: "Panel de Productos",
    shortDescription: "Inventario y catálogo de productos.",
    longDescription:
      "Panel para administrar el inventario y el catálogo de productos: alta, edición, control de stock y estados de cada producto, con un frontend en Angular y una API en NestJS contenedorizada con Docker.",
    problem:
      "El catálogo y el inventario de productos no tenían una herramienta unificada, dificultando el control de stock y la actualización del catálogo.",
    solution:
      "Una aplicación full-stack con API REST en NestJS y un panel en Angular que centraliza la gestión de productos, su stock y sus estados, lista para desplegarse con Docker.",
    techStack: ["NestJS", "PostgreSQL", "Angular", "Docker"],
    features: [
      "CRUD completo de productos con control de stock",
      "Indicadores de productos activos / inactivos",
      "API REST con NestJS y persistencia en PostgreSQL",
      "Entorno contenedorizado con Docker para despliegue reproducible",
    ],
    architecture:
      "Frontend en Angular consumiendo una API REST en NestJS, con PostgreSQL como base de datos. Todo el stack se orquesta con Docker. TODO: amplía con tus decisiones de arquitectura reales.",
    images: [
      "/dashboard/Captura1.png",
      "/dashboard/Captura2.png",
      "/dashboard/Captura3.png",
      "/dashboard/Captura4.png",
    ],
    liveUrl: "https://teslo-shop-frontend-inky.vercel.app/",
    githubUrl: undefined, // TODO
    highlights: [
      "Diseño de una API REST modular con NestJS",
      "Contenerización del stack completo con Docker",
    ],
  },
  {
    id: "app-movil",
    index: "03",
    title: "App Móvil",
    shortDescription:
      "Aplicación cross-platform con sincronización offline y push notifications.",
    longDescription:
      "Aplicación móvil cross-platform construida con Flutter, con soporte para uso offline mediante sincronización local y notificaciones push para mantener al usuario informado.",
    problem:
      "Los usuarios necesitaban acceder a la información incluso sin conexión y recibir avisos relevantes en tiempo real.",
    solution:
      "Una app en Flutter con almacenamiento local y sincronización cuando hay conexión, además de notificaciones push, gestionando el estado con el patrón BLoC.",
    techStack: ["Flutter", "Dart", "BLoC (Business Logic Component)"],
    features: [
      "Funcionamiento offline con sincronización al recuperar conexión",
      "Notificaciones push",
      "Arquitectura cross-platform (Android e iOS) desde una sola base de código",
      "Gestión de estado con el patrón BLoC",
    ],
    architecture:
      "App en Flutter/Dart con gestión de estado mediante BLoC, una capa de almacenamiento local para el modo offline y un mecanismo de sincronización con el backend. TODO: amplía con tus decisiones de arquitectura reales.",
    images: [
      // TODO: coloca tus capturas en /public/projects/app-movil/
    ],
    liveUrl: undefined, // TODO
    githubUrl: undefined, // TODO
    highlights: [
      "Estrategia de sincronización offline-first",
      "Integración de notificaciones push cross-platform",
    ],
  },
  {
    id: "deliveryjs-microservicios",
    index: "04",
    title: "DeliveryJS — Plataforma de Microservicios",
    shortDescription:
      "Backend de delivery de comida con arquitectura de microservicios: API Gateway, mensajería por eventos con RabbitMQ y patrón Saga.",
    longDescription:
      "Plataforma backend de delivery de comida diseñada como un sistema distribuido de microservicios. Un API Gateway centraliza autenticación, rate limiting y enrutamiento, mientras cuatro servicios independientes (Catálogo, Pedidos, Pagos y Notificaciones) colaboran combinando llamadas HTTP síncronas con comunicación asíncrona por eventos sobre RabbitMQ. El flujo de confirmación de un pedido se resuelve con un patrón Saga coreografiado, incluyendo compensación automática cuando el pago es rechazado.",
    problem:
      "Un sistema de delivery acopla procesos muy distintos —catálogo, pedidos, pagos y notificaciones— que escalan y fallan de forma independiente. Resolverlo como un monolito con llamadas síncronas crea un punto único de fallo: si el servicio de pagos o notificaciones cae, todo el pedido se bloquea.",
    solution:
      "Separé cada dominio en su propio microservicio NestJS con base de datos independiente (database-per-service). El API Gateway protege las rutas con JWT y aplica rate limiting; Pedidos verifica stock vía HTTP y publica un evento, y Pagos/Notificaciones reaccionan de forma asíncrona. La consistencia entre servicios se garantiza con una Saga coreografiada y eventos de compensación, evitando acoplamiento directo.",
    techStack: [
      "NestJS",
      "TypeScript",
      "RabbitMQ",
      "Prisma ORM",
      "SQLite",
      "Docker Compose",
      "JWT",
    ],
    features: [
      "API Gateway con autenticación JWT, rate limiting y proxy a los servicios internos",
      "Comunicación asíncrona por eventos sobre un exchange topic de RabbitMQ",
      "Patrón Saga coreografiado con compensación automática al fallar el pago",
      "Trazabilidad distribuida mediante propagación de un Correlation-ID entre servicios",
      "Database-per-service con Prisma ORM y migraciones por servicio",
      "Resiliencia: timeouts, reintentos con backoff y colas durables con ACK/NACK",
      "Orquestación completa con Docker Compose (5 contenedores + broker)",
    ],
    architecture:
      "Arquitectura de microservicios con un API Gateway (NestJS) como único punto de entrada que valida JWT, limita peticiones y reenvía el tráfico. Catálogo y Pedidos exponen APIs REST; Pedidos verifica stock contra Catálogo por HTTP y luego orquesta una Saga coreografiada publicando eventos en RabbitMQ (exchange tipo topic 'delivery-events'). Pagos consume 'pedido.creado' y emite 'pago.aprobado' o 'pago.denegado'; Pedidos reacciona confirmando el pedido o ejecutando la compensación ('pedido.cancelado'), y Notificaciones consume los eventos de estado. Cada servicio mantiene su propia base de datos (database-per-service) con Prisma, y todo el stack se levanta con Docker Compose.",
    images: ["/deliveryjs/architecture.svg", "/deliveryjs/event-flow.svg"],
    liveUrl: undefined,
    githubUrl: "https://github.com/santimh22/deliveryjs",
    highlights: [
      "Diseño de un sistema distribuido orientado a eventos (event-driven) desde cero",
      "Implementación del patrón Saga con transacciones de compensación para mantener consistencia sin transacciones distribuidas",
      "Patrones de resiliencia (timeouts, reintentos, fail-fast) y observabilidad con logs estructurados y Correlation-ID",
      "Aplicación de principios de Domain-Driven Design con un servicio por dominio de negocio",
    ],
  },
];

export const getProjectById = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);
