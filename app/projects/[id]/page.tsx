import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  intro: string;
}

interface DetailedProject extends Project {
  platform?: string;
  toolsAndTech?: string[];
  roles?: string[];
  links?: {
    github?: string;
    devblog?: string;
    doc?: string;
  };
  heroImage?: string;
  overview?: string;
  overviewVideo?: string;
  goal?: {
    title: string;
    description: string;
  };
  userFlow?: {
    title: string;
    description: string;
    steps?: Array<{
      title: string;
      description: string;
    }>;
  };
  thePlugin?: {
    title: string;
    description: string;
    downloadLink?: string;
    howToUse?: string[];
  };
  developmentIteration?: {
    title: string;
    steps?: Array<{
      title: string;
      items?: string[];
      image?: string;
    }>;
  };
  contributions?: Array<{
    title: string;
    image?: string;
  }>;
  sampleScene?: {
    title: string;
    description: string;
    goals?: Array<{
      title: string;
      image?: string;
    }>;
  };
  aboutCAVERN?: {
    title: string;
    description: string;
  };
  techArts?: Array<{
    title: string;
    image?: string;
  }>;
  otherHDAs?: Array<{
    title: string;
    image?: string;
  }>;
  galleryImages?: string[];
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

async function getProject(id: string): Promise<DetailedProject | null> {
  try {
    // Try to load detailed project data first
    const detailedPath = path.join(process.cwd(), 'public', 'projects', `${id}.json`);
    try {
      const detailedData = await fs.readFile(detailedPath, 'utf-8');
      return JSON.parse(detailedData) as DetailedProject;
    } catch {
      // If detailed project doesn't exist, fall back to basic project info
      const filePath = path.join(process.cwd(), 'public', 'projects.json');
      const data = await fs.readFile(filePath, 'utf-8');
      const projects: Project[] = JSON.parse(data);
      return (projects.find((p: Project) => p.id === id) || null) as DetailedProject | null;
    }
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
            
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <span className="text-sm px-3 py-1 tracking-wide font-semibold" style={{ color: '#0000FF', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                {project.category.toUpperCase()}
              </span>
            </div>

            {/* Platform and Tools if available */}
            {project.platform && (
              <p className="text-lg mb-4" style={{ color: '#CCCCCC' }}>
                {project.platform}
              </p>
            )}

            {project.toolsAndTech && (
              <div className="mb-6">
                <p className="text-sm tracking-wide mb-2" style={{ color: '#FFFFFF' }}>Tools and Tech:</p>
                <p style={{ color: '#CCCCCC' }}>{project.toolsAndTech.join(' / ')}</p>
              </div>
            )}

            {project.roles && (
              <div className="mb-6">
                <p className="text-sm tracking-wide mb-2" style={{ color: '#FFFFFF' }}>Role:</p>
                <p style={{ color: '#CCCCCC' }}>{project.roles.join(', ')}</p>
              </div>
            )}

            {/* Links */}
            {project.links && (
              <div className="flex gap-4 mb-8">
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-sm tracking-wide font-bold px-3 py-1" style={{ color: '#0000FF', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid #0000FF' }}>
                    GITHUB
                  </a>
                )}
                {project.links.devblog && (
                  <a href={project.links.devblog} target="_blank" rel="noopener noreferrer" className="text-sm tracking-wide font-bold px-3 py-1" style={{ color: '#0000FF', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid #0000FF' }}>
                    DEVBLOG
                  </a>
                )}
                {project.links.doc && (
                  <a href={project.links.doc} target="_blank" rel="noopener noreferrer" className="text-sm tracking-wide font-bold px-3 py-1" style={{ color: '#0000FF', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid #0000FF' }}>
                    DOC
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Intro */}
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl" style={{ color: '#FFFFFF' }}>
            {project.intro}
          </p>

          {/* Hero Image */}
          {project.heroImage && (
            <div className="relative w-full mt-12" style={{ maxHeight: '500px', aspectRatio: '16/9', overflow: 'hidden' }}>
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="relative w-full py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Overview/Introduction */}
          {project.overview && (
            <div className="mb-24">
              <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>OVERVIEW</h2>
              <p style={{ color: '#CCCCCC' }} className="text-lg leading-relaxed max-w-3xl">
                {project.overview}
              </p>
              
              {/* Overview Video */}
              {project.overviewVideo && (
                <div className="mt-12">
                  <div className="w-full aspect-video rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={project.overviewVideo}
                      title="Project Overview Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Goal Section */}
          {project.goal && (
            <div className="mb-24">
              <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>
                {project.goal.title}
              </h2>
              <p style={{ color: '#CCCCCC' }} className="text-lg leading-relaxed max-w-3xl">
                {project.goal.description}
              </p>
            </div>
          )}

          {/* User Flow Section */}
          {project.userFlow && (
            <div className="mb-24">
              <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>
                {project.userFlow.title}
              </h2>
              <p style={{ color: '#CCCCCC' }} className="text-lg leading-relaxed max-w-3xl mb-12">
                {project.userFlow.description}
              </p>

              {/* User Flow Steps */}
              {project.userFlow.steps && (
                <div className="space-y-6">
                  {project.userFlow.steps.map((step, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-6 py-2">
                      <h3 style={{ color: '#FFFFFF' }} className="text-lg font-bold mb-2">
                        {step.title}
                      </h3>
                      <p style={{ color: '#CCCCCC' }} className="text-base">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* The Plugin Section */}
          {project.thePlugin && (
            <div className="mb-24">
              <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>
                {project.thePlugin.title}
              </h2>
              <p style={{ color: '#CCCCCC' }} className="text-lg leading-relaxed max-w-3xl mb-8">
                {project.thePlugin.description}
              </p>

              {/* Download Link */}
              {project.thePlugin.downloadLink && (
                <div className="mb-8">
                  <a
                    href={project.thePlugin.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base tracking-wide font-bold px-4 py-2"
                    style={{ color: '#0000FF', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid #0000FF' }}
                  >
                    DOWNLOAD LINK
                  </a>
                </div>
              )}

              <div className="w-full aspect-video rounded-lg overflow-hidden mb-8">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/2T4cV6it7QI"
                  title="The Plugin Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* How To Use */}
              {project.thePlugin.howToUse && (
                <div>
                  <h3 style={{ color: '#FFFFFF' }} className="text-lg font-bold mb-4 tracking-wide">
                    HOW TO USE
                  </h3>
                  <ul className="space-y-2">
                    {project.thePlugin.howToUse.map((step, index) => (
                      <li key={index} style={{ color: '#CCCCCC' }} className="text-base flex items-start">
                        <span className="mr-4 text-blue-400">•</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Development & Iteration Section */}
          {project.developmentIteration && (
            <div className="mb-24">
              <h2 className="text-4xl font-bold mb-12 tracking-wide" style={{ color: '#FFFFFF' }}>
                {project.developmentIteration.title}
              </h2>

              {project.developmentIteration.steps && (
                <div className="space-y-16">
                  {project.developmentIteration.steps.map((step, index) => (
                    <div key={index} className="flex gap-12 items-start">
                      <div className="flex-1">
                        <h3 style={{ color: '#FFFFFF' }} className="text-2xl font-bold mb-4 tracking-wide">
                          {step.title}
                        </h3>
                        {step.items && (
                          <ul className="space-y-2">
                            {step.items.map((item, itemIndex) => (
                              <li key={itemIndex} style={{ color: '#CCCCCC' }} className="text-base flex items-start">
                                <span className="mr-3 text-blue-400">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {step.image && (
                        <div className="relative w-64 h-48 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image src={step.image} alt={step.title} fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {project.contributions && project.contributions.length > 0 && (
            <div className="mb-24">
              <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>MY CONTRIBUTIONS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.contributions.map((contribution, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="mt-1 text-blue-400 flex-shrink-0">•</span>
                    <p style={{ color: '#CCCCCC' }} className="text-base leading-relaxed">
                      {contribution.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About CAVERN/Project Info */}
          {project.aboutCAVERN && (
            <div className="mb-24">
              <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>
                {project.aboutCAVERN.title}
              </h2>
              <p style={{ color: '#CCCCCC' }} className="text-lg leading-relaxed max-w-4xl">
                {project.aboutCAVERN.description}
              </p>
            </div>
          )}

          {/* About Section */}
          {project.sampleScene?.description && (
            <div className="mb-24">
              <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>
                {project.sampleScene?.title || 'ABOUT THE PROJECT'}
              </h2>
              <p style={{ color: '#CCCCCC' }} className="text-lg leading-relaxed max-w-3xl mb-8">
                {project.sampleScene?.description}
              </p>

              <div className="w-full aspect-video rounded-lg overflow-hidden mb-12">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/bsXI2TTjZTI"
                  title="Sample Scene Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Sample Scene Goals */}
              {project.sampleScene?.goals && project.sampleScene.goals.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6 tracking-wide" style={{ color: '#FFFFFF' }}>Goals of the Sample Scene</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.sampleScene.goals.map((goal, index) => (
                      <div key={index} className="border border-gray-700 p-6 rounded-lg">
                        <p style={{ color: '#CCCCCC' }} className="text-base font-semibold">
                          {goal.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tech Arts / Assets Showcase */}
          {project.techArts && project.techArts.length > 0 && (
            <div className="mb-24">
              <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>TECH ARTS & ASSETS</h2>
              <div className="w-full aspect-video rounded-lg overflow-hidden mb-8">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/TMuLLRVoufs"
                  title="Tech Arts & Assets Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.techArts.map((asset, index) => (
                  <div key={index} className="flex flex-col">
                    {asset.image ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                        <Image src={asset.image} alt={asset.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center mb-4">
                        <p style={{ color: '#888' }} className="text-sm text-center px-4">[{asset.title}]</p>
                      </div>
                    )}
                    <p style={{ color: '#CCCCCC' }} className="text-sm tracking-wide">
                      {asset.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Images */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="mb-24">
              <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>GALLERY</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.galleryImages.map((src, index) => (
                  <div key={index} className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <Image src={src} alt={`Gallery image ${index + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other HDAs */}
          {project.otherHDAs && project.otherHDAs.length > 0 && (
            <div className="mb-24">
              <h2 className="text-4xl font-bold mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>OTHER HOUDINI PCG HDA</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {project.otherHDAs.map((hda, index) => (
                  <div key={index} className="flex flex-col items-center gap-4">
                    <p className="text-sm tracking-widest font-bold" style={{ color: '#FFFFFF' }}>{hda.title}</p>
                    {hda.image && (
                      <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '1/1' }}>
                        <Image src={hda.image} alt={hda.title} fill className="object-cover" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

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
