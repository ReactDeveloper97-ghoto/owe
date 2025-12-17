import { useEffect } from 'react';
import PropTypes from 'prop-types';

const SEO = ({ 
  title = "Our World of Education - Quality Learning Platform",
  description = "Best online education platform with expert tutors, interactive classes, and comprehensive learning programs for all grades in Pakistan.",
  keywords = "education, online classes, tutoring, learning platform, Pakistan education, school courses",
  ogImage = "https://our-we.netlify.app/hero-img-boy.png",
  url = "https://our-we.netlify.app/",
  type = "website",
  noindex = false,
  publishedTime = null,
  modifiedTime = null,
  author = "Our World of Education",
  siteName = "Our World of Education",
  locale = "en_US",
  twitterHandle = "@ourworldedu",
  fbAppId = null,
  structuredData = null,
  children = null
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Helper function to update/create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    
    // Helper for link tags
    const updateLinkTag = (rel, href) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', href);
    };

    // 1. BASIC META TAGS
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    
    // 2. OPEN GRAPH (Facebook, LinkedIn, Pinterest)
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
    updateMetaTag('og:image:alt', title, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', siteName, 'property');
    updateMetaTag('og:locale', locale, 'property');
    
    if (fbAppId) {
      updateMetaTag('fb:app_id', fbAppId, 'property');
    }
    
    // Article specific
    if (type === 'article') {
      if (publishedTime) updateMetaTag('article:published_time', publishedTime, 'property');
      if (modifiedTime) updateMetaTag('article:modified_time', modifiedTime, 'property');
      if (author) updateMetaTag('article:author', author, 'property');
    }

    // 3. TWITTER CARDS
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:image:alt', title);
    updateMetaTag('twitter:url', url);
    if (twitterHandle) {
      updateMetaTag('twitter:site', twitterHandle);
      updateMetaTag('twitter:creator', twitterHandle);
    }

    // 4. CANONICAL & ALTERNATE URLS
    updateLinkTag('canonical', url);
    
    // 5. STRUCTURED DATA (JSON-LD)
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => {
      if (script.dataset.seoComponent === 'true') {
        script.remove();
      }
    });

    // Add new structured data if provided
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoComponent = 'true';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    } else {
      // Default structured data
      const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteName,
        "url": url,
        "description": description,
        "publisher": {
          "@type": "Organization",
          "name": siteName,
          "logo": {
            "@type": "ImageObject",
            "url": "https://our-we.netlify.app/vite.svg"
          }
        }
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoComponent = 'true';
      script.textContent = JSON.stringify(defaultStructuredData);
      document.head.appendChild(script);
    }

    // 6. ADDITIONAL SEO TAGS
    updateMetaTag('language', 'English');
    updateMetaTag('geo.region', 'PK');
    updateMetaTag('geo.placename', 'Pakistan');
    updateMetaTag('geo.position', '30.3753;69.3451');
    updateMetaTag('ICBM', '30.3753, 69.3451');
    updateMetaTag('apple-mobile-web-app-title', siteName);
    updateMetaTag('application-name', siteName);
    updateMetaTag('msapplication-TileColor', '#4f46e5');
    updateMetaTag('theme-color', '#4f46e5');

    // Cleanup function
    return () => {
      // Reset to default title
      document.title = "Our World of Education";
      
      // Clean up structured data scripts
      const scripts = document.querySelectorAll('script[type="application/ld+json"][data-seo-component="true"]');
      scripts.forEach(script => script.remove());
    };
  }, [
    title, description, keywords, ogImage, url, type, noindex,
    publishedTime, modifiedTime, author, siteName, locale,
    twitterHandle, fbAppId, structuredData
  ]);

  // Render children if any (for adding additional head elements)
  return children || null;
};

// PropTypes for better development experience
SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogImage: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.oneOf(['website', 'article', 'profile', 'book']),
  noindex: PropTypes.bool,
  publishedTime: PropTypes.string,
  modifiedTime: PropTypes.string,
  author: PropTypes.string,
  siteName: PropTypes.string,
  locale: PropTypes.string,
  twitterHandle: PropTypes.string,
  fbAppId: PropTypes.string,
  structuredData: PropTypes.object,
  children: PropTypes.node
};

// Default props
SEO.defaultProps = {
  title: "Our World of Education - Quality Learning Platform",
  description: "Best online education platform with expert tutors, interactive classes, and comprehensive learning programs for all grades in Pakistan.",
  keywords: "education, online classes, tutoring, learning platform, Pakistan education, school courses",
  ogImage: "https://our-we.netlify.app/hero-img-boy.png",
  url: "https://our-we.netlify.app/",
  type: "website",
  noindex: false,
  author: "Our World of Education",
  siteName: "Our World of Education",
  locale: "en_US",
  twitterHandle: "@ourworldedu"
};

export default SEO;