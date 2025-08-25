import Link from 'next/link'
import Image from 'next/image'

export default async function CategoryPage({ params }) {
  const { slug } = params;
  const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

  let products = [];
  try {
    const res = await fetch(`${BASE}/api/categories/${slug}/products`);
    if (res.ok) products = await res.json();
  } catch (err) {
    console.error('Failed to load category products', err);
  }

  return (
    <main className="min-h-screen bg-[#FFF3F3] py-8">
      <div className="container mx-auto px-4">
        <nav className="text-sm mb-6 py-2">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#83272A] text-gray-700">Home</Link>
            </li>
            <li>
              <span className="mx-2 text-gray-500">/</span>
              <span className="font-medium text-[#83272A]">{slug}</span>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-[#83272A] mb-6">{slug.replace(/[-_]/g, ' ')}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products && products.length ? (
            products.map((p) => (
              <div key={p._id || p.slug} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <Link href={`/product/${p.slug}`} className="block">
                  <div className="relative h-64 bg-gray-100">
                    <Image src={p.mainImage || (p.images && p.images[0]) || '/product-images/ringProduct.png'} alt={p.title} fill className="object-contain" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-1">{p.title}</h3>
                    <p className="text-gray-700 font-bold">₹{p.price}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 bg-white rounded-lg text-center">No products found for this category.</div>
          )}
        </div>
      </div>
    </main>
  )
}
