import React, { useState } from "react";

const servicePrices = {
  "Color Care": 10000,
  "Green Clean": 12000,
  "Antibacterial Guard": 15000,
};

export default function EstimatePage() {
  const [service, setService] = useState("");
  const [quantity, setQuantity] = useState("");
  const [estimates, setEstimates] = useState([]);

  const handleEstimate = () => {
    if (!service || !quantity || quantity <= 0) {
      alert("Pilih layanan dan jumlah pakaian dengan benar!");
      return;
    }

    const price = servicePrices[service] * Number(quantity);

    const newEstimate = {
      id: estimates.length + 1,
      service,
      quantity,
      total: price,
    };

    setEstimates([...estimates, newEstimate]);
    setService("");
    setQuantity("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Estimasi Harga Layanan</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="mb-4">
          <label className="block font-medium mb-1">Pilih Jenis Layanan</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Pilih Layanan --</option>
            {Object.keys(servicePrices).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Jumlah Pakaian</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan jumlah pakaian"
            min={1}
          />
        </div>

        <button
          onClick={handleEstimate}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Hitung Estimasi
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Riwayat Estimasi</h2>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Layanan</th>
              <th className="px-4 py-2 text-left">Jumlah</th>
              <th className="px-4 py-2 text-left">Total (Rp)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {estimates.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.service}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">Rp{item.total.toLocaleString("id-ID")}</td>
              </tr>
            ))}
            {estimates.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center px-4 py-4 text-gray-500">
                  Belum ada estimasi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
