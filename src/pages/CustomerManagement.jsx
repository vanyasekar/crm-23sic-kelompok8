import React, { useState } from "react";

// Data awal
const initialCustomers = [
  {
    id: 1,
    name: "Budi Santoso",
    address: "Jl. Merdeka No. 10",
    phone: "081234567890",
    transactions: [{ service: "Color care", date: "2025-06-01" }],
  },
  {
    id: 2,
    name: "Siti Aminah",
    address: "Jl. Sudirman No. 25",
    phone: "089876543210",
    transactions: [{ service: "Antibacterial Guard", date: "2025-06-05" }],
  },
];

export default function CustomerManagement() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    service: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCustomer = () => {
    const { name, address, phone, service } = formData;
    if (!name || !address || !phone || !service) {
      alert("Semua field wajib diisi!");
      return;
    }

    const newCustomer = {
      id: customers.length + 1,
      name,
      address,
      phone,
      transactions: [
        {
          service,
          date: new Date().toISOString().slice(0, 10), // format YYYY-MM-DD
        },
      ],
    };

    setCustomers([...customers, newCustomer]);
    setFormData({ name: "", address: "", phone: "", service: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus pelanggan ini?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Manajemen Pelanggan</h1>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showForm ? "Batal Tambah Pelanggan" : "Tambah Pelanggan"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded shadow-sm bg-white">
          <div className="mb-2">
            <label className="block font-medium mb-1">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nama pelanggan"
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-1">Alamat</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Alamat pelanggan"
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-1">No HP</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Nomor HP"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Jenis Layanan</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">-- Pilih Layanan --</option>
              <option value="Color care">Color care</option>
              <option value="Green Clean">Green Clean</option>
              <option value="Antibacterial Guard">Antibacterial Guard</option>
            </select>
          </div>
          <button
            onClick={handleAddCustomer}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Simpan
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alamat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No HP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Riwayat Transaksi</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((cust) => (
              <tr key={cust.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{cust.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{cust.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{cust.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {cust.transactions.map((tx, idx) => (
                      <li key={idx}>{tx.service} ({tx.date})</li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-900 font-semibold"
                    onClick={() => alert("Fitur Edit belum tersedia")}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 font-semibold"
                    onClick={() => handleDelete(cust.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Tidak ada data pelanggan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
