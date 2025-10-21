'use client';

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

interface ArchitectureDiagramProps {
  nodes: DiagramNode[];
  groups?: DiagramGroup[];
  connections: DiagramConnection[];
  width?: number;
  height?: number;
}

export function ArchitectureDiagram({
  nodes,
  groups = [],
  connections,
  width = 800,
  height = 600,
}: ArchitectureDiagramProps) {
  const defaultNodeWidth = 120;
  const defaultNodeHeight = 60;
  const databaseHeight = 80;

  // Get connection point for a node
  const getConnectionPoint = (
    nodeId: string,
    side: 'top' | 'right' | 'bottom' | 'left' = 'bottom'
  ): { x: number; y: number } => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };

    const w = node.width || defaultNodeWidth;
    const h = node.type === 'database' ? databaseHeight : node.height || defaultNodeHeight;
    const { x, y } = node;

    switch (side) {
      case 'top':
        return { x: x + w / 2, y };
      case 'right':
        return { x: x + w, y: y + h / 2 };
      case 'bottom':
        return { x: x + w / 2, y: y + h };
      case 'left':
        return { x, y: y + h / 2 };
    }
  };

  // Render database shape (cylinder)
  const renderDatabase = (node: DiagramNode) => {
    const w = node.width || defaultNodeWidth;
    const ellipseRy = 12;

    return (
      <g key={node.id}>
        <ellipse
          cx={node.x + w / 2}
          cy={node.y + ellipseRy}
          rx={w / 2}
          ry={ellipseRy}
          fill="white"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x={node.x}
          y={node.y + ellipseRy}
          width={w}
          height={databaseHeight - ellipseRy * 2}
          fill="white"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="miter"
        />
        <line
          x1={node.x}
          y1={node.y + ellipseRy}
          x2={node.x}
          y2={node.y + databaseHeight - ellipseRy}
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1={node.x + w}
          y1={node.y + ellipseRy}
          x2={node.x + w}
          y2={node.y + databaseHeight - ellipseRy}
          stroke="currentColor"
          strokeWidth="2"
        />
        <ellipse
          cx={node.x + w / 2}
          cy={node.y + databaseHeight - ellipseRy}
          rx={w / 2}
          ry={ellipseRy}
          fill="white"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          x={node.x + w / 2}
          y={node.y + databaseHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm font-medium fill-current"
        >
          {node.label}
        </text>
      </g>
    );
  };

  // Render box shape
  const renderBox = (node: DiagramNode) => {
    const w = node.width || defaultNodeWidth;
    const h = node.height || defaultNodeHeight;

    return (
      <g key={node.id}>
        <rect
          x={node.x}
          y={node.y}
          width={w}
          height={h}
          rx="8"
          fill="white"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          x={node.x + w / 2}
          y={node.y + h / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm font-medium fill-current"
        >
          {node.label}
        </text>
      </g>
    );
  };

  // Render connection arrow with orthogonal routing
  const renderConnection = (conn: DiagramConnection, index: number) => {
    const start = getConnectionPoint(conn.from, conn.fromSide || 'bottom');
    const end = getConnectionPoint(conn.to, conn.toSide || 'top');

    // Build path with waypoints for right-angle routing
    let path = `M ${start.x} ${start.y}`;

    if (conn.waypoints && conn.waypoints.length > 0) {
      // Use specified waypoints for orthogonal routing
      conn.waypoints.forEach(wp => {
        path += ` L ${wp.x} ${wp.y}`;
      });
    }

    path += ` L ${end.x} ${end.y}`;

    return (
      <path
        key={`conn-${index}`}
        d={path}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead-end)"
        markerStart={conn.bidirectional ? "url(#arrowhead-start)" : undefined}
      />
    );
  };

  return (
    <div className="p-6 md:p-8 border border-border rounded-xl bg-foreground/[0.02] overflow-x-auto">
      <div className="flex justify-center">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="text-foreground"
        >
        <defs>
          <marker
            id="arrowhead-end"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="currentColor" />
          </marker>
          <marker
            id="arrowhead-start"
            markerWidth="10"
            markerHeight="10"
            refX="1"
            refY="3"
            orient="auto"
          >
            <polygon points="10 0, 0 3, 10 6" fill="currentColor" />
          </marker>
        </defs>

        {/* Render groups */}
        {groups.map((group) => (
          <g key={group.id}>
            <rect
              x={group.x}
              y={group.y}
              width={group.width}
              height={group.height}
              rx="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.4"
            />
            <text
              x={group.x + group.width / 2}
              y={group.y + group.height - 10}
              textAnchor="middle"
              className="text-xs font-medium fill-current opacity-60"
            >
              {group.label}
            </text>
          </g>
        ))}

        {/* Render connections first (so they appear behind nodes) */}
        {connections.map((conn, index) => renderConnection(conn, index))}

        {/* Render nodes */}
        {nodes.map((node) => {
          if (node.type === 'database') {
            return renderDatabase(node);
          }
          return renderBox(node);
        })}
        </svg>
      </div>
    </div>
  );
}
