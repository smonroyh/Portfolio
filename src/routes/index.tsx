import { Hero } from "@/components/Heros";
import { BentoProjects } from "@/components/BentoProjects";
import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState } from "react";
import {
  SiDotnet,
  SiAngular,
  SiNestjs,
  SiFlutter,
  SiMongodb,
  SiDocker,
  SiTypescript,
  SiReact,
  SiGithub,
} from "react-icons/si";
import type { IconType } from "react-icons";

export const Route = createFileRoute("/")({
  component: Index,
});

const stack: { name: string; Icon: IconType; color: string }[] = [
  { name: "React", Icon: SiReact, color: "#2496ED" },
  { name: ".NET Core", Icon: SiDotnet, color: "#512BD4" },
  { name: "Angular", Icon: SiAngular, color: "#DD0031" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "NestJS", Icon: SiNestjs, color: "#E0234E" },
  { name: "Flutter", Icon: SiFlutter, color: "#54C5F8" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
];

function TechItem({ name, Icon, color }: (typeof stack)[number]) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex flex-col items-center gap-2 cursor-default select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon
        size={26}
        style={{
          color: hovered ? color : "#52525b",
          transition: "color 0.25s ease",
        }}
      />
      <span
        className="text-[10px] font-medium tracking-wide transition-colors duration-250"
        style={{ color: hovered ? "#a1a1aa" : "#3f3f46" }}
      >
        {name}
      </span>
    </div>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-midnight-base text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-midnight-border/40 bg-midnight-base/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-zinc-100">
            DEV<span className="text-midnight-accent">.</span>PORTFOLIO
          </span>
          <div className="hidden sm:flex gap-8">
            <a
              href="#projects"
              className="text-sm text-zinc-400 hover:text-midnight-accent transition-colors"
            >
              Proyectos
            </a>
            <a
              href="/about"
              className="text-sm text-zinc-400 hover:text-midnight-accent transition-colors"
            >
              Sobre mí
            </a>

            <a
              href="#contact"
              className="text-sm text-zinc-400 hover:text-midnight-accent transition-colors"
            >
              Contacto
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <Hero></Hero>

      {/* Stack */}
      <section className="py-10 border-y border-midnight-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-zinc-600">
              Stack tecnológico
            </span>
            <div className="flex flex-wrap justify-center gap-8">
              {stack.map((tech) => (
                <TechItem key={tech.name} {...tech} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Projects */}
      <BentoProjects />

      {/* Contact */}
      <footer
        id="contact"
        className="py-24 border-t border-midnight-border/30 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-semibold text-zinc-100 max-w-[18ch] leading-tight">
                Construyamos algo juntos.
              </h2>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:hello@example.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-midnight-accent text-white text-sm font-medium hover:bg-midnight-accent/90 transition-colors"
                >
                  <Mail className="size-4" /> Email
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-midnight-border text-zinc-300 text-sm font-medium hover:bg-midnight-surface transition-colors"
                >
                  Linkedin
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-midnight-border text-zinc-300 text-sm font-medium hover:bg-midnight-surface transition-colors"
                >
                  <SiGithub className="size-4" /> GitHub
                  {/* <Github className="size-4" /> GitHub */}
                </a>
              </div>
            </div>
            <div className="md:text-right">
              <p className="text-xs text-zinc-600 uppercase tracking-widest mb-3">
                Disponible para nuevas oportunidades
              </p>
              <div className="text-sm text-zinc-500">
                © {new Date().getFullYear()} — Portafolio Fullstack
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
