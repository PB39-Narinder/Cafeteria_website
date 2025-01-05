import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Meta = ({ 
  title = 'Welcome to CaféDelight', 
  description = 'Find the best coffee and treats at CaféDelight', 
  keywords = 'coffee, café, pastries, drinks, desserts'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/images/cafe-banner.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="/images/cafe-banner.jpg" />

      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon.ico" />
      
      {/* Fonts */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&display=swap" 
        rel="stylesheet" 
      />
    </Helmet>
  );
};

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string
};

export default Meta;
