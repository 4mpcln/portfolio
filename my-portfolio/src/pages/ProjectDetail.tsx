import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import CursorFollower from '@/components/CursorFollower';
import Footer from '@/components/footer';
import { projects } from '@/data/projects';

export default function ProjectDetail() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);
  const sampleImages = project?.sampleImages ?? [];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? sampleImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === sampleImages.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevImage();
    if (e.key === 'ArrowRight') handleNextImage();
    if (e.key === 'Escape') setIsFullscreen(false);
  };

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
                <div className="flex items-center justify-between gap-4">
                  <h1 className="text-4xl md:text-5xl font-black text-white">{project.title}</h1>
                  
                  {/* Icon link based on category */}
                  {project.projectUrl && (
                    project.category === 'design' ? (
                      // Figma Link
                      <a
                        href={Array.isArray(project.projectUrl) ? project.projectUrl[0] : project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group flex-shrink-0"
                      >
                        <span className="text-white/60 group-hover:text-white/90 text-sm font-medium whitespace-nowrap">
                          View in
                        </span>
                        <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                        </svg>
                      </a>
                    ) : (
                      // GitHub Link(s) - Show multiple buttons if array
                      Array.isArray(project.projectUrl) ? (
                        <div className="flex gap-2">
                          {project.projectUrl.map((url, index) => (
                            <a
                              key={index}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group flex-shrink-0"
                            >
                              <span className="text-white/60 group-hover:text-white/90 text-sm font-medium whitespace-nowrap">
                                View {index === 0 ? 'User' : 'Admin'}
                              </span>
                              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z"/>
                              </svg>
                            </a>
                          ))}
                        </div>
                      ) : (
                        // Single GitHub Link
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group flex-shrink-0"
                        >
                          <span className="text-white/60 group-hover:text-white/90 text-sm font-medium whitespace-nowrap">
                            View in
                          </span>
                          <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z"/>
                          </svg>
                        </a>
                      )
                    )
                  )}
                </div>
                
                {/* Tech Stack Tags */}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 ml-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-white/70 text-lg leading-relaxed max-w-3xl" style={{ textIndent: '1.5rem' }}>
                  {project.summary}
                </p>
              </div>

              <div>
                {sampleImages.length > 0 ? (
                  <div className="relative max-w-9xl mx-auto">
                    {/* Main Image Viewer */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black p-10 min-h-[600px] flex items-center justify-center">
                      <div className="relative">
                        <img
                          src={sampleImages[currentImageIndex]}
                          alt={`${project.title} preview ${currentImageIndex + 1}`}
                          className="max-w-full max-h-[800px] object-contain bg-black"
                        />
                      </div>
                    </div>

                    {/* Navigation Arrows - Outside the box */}
                    {sampleImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={handlePrevImage}
                          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/20"
                          aria-label="Previous image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 42 42">
                            <path fill="currentColor" fillRule="evenodd" d="M31 38.32L13.391 21L31 3.68L28.279 1L8 21.01L28.279 41z"/>
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={handleNextImage}
                          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/20"
                          aria-label="Next image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 42 42" className="rotate-180">
                            <path fill="currentColor" fillRule="evenodd" d="M31 38.32L13.391 21L31 3.68L28.279 1L8 21.01L28.279 41z"/>
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Image Counter and Fullscreen Button - Outside the image box */}
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm border border-white/20">
                        {currentImageIndex + 1}/{sampleImages.length}
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setIsFullscreen(true)}
                        className="w-10 h-10 rounded-lg bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/20"
                        aria-label="View fullscreen"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                    <p className="text-white/40 text-center">No images available</p>
                  </div>
                )}
              </div>

              {/* Fullscreen Modal */}
              {isFullscreen && sampleImages.length > 0 && (
                <div
                  className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                  onClick={() => setIsFullscreen(false)}
                  onKeyDown={handleKeyDown}
                  role="dialog"
                  aria-modal="true"
                  tabIndex={-1}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFullscreen(false);
                    }}
                    className="absolute top-2 right-2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/20 z-10"
                    aria-label="Close fullscreen"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>

                  <div className="relative w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={sampleImages[currentImageIndex]}
                      alt={`${project.title} preview ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />

                    {/* Fullscreen Navigation */}
                    {sampleImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={handlePrevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/20"
                          aria-label="Previous image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 42 42">
                            <path fill="currentColor" fillRule="evenodd" d="M31 38.32L13.391 21L31 3.68L28.279 1L8 21.01L28.279 41z"/>
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={handleNextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/20"
                          aria-label="Next image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 42 42" className="rotate-180">
                            <path fill="currentColor" fillRule="evenodd" d="M31 38.32L13.391 21L31 3.68L28.279 1L8 21.01L28.279 41z"/>
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Fullscreen Counter */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-lg border border-white/20">
                      {currentImageIndex + 1}/{sampleImages.length}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
