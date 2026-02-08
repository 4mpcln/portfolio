import { useNavigate, useParams } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import CursorFollower from '@/components/CursorFollower';
import Footer from '@/components/footer';
import { projects } from '@/data/projects';

export default function ProjectDetail() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);
  const sampleImages = project?.sampleImages ?? [];
  const placeholderCards = 2;

  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col">
      <CursorFollower />
      <AnimatedBackground />
      <div className="relative z-10 w-full flex-1">
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 42 42">
    <path fill="currentColor" fill-rule="evenodd" d="M31 38.32L13.391 21L31 3.68L28.279 1L8 21.01L28.279 41z"/>
</svg>
            Back
          </button>

          {!project ? (
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8">
              <h1 className="text-3xl font-bold text-white">Project not found</h1>
              <p className="text-white/60 mt-2">The project you are looking for does not exist.</p>
            </div>
          ) : (
            <div className="mt-12 space-y-10">
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl md:text-5xl font-black text-white">{project.title}</h1>
                <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
                  {project.summary}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">Example Images:</h2>
                <div className="mt-5 grid gap-6">
                  {(sampleImages.length ? sampleImages : Array.from({ length: placeholderCards })).map(
                    (item, index) => (
                      <div
                        key={typeof item === 'string' ? item : `placeholder-${index}`}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                      >
                        <div className="aspect-[16/9] w-full">
                          {typeof item === 'string' && item ? (
                            <img
                              src={item}
                              alt={`${project.title} preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">
                              Image coming soon
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
