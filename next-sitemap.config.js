// next-sitemap.js

module.exports = {
  siteUrl: 'https://dozzy-admin-website-seven.vercel.app/', // Replace with your domain
  generateRobotsTxt: true, // Optional, generates a robots.txt file
  changefreq: 'daily', // How often pages change
  priority: 0.7, // Default priority
  sitemapSize: 7000, // Limit the number of URLs per sitemap
  additionalSitemaps: [
    'https://dozzy-admin-website-seven.vercel.app/sitemap-about.xml', // Additional sitemap 1
    'https://dozzy-admin-website-seven.vercel.app/sitemap-contact.xml', // Additional sitemap 2
    // Add more sitemaps here as needed
  ],
}
