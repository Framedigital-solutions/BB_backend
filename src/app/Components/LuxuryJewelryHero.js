import Image from "next/image";

export default function LuxuryJewelryHero() {
  return (
    <section className="relative w-full min-h-screen bg-white  overflow-hidden">
      <div
        className="relative bg-cover bg-center bg-no-repeat h-screen"
        style={{ backgroundImage: "url('/homeimage/home2.png')" }}
      >
        <div className="container mx-auto px-6 relative z-10 h-full flex items-center bg-opacity-40">
          <div className="flex flex-col md:flex-row items-start justify-between w-full">
            {/* Left Text Content */}
            <div className="md:w-1/2 lg:w-2/5 mb-12 md:mb-0 pr-0 md:pr-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-black leading-tight">
                Discover Our Unique
                <br />
                Luxury Jewelry
                <br />
                Collection
              </h1>
              <p className="text-black mb-8 max-w-lg">
                Step into a world of whimsy with our fantastical jewellery
                collection. Each item is playfully designed, blending quirky
                styles with a touch of magical charm.
              </p>
              <button className="bg-[#8b2c2d] text-white px-8 py-3 rounded-md hover:bg-[#7a2526] transition-colors">
                Shop Now
              </button>
            </div>

            {/* Right Images Grid */}
            <div className="hidden md:block md:w-1/2 lg:w-3/5 relative">
              <div className="relative flex items-start justify-end">
                {/* Bottom jewelry image */}
                <div className="relative z-10 mr-6 mt-12">
                  <div
                    className="relative w-56 h-64 overflow-hidden rounded-lg shadow-md"
                    style={{ width: "326.67px", height: "490px" }}
                  >
                    <Image
                      src="/homeimage/9.png"
                      alt="Jewelry on hands"
                      fill
                      sizes="(max-width: 768px) 14rem, 16rem"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Right woman image */}
                <div className="relative -mt-8">
                  <div
                    className="relative w-56 h-72 overflow-hidden rounded-lg shadow-md"
                    style={{ width: "326.67px", height: "490px" }}
                  >
                    <Image
                      src="/homeimage/10.png"
                      alt="Woman wearing jewelry"
                      fill
                      sizes="(max-width: 768px) 14rem, 18rem"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
