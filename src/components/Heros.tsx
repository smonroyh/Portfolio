import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.25 } },
};

const line: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function Prompt({ cmd }: { cmd: string }) {
  return (
    <motion.div variants={line} className="flex items-center gap-2 font-mono">
      <span className="text-midnight-accent select-none">❯</span>
      <span className="text-zinc-600 text-sm">{cmd}</span>
    </motion.div>
  );
}

export const Hero = () => {
  return (
    <section className="pt-40 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5"
        >
          {/* Block 1 — whoami */}
          <Prompt cmd="whoami" />
          <motion.div variants={line} className="flex flex-col gap-1 pl-5">
            <span className="text-sm font-mono text-zinc-500">Santiago Monroy</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-100 leading-none tracking-tight">
              Fullstack
              <br />
              Engineer
            </h1>
          </motion.div>

          {/* Block 2 — describe */}
          <Prompt cmd="describe --brief" />
          <motion.p
            variants={line}
            className="pl-5 text-zinc-400 text-base md:text-lg max-w-[48ch] text-pretty leading-relaxed"
          >
            Especializado en .NET Core, Angular, NestJS y Flutter. Construyo
            sistemas escalables que conectan lógica compleja con experiencias
            de usuario intuitivas.
          </motion.p>

          {/* Block 3 — status */}
          <Prompt cmd="status" />
          <motion.div
            variants={line}
            className="pl-5 flex items-center gap-2.5 font-mono"
          >
            <span className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
            <span className="text-sm text-emerald-400">
              Disponible para nuevas oportunidades
            </span>
            <span
              className="inline-block w-[2px] h-[14px] bg-zinc-500 align-middle"
              style={{ animation: "blink 1s step-end infinite" }}
            />
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={line}
            className="pl-5 pt-2 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="bg-midnight-accent text-white py-2.5 px-5 rounded-md text-sm font-medium flex items-center gap-2 ring-1 ring-midnight-accent hover:bg-midnight-accent/90 transition-colors"
            >
              Ver proyectos
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#contact"
              className="border border-midnight-border text-zinc-300 py-2.5 px-5 rounded-md text-sm font-medium hover:bg-midnight-surface transition-colors"
            >
              Contactar
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
