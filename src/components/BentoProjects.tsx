import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

// ─── Variants ────────────────────────────────────────────────────────────────

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Glass card ───────────────────────────────────────────────────────────────

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  accent?: boolean;
};

function GlassCard({ children, className, id, accent }: GlassCardProps) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [lit, setLit] = useState(false);

  return (
    <motion.article
      ref={ref as React.Ref<HTMLElement>}
      id={id}
      variants={fade}
      whileHover={{ y: -4, scale: 1.008 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
      className={cn("relative overflow-hidden rounded-2xl", className)}
      style={{
        background: accent
          ? "linear-gradient(135deg, #3730a3 0%, #4f46e5 50%, #6366f1 100%)"
          : "linear-gradient(145deg, rgba(28,28,72,0.85) 0%, rgba(10,10,32,0.9) 100%)",
        border: "1px solid",
        borderColor: accent ? "rgba(255,255,255,0.15)" : "rgba(79,70,229,0.22)",
        boxShadow: accent
          ? "0 4px 32px rgba(79,70,229,0.35), inset 0 1px 0 rgba(255,255,255,0.12)"
          : "0 4px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Cursor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-400"
        style={{
          opacity: lit ? 1 : 0,
          background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.18) 0%, transparent 70%)`,
        }}
      />
      {/* Top shimmer line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: accent
            ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)"
            : "linear-gradient(90deg, transparent, rgba(99,102,241,0.35), transparent)",
        }}
      />
      {children}
    </motion.article>
  );
}

// ─── Booking visual ───────────────────────────────────────────────────────────

const occupancy = [
  { day: "LUN", pct: 75, from: 0 },
  { day: "MAR", pct: 45, from: 22 },
  { day: "MIÉ", pct: 88, from: 4 },
  { day: "JUE", pct: 62, from: 10 },
  { day: "VIE", pct: 80, from: 0 },
];

function BookingVisual({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      {occupancy.map(({ day, pct, from }, i) => (
        <div key={day} className="flex items-center gap-3">
          <span className="w-6 shrink-0 font-mono text-[10px] text-indigo-400/50">
            {day}
          </span>
          <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={active ? { width: `${pct}%` } : { width: 0 }}
              transition={{
                duration: 1,
                delay: 0.3 + i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute top-0 h-full rounded-full"
              style={{
                left: `${from}%`,
                background:
                  "linear-gradient(90deg, rgba(99,102,241,0.5), rgba(139,92,246,0.7))",
              }}
            />
          </div>
          <span className="w-7 shrink-0 text-right font-mono text-[10px] text-indigo-400/40">
            {pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Admin visual ─────────────────────────────────────────────────────────────

const products = [
  { label: "Relaxed T Logo Hat", qty: 8, on: true },
  { label: "Women's Turbine Cropped Long Sleeve Tee", qty: 3, on: true },
  { label: "Kids Cyberquad Bomber Jacket", qty: 0, on: false },
  { label: "Men's Turbine Short Sleeve Tee", qty: 12, on: true },
];

function AdminVisual({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      {products.map((p, i) => (
        <motion.div
          key={p.label}
          initial={{ opacity: 0, x: -10 }}
          animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{
            delay: 0.2 + i * 0.09,
            duration: 0.35,
            ease: "easeOut",
          }}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className={cn(
              "size-1.5 shrink-0 rounded-full",
              p.on ? "bg-indigo-400" : "bg-zinc-700",
            )}
          />
          <span className="flex-1 truncate text-[11px] text-zinc-300/70">
            {p.label}
          </span>
          <span className="font-mono text-[10px] text-zinc-600">{p.qty}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Event flow visual (microservicios) ───────────────────────────────────────

const events = [
  { key: "pedido.creado", svc: "pedidos" },
  { key: "pago.aprobado", svc: "pagos" },
  { key: "pedido.confirmado", svc: "pedidos" },
  { key: "notificación enviada", svc: "notif" },
];

function EventFlowVisual({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      {events.map((e, i) => (
        <motion.div
          key={e.key}
          initial={{ opacity: 0, x: -10 }}
          animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{
            delay: 0.2 + i * 0.12,
            duration: 0.35,
            ease: "easeOut",
          }}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <motion.div
            className="size-1.5 shrink-0 rounded-full bg-indigo-400"
            animate={active ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.4 }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
          <span className="flex-1 truncate font-mono text-[11px] text-indigo-200/70">
            {e.key}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide text-zinc-600">
            {e.svc}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Count-up ─────────────────────────────────────────────────────────────────

function useCountUp(end: number, active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const t0 = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(p < 1 ? Math.floor(eased * end) : end);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end]);
  return n;
}

// ─── Tag ─────────────────────────────────────────────────────────────────────

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-md px-2 py-0.5 text-[10px] font-medium tracking-wide text-indigo-300/70"
      style={{
        background: "rgba(99,102,241,0.12)",
        border: "1px solid rgba(99,102,241,0.2)",
      }}
    >
      {children}
    </span>
  );
}

// ─── BentoProjects ────────────────────────────────────────────────────────────

export function BentoProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const uptime = useCountUp(99, inView);
  const projectCount = useCountUp(20, inView);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col gap-3"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-midnight-accent">
            Proyectos seleccionados
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-100 max-w-[24ch]">
            Soluciones construidas con foco en producto.
          </h2>
        </motion.div>

        {/* Grid 2 cols */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* ① Sistema de Reservas */}
          <GlassCard>
            <Link
              to="/projects/$projectId"
              params={{ projectId: "sistema-de-reservas" }}
            >
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-indigo-400/60">
                      01
                    </p>
                    <h3 className="text-lg font-semibold text-zinc-100">
                      Sistema de Reservas
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500 text-pretty">
                      Desarrollo de una plataforma web para la gestión de
                      reservas, sedes y alojamientos, con panel administrativo y
                      cálculo de tarifas.
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <Tag>.NET core</Tag>
                  <Tag>SQL Server</Tag>
                  <Tag>Entity Framework Core</Tag>
                </div>
                <div className="pt-1">
                  <p className="mb-2.5 text-[9px] font-medium uppercase tracking-widest text-zinc-600">
                    Ocupación semanal
                  </p>
                  <BookingVisual active={inView} />
                </div>
              </div>
            </Link>
          </GlassCard>

          {/* ② Panel de Productos */}
          <GlassCard>
            <Link
              to="/projects/$projectId"
              params={{ projectId: "panel-de-productos" }}
            >
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-indigo-400/60">
                    02
                  </p>
                  <h3 className="text-lg font-semibold text-zinc-100">
                    Panel de Productos
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 text-pretty">
                    Inventario y catálogo de productos.
                  </p>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <Tag>NestJS</Tag>
                  <Tag>PostgreSQL</Tag>
                  <Tag>Angular</Tag>
                  <Tag>Docker</Tag>
                </div>
                <div className="pt-1">
                  <p className="mb-2.5 text-[9px] font-medium uppercase tracking-widest text-zinc-600">
                    Productos activos
                  </p>
                  <AdminVisual active={inView} />
                </div>
              </div>
            </Link>
          </GlassCard>

          {/* ③ App Flutter */}
          <GlassCard accent>
            <Link
              to="/projects/$projectId"
              params={{ projectId: "app-movil" }}
            >
              <div className="p-6 flex flex-col h-full min-h-55">
                <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  03
                </p>
                <h3 className="text-lg font-semibold text-white">App Móvil</h3>
                <p className="mt-2 text-sm text-indigo-200/70 text-pretty max-w-[32ch]">
                  Aplicación cross-platform con sincronización offline y push
                  notifications.
                </p>
                <div className="mt-auto pt-6 flex items-end justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/60"
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      Flutter
                    </span>
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/60"
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      Dart
                    </span>
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/60"
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      BLoC (Business Logic Component)
                    </span>
                  </div>
                  <div
                    className="grid size-9 place-items-center rounded-full text-white/80"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.18)",
                    }}
                  >
                    <ArrowUpRight className="size-4" />
                  </div>
                </div>
              </div>
            </Link>
          </GlassCard>

          {/* ④ DeliveryJS — Microservicios */}
          <GlassCard>
            <Link
              to="/projects/$projectId"
              params={{ projectId: "deliveryjs-microservicios" }}
            >
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-indigo-400/60">
                    04
                  </p>
                  <h3 className="text-lg font-semibold text-zinc-100">
                    DeliveryJS — Microservicios
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 text-pretty">
                    Sistema distribuido de delivery con API Gateway, mensajería
                    por eventos y patrón Saga.
                  </p>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <Tag>NestJS</Tag>
                  <Tag>RabbitMQ</Tag>
                  <Tag>Docker</Tag>
                  <Tag>Prisma</Tag>
                </div>
                <div className="pt-1">
                  <p className="mb-2.5 text-[9px] font-medium uppercase tracking-widest text-zinc-600">
                    Eventos en tiempo real
                  </p>
                  <EventFlowVisual active={inView} />
                </div>
              </div>
            </Link>
          </GlassCard>

          {/* ⑤ Stats */}
          <GlassCard className="md:col-span-2">
            <div className="p-6 flex flex-col justify-between h-full min-h-55">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-indigo-400/60">
                05
              </p>
              <div className="grid grid-cols-2 gap-6 py-4">
                <div className="flex flex-col gap-1">
                  <span
                    className="font-display text-5xl font-bold tabular-nums leading-none"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {uptime}
                    <span className="text-2xl text-indigo-400">.9%</span>
                  </span>
                  <span className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-zinc-600">
                    Uptime APIs
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span
                    className="font-display text-5xl font-bold tabular-nums leading-none"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {projectCount}
                    <span className="text-2xl text-indigo-400">+</span>
                  </span>
                  <span className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-zinc-600">
                    Proyectos
                  </span>
                </div>
              </div>
              <div
                className="h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(99,102,241,0.4), transparent)",
                }}
              />
              <p
                id="about"
                className="pt-3 text-xs text-zinc-600 leading-relaxed text-pretty"
              >
                Código mantenible, documentación clara y testing robusto.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
