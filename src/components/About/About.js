import React, { useState, useEffect } from 'react';
import './About.css';
import aboutData from '../../data/about.json';

// Import images
import tafaImg from '../../assets/images/Tafa/tafa.png';
import tafaWithBgImg from '../../assets/images/Tafa/tafa_withbg.jpg';
import tafaWithErhanImg from '../../assets/images/Tafa/tafa_witherhan.jpeg';

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSkillCategory, setActiveSkillCategory] = useState('ios');

  // Use imported images instead of JSON paths
  const profileImages = [tafaImg, tafaWithBgImg, tafaWithErhanImg];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % profileImages.length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const renderSkills = (category) => {
    return aboutData.skills[category]?.map((skill, index) => (
      <div key={index} className="skill-item">
        <div className="skill-info">
          <span className="skill-name">{skill.name}</span>
          <span className="skill-level">{skill.level}%</span>
        </div>
        <div className="skill-bar">
          <div 
            className="skill-progress" 
            style={{ width: `${skill.level}%` }}
          ></div>
        </div>
      </div>
    ));
  };

  const renderCertifications = () => {
    return aboutData.certifications?.map((cert, index) => (
      <div key={index} className="certification-item">
        <div className="certification-info">
          <h4 className="certification-name">{cert.name}</h4>
          <p className="certification-issuer">{cert.issuer}</p>
          <span className="certification-year">{cert.year}</span>
          <span className="certification-type">{cert.type}</span>
        </div>
      </div>
    ));
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          {/* Profile Section */}
          <div className="profile-section">
            <div className="image-container">
              {profileImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${aboutData.personalInfo.name}`}
                  className={`profile-image ${
                    index === currentImageIndex ? 'active' : ''
                  }`}
                />
              ))}
            </div>

            <div className="profile-info">
              <h3 className="name">{aboutData.personalInfo.name}</h3>
              <p className="title">{aboutData.personalInfo.title}</p>
              <p className="summary">{aboutData.summary.brief}</p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="skills-section">
            <h3 className="skills-title">Skills</h3>
            <div className="skills-tabs">
              {Object.keys(aboutData.skills).map((category) => (
                <button
                  key={category}
                  className={`skill-tab ${
                    activeSkillCategory === category ? 'active' : ''
                  }`}
                  onClick={() => setActiveSkillCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            <div className="skills-grid">
              {renderSkills(activeSkillCategory)}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="certifications-section">
            <h3 className="certifications-title">Certifications & Education</h3>
            <div className="certifications-grid">
              {renderCertifications()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;