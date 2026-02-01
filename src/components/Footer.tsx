import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-outer-shell pt-8">
      <div className="footer-links-shell">
        {/* Home Icon */}
        <div className="footer-home">
          <a href="/" aria-label="Home">
            <img
              src="/images/icons/home-icon.svg"
              alt="Home"
              className="footer-home-icon"
              style={{ width: 40, height: 40 }}
              onMouseOver={e => (e.currentTarget as HTMLImageElement).src = '/images/icons/home-icon-yellow.svg'}
              onMouseOut={e => (e.currentTarget as HTMLImageElement).src = '/images/icons/home-icon.svg'}
            />
          </a>
        </div>
        {/* Navigation Links */}
        <div className="footer-links">
          <a
            className="footer_navigationlinks"
            href="mailto:weavrk@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
          <a
            className="footer_navigationlinks"
            href="https://www.linkedin.com/in/katherine-weaver-ra-5b358421/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 