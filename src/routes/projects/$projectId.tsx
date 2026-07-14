import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ImageOff, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useEffect, useState } from "react";
import { getProjectById } from "@/data/projects";

export const Route = createFileRoute("/projects/$projectId")({
  component: RouteComponent,
});

// ─── Variants ────────────────────────────────────────────────────────────────

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Chip ──────────────────────────────────────────────────────────────────

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-md px-2.5 py-1 text-xs font-medium tracking-wide text-indigo-300/80"
      style={{
        background: "rgba(99,102,241,0.12)",
        border: "1px solid rgba(99,102,241,0.2)",
      }}
    >
      {children}
    </span>
  );
}

// ─── Panel (glass container) ─────────────────────────────────────────────────

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 md:p-7 ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(145deg, rgba(28,28,72,0.85) 0%, rgba(10,10,32,0.9) 100%)",
        border: "1px solid rgba(79,70,229,0.22)",
        boxShadow:
          "0 4px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.35), transparent)",
        }}
      />
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-midnight-accent">
      {children}
    </h2>
  );
}

// ─── 404 ─────────────────────────────────────────────────────────────────────

function NotFound() {
  return (
    <main className="min-h-screen bg-midnight-base text-foreground">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="font-display text-7xl font-bold text-indigo-500/30">
          404
        </span>
        <h1 className="text-2xl font-semibold text-zinc-100">
          Proyecto no encontrado
        </h1>
        <p className="max-w-[42ch] text-pretty text-sm text-zinc-500">
          El proyecto que buscas no existe o cambió de dirección.
        </p>
        <Link
          to="/"
          hash="projects"
          className="inline-flex items-center gap-2 rounded-md bg-midnight-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-midnight-accent/90"
        >
          <ArrowLeft className="size-4" />
          Volver a proyectos
        </Link>
      </div>
    </main>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

function Gallery({ images, title }: { images: string[]; title: string }) {
  const [zoomed, setZoomed] = useState<string | null>(null);
  const [enlarged, setEnlarged] = useState(false);

  useEffect(() => {
    if (!zoomed) setEnlarged(false);
  }, [zoomed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = zoomed ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoomed]);

  if (images.length === 0) {
    return (
      <div
        className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl text-zinc-600"
        style={{
          background:
            "linear-gradient(145deg, rgba(28,28,72,0.6) 0%, rgba(10,10,32,0.8) 100%)",
          border: "1px dashed rgba(79,70,229,0.3)",
        }}
      >
        <ImageOff className="size-7 opacity-50" />
        <p className="text-xs uppercase tracking-widest">
          Capturas próximamente
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={`grid gap-4 ${images.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"}`}
      >
        {images.map((src, i) => (
          <motion.button
            type="button"
            key={src}
            variants={fade}
            onClick={() => setZoomed(src)}
            aria-label={`Ampliar ${title} — captura ${i + 1}`}
            className="group relative cursor-zoom-in overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(79,70,229,0.22)" }}
          >
            <img
              src={src}
              alt={`${title} — captura ${i + 1}`}
              loading="lazy"
              className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{
                background:
                  "linear-gradient(145deg, rgba(28,28,72,0.6), rgba(10,10,32,0.8))",
              }}
            />
            <span className="pointer-events-none absolute inset-0 bg-midnight-base/0 transition-colors duration-300 group-hover:bg-midnight-base/10" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setZoomed(null)}
            className={`fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm ${
              enlarged
                ? "overflow-auto p-4 md:p-8"
                : "flex items-center justify-center p-3 md:p-6"
            }`}
          >
            {/* Cerrar */}
            <button
              type="button"
              onClick={() => setZoomed(null)}
              aria-label="Cerrar"
              className="fixed right-5 top-5 z-[110] grid size-10 place-items-center rounded-full bg-midnight-base/60 text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.18)" }}
            >
              <X className="size-5" />
            </button>

            {/* Hint */}
            <span className="pointer-events-none fixed bottom-5 left-1/2 z-[110] -translate-x-1/2 rounded-full bg-midnight-base/60 px-3 py-1 text-[11px] text-zinc-300 backdrop-blur-md">
              {enlarged ? "Clic para reducir · Esc para cerrar" : "Clic en la imagen para ampliar"}
            </span>

            <motion.img
              src={zoomed}
              alt={title}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => {
                e.stopPropagation();
                setEnlarged((v) => !v);
              }}
              className={`mx-auto rounded-2xl ${
                enlarged
                  ? "max-w-none cursor-zoom-out"
                  : "max-h-[94vh] max-w-[96vw] cursor-zoom-in object-contain"
              }`}
              style={{
                border: "1px solid rgba(79,70,229,0.3)",
                ...(enlarged ? { width: "min(2400px, 220vw)" } : {}),
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

function RouteComponent() {
  const { projectId } = useParams({ from: "/projects/$projectId" });
  const project = getProjectById(projectId);

  if (!project) return <NotFound />;

  return (
    <main className="min-h-screen bg-midnight-base text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-midnight-border/40 bg-midnight-base/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link
            to="/"
            hash="projects"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-midnight-accent"
          >
            <ArrowLeft className="size-4" />
            Volver a proyectos
          </Link>
          <span className="text-sm font-semibold tracking-tight text-zinc-100">
            DEV<span className="text-midnight-accent">.</span>PORTFOLIO
          </span>
        </div>
      </nav>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-5xl px-6 pb-24 pt-28"
      >
        {/* Header */}
        <motion.header variants={fade} className="mb-10 flex flex-col gap-4">
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-indigo-400/60">
            {project.index} — Proyecto
          </span>
          <h1 className="text-3xl font-semibold leading-tight text-zinc-100 md:text-5xl">
            {project.title}
          </h1>
          <p className="max-w-[60ch] text-pretty text-base leading-relaxed text-zinc-400 md:text-lg">
            {project.longDescription}
          </p>

          {/* CTAs */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-2 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-midnight-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-midnight-accent/90"
                >
                  Ver en vivo
                  <ArrowUpRight className="size-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-midnight-border px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-midnight-surface"
                >
                  <SiGithub className="size-4" />
                  Ver código
                </a>
              )}
            </div>
          )}
        </motion.header>

        {/* Gallery */}
        <motion.section variants={fade} className="mb-10">
          <Gallery images={project.images} title={project.title} />
        </motion.section>

        {/* Problema / Solución */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <motion.div variants={fade}>
            <Panel className="h-full">
              <SectionTitle>El problema</SectionTitle>
              <p className="text-pretty text-sm leading-relaxed text-zinc-300/90">
                {project.problem}
              </p>
            </Panel>
          </motion.div>
          <motion.div variants={fade}>
            <Panel className="h-full">
              <SectionTitle>La solución</SectionTitle>
              <p className="text-pretty text-sm leading-relaxed text-zinc-300/90">
                {project.solution}
              </p>
            </Panel>
          </motion.div>
        </div>

        {/* Stack técnico */}
        <motion.div variants={fade} className="mb-6">
          <Panel>
            <SectionTitle>Stack técnico</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
          </Panel>
        </motion.div>

        {/* Funcionalidades */}
        <motion.div variants={fade} className="mb-6">
          <Panel>
            <SectionTitle>Funcionalidades destacadas</SectionTitle>
            <ul className="flex flex-col gap-2.5">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-zinc-300/90"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-indigo-400" />
                  <span className="text-pretty">{feature}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </motion.div>

        {/* Arquitectura */}
        {project.architecture && (
          <motion.div variants={fade} className="mb-6">
            <Panel>
              <SectionTitle>Arquitectura</SectionTitle>
              <p className="text-pretty text-sm leading-relaxed text-zinc-300/90">
                {project.architecture}
              </p>
            </Panel>
          </motion.div>
        )}

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <motion.div variants={fade}>
            <Panel>
              <SectionTitle>Logros y aprendizajes</SectionTitle>
              <ul className="flex flex-col gap-2.5">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-sm text-zinc-300/90"
                  >
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-indigo-400" />
                    <span className="text-pretty">{h}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </motion.div>
        )}

        {/* Footer back link */}
        <motion.div variants={fade} className="mt-12">
          <Link
            to="/"
            hash="projects"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-midnight-accent"
          >
            <ArrowLeft className="size-4" />
            Volver a todos los proyectos
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
