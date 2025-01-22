import { connectToDatabase } from "@/utils/connectMongo";

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}
 
export default async function sitemap({ id }) {
  const client = await connectToDatabase();
  const db = client.db("database");
  // Google's limit is 50,000 URLs per sitemap
  const start = id * 50000
  const limit = 50000

  const products = await db.collection('lens').find().skip(start).limit(limit).toArray();
  
  const product = data.map((item) => ({
    url: `${process.env.NEXT_WEBSITE_URL}/product/${item.slug}`,
    lastModified: item.updated_at || item.created_at,
    changefreq: "monthly",
    priority: 0.6,
  })); 

  return [
    ...product,
  ];
}