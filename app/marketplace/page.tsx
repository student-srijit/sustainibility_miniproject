import Image from "next/image"

const products = [
  {
    name: "Solar Garden Lights",
    image: "/images/products/solar-lights.jpg",
    description: "Eco-friendly solar-powered garden lights to brighten your outdoors sustainably.",
    link: "https://www.amazon.in/s?k=solar+garden+lights",
  },
  {
    name: "Water-Saving Shower Head",
    image: "/images/products/shower-head.jpg",
    description: "Reduce water usage with this efficient, easy-to-install shower head.",
    link: "https://www.amazon.in/s?k=water+saving+shower+head",
  },
  {
    name: "Bamboo Toothbrush",
    image: "/images/products/bamboo-toothbrush.jpg",
    description: "Switch to a biodegradable bamboo toothbrush for a greener smile.",
    link: "https://www.amazon.in/s?k=bamboo+toothbrush",
  },
  {
    name: "Neem Sapling",
    image: "/images/products/neem-sapling.jpg",
    description: "Plant a neem sapling and contribute to a cleaner environment.",
    link: "https://www.amazon.in/s?k=neem+sapling",
  },
  {
    name: "Mango Sapling",
    image: "/images/products/mango-sapling.jpg",
    description: "Grow your own mango tree and enjoy fresh, homegrown fruit.",
    link: "https://www.amazon.in/s?k=mango+sapling",
  },
  {
    name: "Solar Power Bank",
    image: "/images/products/solar-power-bank.jpg",
    description: "Charge your devices anywhere with this portable solar power bank.",
    link: "https://www.amazon.in/s?k=solar+power+bank",
  },
]

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-emerald-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Sustainability Marketplace</h1>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Shop eco-friendly products and make a positive impact on the planet. Click below to buy these items directly from Amazon.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.name} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center">
              <div className="w-full h-48 relative mb-4">
                <Image src={product.image} alt={product.name} fill className="object-contain rounded-lg" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">{product.name}</h2>
              <p className="text-gray-600 mb-4 text-center">{product.description}</p>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-2 px-6 rounded-full shadow hover:from-green-700 hover:to-blue-700 transition-colors"
              >
                Buy on Amazon
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
