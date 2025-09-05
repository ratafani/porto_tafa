import React, { useState } from 'react';
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
  const [selectedProject, setSelectedProject] = useState(null);

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

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
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

        {/* Projects Grid - Redesigned for Better Readability */}
        <div className="projects-grid">
          {filteredProjects.map(project => {
            const images = projectImages[project.id];
            return (
              <div 
                key={project.id} 
                className={`project-card ${project.featured ? 'featured' : ''}`}
              >
                {/* Clean Image Section - No Overlays */}
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
                </div>
                
                {/* Clear Content Section - No Text on Images */}
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-year">{project.year}</span>
                  </div>
                  
                  <p className="project-role">{project.role}</p>
                  
                  <p className="project-description">
                    {project.description.substring(0, 100)}...
                  </p>
                  
                  {/* Technology Tags */}
                  <div className="project-tech">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-more">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="project-actions">
                    <button 
                      className="view-details-btn"
                      onClick={() => openProjectModal(project)}
                    >
                      View Details
                    </button>
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="visit-project-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Redesigned Modal - Clean & Organized */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeProjectModal}>
          <div className="project-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <button className="modal-close" onClick={closeProjectModal}>
                ×
              </button>
              <h2 className="modal-title">{selectedProject.title}</h2>
            </div>
            
            <div className="modal-content">
              {/* Image Gallery */}
              <div className="modal-image-section">
                <img 
                  src={projectImages[selectedProject.id]?.screenshot || projectImages[selectedProject.id]?.logo} 
                  alt={selectedProject.title}
                  className="modal-main-image"
                />
              </div>
              
              {/* Project Info */}
              <div className="modal-info-section">
                <div className="modal-meta">
                  <span className="modal-role">{selectedProject.role}</span>
                  <span className="modal-category">{selectedProject.category}</span>
                  <span className="modal-year">{selectedProject.year}</span>
                </div>
                
                <div className="modal-description">
                  <h4>About This Project</h4>
                  <p>{selectedProject.description}</p>
                </div>
                
                <div className="modal-highlights">
                  <h4>Key Achievements</h4>
                  <ul className="highlights-list">
                    {selectedProject.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="modal-technologies">
                  <h4>Technologies Used</h4>
                  <div className="tech-grid">
                    {selectedProject.technologies.map(tech => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
                
                {selectedProject.url && (
                  <div className="modal-actions">
                    <a 
                      href={selectedProject.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="modal-visit-btn"
                    >
                      Visit Project ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;