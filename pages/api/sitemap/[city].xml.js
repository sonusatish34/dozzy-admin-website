import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export default async function handler(req, res) {
  const { city } = req.query;

  // Generate URLs dynamically based on city (could fetch data from DB or API)
  const cityUrls = [
    `/selfdrivecars/${city}`,
    `/rentacar/${city}`,
    `/newcars/${city}`,
  ];

  // Initialize sitemap
  const sitemap = new SitemapStream({ hostname: 'https://dozzy-admin-website-seven.vercel.app' });

  // Convert URL list to stream
  const xmlString = await streamToPromise(
    Readable.from(cityUrls.map(url => ({ url, changefreq: 'daily', priority: 0.7 })))
      .pipe(sitemap)
  ).then((data) => data.toString());

  // Set the correct content type and send the response
  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(xmlString);
}
