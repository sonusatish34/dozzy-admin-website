// next-sitemap.js

module.exports = {
  siteUrl: 'https://dozzy-admin-website-seven.vercel.app/', // Replace with your domain
  generateRobotsTxt: true, // Optional, generates a robots.txt file
  changefreq: 'daily', // How often pages change
  priority: 0.7, // Default priority
  sitemapSize: 7000, // Limit the number of URLs per sitemap
  additionalSitemaps: [
    'https://dozzy-admin-website-seven.vercel.app/api/sitemap-about', // dynamic route
  ],
}
