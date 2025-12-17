import { useEffect } from 'react';

const SEO = ({ 
  title = "Our World of Education - Quality Learning Platform",
  description = "Best online education platform with expert tutors, interactive classes, and comprehensive learning programs for all grades in Pakistan.",
  keywords = "education, online classes, tutoring, learning platform, Pakistan education, school courses",
  ogImage = "https://our-we.netlify.app/hero-img-boy.png",
  url = "https://our-we.netlify.app/",
  type = "website"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    
    const updateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    
    // Update all meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index, follow');
    
    // Open Graph tags
    updateOGTag('og:title', title);
    updateOGTag('og:description', description);
    updateOGTag('og:image', ogImage);
    updateOGTag('og:url', url);
    updateOGTag('og:type', type);
    
    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    
    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
    
    // Cleanup on unmount
    return () => {
      // Reset to default if needed
      document.title = "Our World of Education";
    };
  }, [title, description, keywords, ogImage, url, type]);
  
  return null; // This component doesn't render anything
};

export default SEO;