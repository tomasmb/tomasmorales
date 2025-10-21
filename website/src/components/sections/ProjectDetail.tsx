'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AlertCircle, Lightbulb, Target, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { ArchitectureDiagram } from '@/components/diagrams/ArchitectureDiagram';

interface ProjectDetailProps {
  slug: string;
}

interface DiagramNode {
  id: string;
  label: string;
  type?: 'box' | 'database' | 'api';
  x: number;
  y: number;
  width?: number;
  height?: number;
}

interface DiagramGroup {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DiagramConnection {
  from: string;
  to: string;
  fromSide?: 'top' | 'right' | 'bottom' | 'left';
  toSide?: 'top' | 'right' | 'bottom' | 'left';
  waypoints?: { x: number; y: number }[];
  bidirectional?: boolean;
}

const architectureDiagrams: Record<
  string,
  {
    nodes: DiagramNode[];
    connections: DiagramConnection[];
    groups?: DiagramGroup[];
    width: number;
    height: number;
  }
> = {
  'crypto-arbitrage-bot': {
    width: 1000,
    height: 500,
    groups: [
      { id: 'backoffice', label: 'Backoffice', x: 50, y: 220, width: 340, height: 240 },
      { id: 'trader', label: 'Trader', x: 470, y: 220, width: 480, height: 240 },
    ],
    nodes: [
      // SQL centered above Golang (560 - 50 = 510)
      { id: 'sql', label: 'SQL', type: 'database', x: 510, y: 50, width: 100 },
      { id: 'node', label: 'NodeJS', type: 'box', x: 90, y: 250, width: 260, height: 70 },
      { id: 'react', label: 'ReactJS', type: 'box', x: 90, y: 360, width: 260, height: 70 },
      // Golang positioned inside Trader group
      { id: 'golang', label: 'Golang', type: 'box', x: 490, y: 305, width: 140, height: 70 },
      // Buda positioned above Golang center
      { id: 'buda', label: 'Buda API', type: 'box', x: 740, y: 260, width: 180, height: 70 },
      // Binance positioned below Golang center
      { id: 'binance', label: 'Binance API', type: 'box', x: 740, y: 360, width: 180, height: 70 },
    ],
    connections: [
      // React ↔ Node (bidirectional vertical)
      { from: 'react', to: 'node', fromSide: 'top', toSide: 'bottom', bidirectional: true },
      // Node → SQL (go up then right)
      { from: 'node', to: 'sql', fromSide: 'top', toSide: 'left', bidirectional: true, waypoints: [
        { x: 220, y: 90 }
      ]},
      // SQL → Golang (straight down - vertically aligned)
      { from: 'sql', to: 'golang', fromSide: 'bottom', toSide: 'top', bidirectional: true },
      // Golang → Buda (go right, up, then right to buda)
      { from: 'golang', to: 'buda', fromSide: 'right', toSide: 'left', bidirectional: true, waypoints: [
        { x: 680, y: 340 },
        { x: 680, y: 295 }
      ]},
      // Golang → Binance (go right, down, then right to binance)
      { from: 'golang', to: 'binance', fromSide: 'right', toSide: 'left', bidirectional: true, waypoints: [
        { x: 680, y: 340 },
        { x: 680, y: 395 }
      ]},
    ],
  },
  ztudia: {
    width: 700,
    height: 450,
    groups: [
      { id: 'ai-processing', label: 'AI Processing', x: 340, y: 160, width: 320, height: 260 },
    ],
    nodes: [
      { id: 'wasp', label: 'Wasp (Full-stack)', type: 'box', x: 30, y: 50, width: 200 },
      { id: 'postgres', label: 'PostgreSQL', type: 'database', x: 50, y: 200, width: 160 },
      { id: 'generation', label: 'Generation', type: 'box', x: 380, y: 190, width: 240, height: 70 },
      { id: 'validation', label: 'Multimodal Validation', type: 'box', x: 380, y: 310, width: 240, height: 70 },
    ],
    connections: [
      // Wasp ↔ PostgreSQL (bidirectional)
      { from: 'wasp', to: 'postgres', fromSide: 'bottom', toSide: 'top', bidirectional: true },
      // Wasp ↔ Generation (bidirectional)
      { from: 'wasp', to: 'generation', fromSide: 'right', toSide: 'left', bidirectional: true, waypoints: [
        { x: 270, y: 85 },
        { x: 270, y: 225 }
      ]},
      // Generation ↔ Validation (bidirectional cycle - OpenAI calls)
      { from: 'generation', to: 'validation', fromSide: 'bottom', toSide: 'top', bidirectional: true },
    ],
  },
  tradesilike: {
    width: 700,
    height: 400,
    nodes: [
      { id: 'react', label: 'React.js', type: 'box', x: 50, y: 50, width: 160 },
      { id: 'node', label: 'Node.js API (K8s)', type: 'box', x: 270, y: 50, width: 180 },
      { id: 'mongo', label: 'MongoDB', type: 'database', x: 490, y: 150, width: 160 },
      { id: 'functions', label: 'Cloud Functions', type: 'box', x: 270, y: 250, width: 180 },
    ],
    connections: [
      // React ↔ Node API (bidirectional)
      { from: 'react', to: 'node', fromSide: 'right', toSide: 'left', bidirectional: true },
      // Node API ↔ MongoDB (bidirectional)
      { from: 'node', to: 'mongo', fromSide: 'right', toSide: 'left', bidirectional: true, waypoints: [
        { x: 470, y: 80 },
        { x: 470, y: 190 }
      ]},
      // Cloud Functions ↔ MongoDB (bidirectional)
      { from: 'functions', to: 'mongo', fromSide: 'right', toSide: 'left', bidirectional: true, waypoints: [
        { x: 470, y: 280 },
        { x: 470, y: 190 }
      ]},
    ],
  },
};

export function ProjectDetail({ slug }: ProjectDetailProps) {
  const t = useTranslations('projects');
  const projects = JSON.parse(JSON.stringify(t.raw('items')));

  const project = projects.find((p: { slug: string }) => p.slug === slug) as
    | {
        slug: string;
        title: string;
        period?: string;
        problem?: string;
        solution?: string;
        impact?: string[];
        tech: string[];
      }
    | undefined;

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to projects</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {project.title}
            </h1>
            {project.period && (
              <p className="text-lg text-foreground/50">{project.period}</p>
            )}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-12">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm font-medium bg-accent/10 text-accent rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Problem */}
          {project.problem && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <AlertCircle size={24} className="text-accent" />
                </div>
                <h2 className="text-2xl font-semibold">Problem</h2>
              </div>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {/* Solution */}
          {project.solution && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Lightbulb size={24} className="text-accent" />
                </div>
                <h2 className="text-2xl font-semibold">Solution</h2>
              </div>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                {project.solution}
              </p>

              {/* Architecture Diagram */}
              {architectureDiagrams[slug] && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-4 text-foreground/70">
                    Architecture
                  </h3>
                  <ArchitectureDiagram
                    nodes={architectureDiagrams[slug].nodes}
                    connections={architectureDiagrams[slug].connections}
                    groups={architectureDiagrams[slug].groups}
                    width={architectureDiagrams[slug].width}
                    height={architectureDiagrams[slug].height}
                  />
                </div>
              )}
            </div>
          )}

          {/* Impact */}
          {project.impact && project.impact.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Target size={24} className="text-accent" />
                </div>
                <h2 className="text-2xl font-semibold">Impact</h2>
              </div>
              <ul className="space-y-3">
                {project.impact.map((item, i) => (
                  <li key={i} className="flex gap-3 text-lg text-foreground/80">
                    <span className="text-accent mt-1.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
