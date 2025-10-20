import { Icon } from '@iconify/react';

interface TechLogoProps {
  name: string;
  className?: string;
}

export function TechLogo({ name, className = 'w-12 h-12' }: TechLogoProps) {
  const logoMap: Record<string, string> = {
    aws: 'simple-icons:amazonaws',
    gcp: 'simple-icons:googlecloud',
    nextjs: 'simple-icons:nextdotjs',
    'next.js': 'simple-icons:nextdotjs',
    nodejs: 'simple-icons:nodedotjs',
    'node.js': 'simple-icons:nodedotjs',
    react: 'simple-icons:react',
    typescript: 'simple-icons:typescript',
    python: 'simple-icons:python',
    golang: 'simple-icons:go',
    openai: 'simple-icons:openai',
    anthropic: 'simple-icons:anthropic',
    postgresql: 'simple-icons:postgresql',
    mongodb: 'simple-icons:mongodb',
    graphql: 'simple-icons:graphql',
    docker: 'simple-icons:docker',
    kubernetes: 'simple-icons:kubernetes',
    lambda: 'simple-icons:awslambda',
    tailwind: 'simple-icons:tailwindcss',
  };

  const icon = logoMap[name.toLowerCase()];

  if (icon) {
    return <Icon icon={icon} className={className} />;
  }

  return (
    <div
      className={`${className} flex items-center justify-center text-xs font-bold text-foreground/50`}
    >
      {name}
    </div>
  );
}
