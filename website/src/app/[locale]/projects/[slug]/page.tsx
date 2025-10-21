import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { ProjectDetail } from '@/components/sections/ProjectDetail';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <ProjectDetail slug={slug} />
      </main>
      <Footer />
    </div>
  );
}
