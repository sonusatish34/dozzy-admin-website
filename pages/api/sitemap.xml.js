// export async function handler(req, res) {
//     // Generate or fetch sitemap for the About section here
    
//     const sitemap = `
//       <?xml version="1.0" encoding="UTF-8"?>
//       <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         <url>
//           <loc>https://dozzy-admin-website-seven.vercel.app/about</loc>
//           <lastmod>2025-01-22</lastmod>
//           <changefreq>daily</changefreq>
//           <priority>0.8</priority>
//         </url>
//         <!-- Add other about-related URLs here -->
//       </urlset>
//     `;

//     res.setHeader('Content-Type', 'application/xml');
//     res.status(200).send(sitemap);
// }
export default async function handler(req, res) {
  const mainSitemapUrls = [
    'https://dozzy-admin-website-seven.vercel.app/hyderabad.xml',
    'https://dozzy-admin-website-seven.vercel.app/warangal.xml',
    'https://dozzy-admin-website-seven.vercel.app/vizag.xml',
    'https://dozzy-admin-website-seven.vercel.app/selfdrivecars.xml',
    'https://dozzy-admin-website-seven.vercel.app/rentacar.xml',
    'https://dozzy-admin-website-seven.vercel.app/newcars.xml',
  ];

  // XML for sitemap index
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${mainSitemapUrls
      .map(url => `<sitemap><loc>${url}</loc></sitemap>`)
      .join('')}
  </sitemapindex>`;

  // Set the correct content type and send the response
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(sitemapIndex);
}

