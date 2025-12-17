const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-indigo-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
        
        {/* SEO-friendly loading text (visible to screen readers) */}
        <span className="sr-only">Loading content...</span>
        
        {/* Structured data for loading state */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Our World of Education",
            "url": "https://our-we.netlify.app",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://our-we.netlify.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </div>
    </div>
  );
};

export default LoadingSpinner;