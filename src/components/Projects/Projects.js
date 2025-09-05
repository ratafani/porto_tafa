import React, { useState, useRef, useEffect } from 'react';
import './Projects.css';
import projectsData from '../../data/projects.json';

// Import project images
import staffmateLogo from '../../assets/images/Staffmate/logo_staffmate.jpeg';
import staffmateApp from '../../assets/images/Staffmate/staffmateapp.png';
import sffLogo from '../../assets/images/SFF/sff_logo.png';
import sffApp from '../../assets/images/SFF/app_sff.jpg';
import sffVenue from '../../assets/images/SFF/venue_sff.jpg';
import reliaIcon from '../../assets/images/Relia/626x0w.webp';
import reliaScreen1 from '../../assets/images/Relia/Screenshot 2025-09-05 at 17.06.41.png';
import reliaScreen2 from '../../assets/images/Relia/Screenshot 2025-09-05 at 17.06.51.png';
import reliaScreen3 from '../../assets/images/Relia/Screenshot 2025-09-05 at 17.07.17.png';
import kchuLogo from '../../assets/images/KopiChuseyo/kchu_logo.jpeg';
import kchuScreen from '../../assets/images/KopiChuseyo/Screenshot 2025-09-05 at 17.09.19.png';
import coppaLogo from '../../assets/images/CoppaMagz/logo_coppa.webp';
import coppaScreen from '../../assets/images/CoppaMagz/Screenshot 2025-09-05 at 17.25.44.png';
import konekseedLogo from '../../assets/images/Konekseed/logo_ks.jpeg';
import konekseedPoster from '../../assets/images/Konekseed/poster_ks.webp';
import komixScreen1 from '../../assets/images/Komix/Screenshot 2025-09-05 at 17.26.05.png';
import komixScreen2 from '../../assets/images/Komix/Screenshot 2025-09-05 at 17.26.26.png';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedProject, setExpandedProject] = useState(null);
  const expandedRef = useRef(null);

  // Image mapping for each project
  const projectImages = {
    1: { logo: staffmateLogo, screenshot: staffmateApp },
    2: { logo: sffLogo, screenshot: sffApp, extra: sffVenue },
    3: { logo: reliaIcon, screenshot: reliaScreen1, gallery: [reliaScreen2, reliaScreen3] },
    4: { logo: kchuLogo, screenshot: kchuScreen },
    5: { logo: coppaLogo, screenshot: coppaScreen },
    6: { logo: konekseedLogo, screenshot: konekseedPoster },
    7: { screenshot: komixScreen1, extra: komixScreen2 }
  };

  const categories = ['All', ...projectsData.categories];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projectsData.projects 
    : projectsData.projects.filter(project => project.category === selectedCategory);

  const toggleProjectDetails = (project) => {
    if (expandedProject?.id === project.id) {
      setExpandedProject(null);
    } else {
      setExpandedProject(project);
      // Scroll to the expanded project after a short delay for smooth animation
      setTimeout(() => {
        if (expandedRef.current) {
          expandedRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 300);
    }
  };

  return (
    <section className="projects-section section" id="projects">
      <div className="container">
        <div className="projects-header">
          <h2>Featured Projects</h2>
          <p>Explore my portfolio of innovative applications and platforms</p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map(project => {
            const images = projectImages[project.id];
            const isExpanded = expandedProject?.id === project.id;
            
            return (
              <div 
                key={project.id} 
                className={`project-card ${project.featured ? 'featured' : ''} ${isExpanded ? 'expanded' : ''}`}
                ref={isExpanded ? expandedRef : null}
              >
                {/* Clickable Project Preview */}
                <div 
                  className="project-preview clickable-card"
                  onClick={() => toggleProjectDetails(project)}
                >
                  <div className="project-image-container">
                    <img 
                      src={images?.screenshot || images?.logo} 
                      alt={project.title}
                      loading="lazy"
                      className="project-image"
                    />
                    <div className="project-category-badge">
                      {project.category}
                    </div>
                    <div className="project-overlay">
                      <div className="overlay-content">
                        <span className="tap-hint">Tap to explore</span>
                        <div className="expand-icon">
                          {isExpanded ? '−' : '+'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="project-content">
                    <div className="project-header">
                      <h3 className="project-title">{project.title}</h3>
                      <span className="project-year">{project.year}</span>
                    </div>
                    
                    <p className="project-role">{project.role}</p>
                    
                    <p className="project-description">
                      {isExpanded ? project.description : `${project.description.substring(0, 100)}...`}
                    </p>
                    
                    {/* Technology Tags */}
                    <div className="project-tech">
                      {project.technologies.slice(0, isExpanded ? project.technologies.length : 3).map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                      {!isExpanded && project.technologies.length > 3 && (
                        <span className="tech-more">+{project.technologies.length - 3} more</span>
                      )}
                    </div>
                    
                    {/* External Links - Prevent event bubbling */}
                    <div className="project-actions" onClick={(e) => e.stopPropagation()}>
                      {project.links?.demo && (
                        <a 
                          href={project.links.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="demo-btn"
                        >
                          <span className="btn-icon">🚀</span>
                          Live Demo
                        </a>
                      )}
                      {project.links?.github && (
                        <a 
                          href={project.links.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="github-btn"
                        >
                          <span className="btn-icon">📱</span>
                          App Store
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details - Same as before */}
                {isExpanded && (
                  <div className="project-details">
                    <div className="details-container">
                      {/* Left Column - Visual Content */}
                      <div className="details-left">
                        {/* Image Gallery */}
                        {images && Object.values(images).length > 1 && (
                          <div className="project-gallery">
                            <h4 className="section-title">
                              <span className="title-icon">🖼️</span>
                              Gallery
                            </h4>
                            <div className="gallery-grid">
                              {Object.entries(images).map(([key, src]) => (
                                <div key={key} className="gallery-item">
                                  <img 
                                    src={src} 
                                    alt={`${project.title} ${key}`}
                                    className="gallery-image"
                                  />
                                  <div className="gallery-overlay">
                                    <span className="gallery-label">{key}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Project Links */}
                        {project.links && (
                          <div className="project-links">
                            <h4 className="section-title">
                              <span className="title-icon">🔗</span>
                              Links
                            </h4>
                            <div className="links-container">
                              {project.links.demo && (
                                <a 
                                  href={project.links.demo} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="project-link demo-link"
                                >
                                  <span className="link-icon">🚀</span>
                                  <span>Live Demo</span>
                                  <span className="link-arrow">→</span>
                                </a>
                              )}
                              {project.links.github && (
                                <a 
                                  href={project.links.github} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="project-link github-link"
                                >
                                  <span className="link-icon">📱</span>
                                  <span>App Store</span>
                                  <span className="link-arrow">→</span>
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column - Content */}
                      <div className="details-right">
                        {/* Project Meta Info */}
                        <div className="project-meta">
                          <div className="meta-item">
                            <span className="meta-label">Year</span>
                            <span className="meta-value">{project.year}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-label">Role</span>
                            <span className="meta-value">{project.role}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-label">Category</span>
                            <span className="meta-value">{project.category}</span>
                          </div>
                        </div>

                        {/* Project Highlights */}
                        {project.highlights && project.highlights.length > 0 && (
                          <div className="project-highlights">
                            <h4 className="section-title">
                              <span className="title-icon">✨</span>
                              Key Features
                            </h4>
                            <div className="highlights-list">
                              {project.highlights.map((highlight, index) => (
                                <div key={index} className="highlight-item">
                                  <div className="highlight-bullet"></div>
                                  <span className="highlight-text">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Technologies */}
                        <div className="project-technologies">
                          <h4 className="section-title">
                            <span className="title-icon">🛠️</span>
                            Technologies
                          </h4>
                          <div className="tech-stack">
                            {project.technologies.map((tech, index) => (
                              <div key={index} className="tech-item">
                                <span className="tech-name">{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;