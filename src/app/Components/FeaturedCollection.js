import Image from "next/image";
import Link from "next/link";

export default function FeaturedCollection() {
  return (
    <section className="ml-8 px-10 py-10   mx-auto bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold ml-20">Featured Collection</h2>
        <Link
          href="/collections"
          className="text-sm text-gray-600 hover:underline"
        >
          View More
        </Link>
      </div>

      <div className="grid md:grid-cols-2 ml-20">
        {/* Card 1 */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#f3e7db] to-white w-[25vw] h-[25vh] rounded-lg shadow-sm">
          <div className="max-w-[40%] h-[60%]">
            <h3 className="text-xl font-semibold mb-2">
              luxe <span className="italic">Abundance</span>
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Get 20% off with our code: iLux20.
            </p>
            <button className="bg-[#8b2c2d] text-white px-4 py-2 rounded-md text-sm">
              Redeem code
            </button>
          </div>
          <div className="ml-4">
            <Image src="/ring.png" alt="Ring" width={150} height={150} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#f3e7db] to-white w-[25vw] h-[25vh] rounded-lg shadow-sm">
          <div className="max-w-[50%]">
            <h3 className="text-xl font-semibold mb-2">Sparkle in love</h3>
            <p className="text-sm text-gray-700 mb-4">
              Make her say yes with our 50% off rings.
            </p>
            <button className="bg-[#8b2c2d] text-white px-4 py-2 rounded-md text-sm">
              View Products
            </button>
          </div>
          <div className="ml-4">
            <Image
              src="/earrings.png"
              alt="Earrings"
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
