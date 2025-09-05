import React, { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll to section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        setIsOpen(false); // Close mobile menu after clicking
    };

    const navItems = [
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="nav-container">
                {/* Logo/Brand */}
                <div className="nav-logo" onClick={() => scrollToSection('home')}>
                    <span>Tafani Rabbani</span>
                </div>

                {/* Desktop Menu */}
                <ul className="nav-menu">
                    {navItems.map((item) => (
                        <li key={item.id} className="nav-item">
                            <button
                                className="nav-link"
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile Hamburger */}
                <div
                    className={`nav-toggle ${isOpen ? 'nav-toggle-open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                {/* Mobile Menu */}
                <ul className={`nav-menu-mobile ${isOpen ? 'nav-menu-mobile-active' : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.id} className="nav-item-mobile">
                            <button
                                className="nav-link-mobile"
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;