import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  intro: string;
}

export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'projects.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const projects: Project[] = JSON.parse(data);
    return projects.map((project) => ({
      id: project.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getProject(id: string): Promise<Project | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'projects.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const projects: Project[] = JSON.parse(data);
    return projects.find((p: Project) => p.id === id) || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#FFFFFF' }}>Project Not Found</h1>
          <p style={{ color: '#FFFFFF' }} className="mb-6">This project doesn't exist or has been removed.</p>
          <Link href="/#projects" style={{ color: '#0000FF' }} className="font-bold hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full bg-black text-white" style={{ paddingTop: '5rem', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="relative w-full py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/#projects" className="text-sm tracking-wide mb-12 block" style={{ color: '#0000FF' }}>
            ← BACK TO PROJECTS
          </Link>

          {/* Title and Meta */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-wide" style={{ color: '#FFFFFF' }}>
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-sm px-3 py-1 tracking-wide font-semibold" style={{ color: '#0000FF', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                {project.category.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Intro */}
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl" style={{ color: '#FFFFFF' }}>
            {project.intro}
          </p>
        </div>
      </section>

      {/* Content Section - Placeholders */}
      <section className="relative w-full py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Image Placeholder */}
          <div className="mb-24">
            <div className="w-full aspect-video bg-gradient-to-br from-gray-800 to-black border border-gray-700 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <p style={{ color: '#888' }} className="text-lg">
                  [Project Hero Image Placeholder]
                </p>
                <p style={{ color: '#555' }} className="text-sm mt-2">
                  Replace with project showcase image/video
                </p>
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="mb-24">
            <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>OVERVIEW</h2>
            <div className="prose prose-invert max-w-none">
              <p style={{ color: '#CCCCCC' }} className="text-lg leading-relaxed mb-6">
                [Project Overview - Add comprehensive description here]
              </p>
              <p style={{ color: '#999999' }} className="text-sm italic">
                This is a placeholder. Replace with actual project details.
              </p>
            </div>
          </div>

          {/* Skills Used */}
          <div className="mb-24">
            <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>SKILLS & TOOLS</h2>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 tracking-wide"
                  style={{ border: '1px solid rgba(255, 255, 255, 0.3)', color: '#FFFFFF' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery Placeholder */}
          <div className="mb-24">
            <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>GALLERY</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-video bg-gradient-to-br from-gray-800 to-black border border-gray-700 flex items-center justify-center rounded-lg"
                >
                  <div className="text-center">
                    <p style={{ color: '#888' }} className="text-sm">
                      [Image {i}]
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process/Implementation Placeholder */}
          <div className="mb-24">
            <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>PROCESS</h2>
            <div style={{ color: '#CCCCCC' }} className="space-y-6">
              <p className="text-lg leading-relaxed">
                [Add details about your creative process, technical approach, and implementation here]
              </p>
              <p style={{ color: '#999999' }} className="text-sm italic">
                Placeholder - replace with your project story
              </p>
            </div>
          </div>

          {/* Results/Outcome Placeholder */}
          <div>
            <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>RESULTS</h2>
            <div style={{ color: '#CCCCCC' }} className="space-y-6">
              <p className="text-lg leading-relaxed">
                [Add project outcomes, impact, and key achievements]
              </p>
              <p style={{ color: '#999999' }} className="text-sm italic">
                Placeholder - add project results and impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation to Other Projects */}
      <section className="relative w-full py-24 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p style={{ color: '#FFFFFF' }} className="text-lg tracking-wide mb-6">
              EXPLORE MORE PROJECTS
            </p>
            <Link href="/#projects" style={{ color: '#0000FF' }} className="font-bold text-lg hover:underline tracking-wide">
              VIEW ALL PROJECTS
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
