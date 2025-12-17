// scripts/sitemap-simple.js
import { writeFileSync } from 'fs';

const baseUrl = 'https://our-we.netlify.app';

const pages = [
  '/', '/about', '/programs', '/programs/elementary',
  '/programs/middle-school', '/programs/high-school',
  '/programs/competitions', '/programs/tutoring',
  '/blog', '/contact', '/login'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

pages.forEach(url => {
  const priority = url === '/' ? '1.0' : '0.8';
  const changefreq = url === '/' ? 'daily' : 'weekly';
  
  xml += `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>2025-12-17</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
});

xml += '</urlset>';

writeFileSync('./public/sitemap.xml', xml);
console.log('✅ Sitemap created!');