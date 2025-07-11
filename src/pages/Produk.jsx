import React from "react";
import { Link } from "react-router-dom";

export default function Produk() {
  const layanan = [
    { nama: "Color Care", slug: "color-care" },
    { nama: "Green Clean", slug: "stain-removal" },
    { nama: "Bio Detergency", slug: "bio-detergency" },
    { nama: "Antibacterial Guard", slug: "antibacterial-guard" },
    { nama: "Brite White", slug: "brite-white" }
  ]

  return (
    <div className="py-12 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-blue-800 mb-8">Layanan Kami</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {layanan.map((item, i) => (
          <Link
            to={`/produk/${item.slug}`}
            key={i}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-2">{item.nama}</h3>
            <p className="text-sm text-gray-600">
              Klik untuk lihat detail layanan {item.nama.toLowerCase()}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
