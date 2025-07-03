import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function OrderForm() {
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    email: "",
    alamat: "",
    layanan: "WetClean", // Nilai default untuk layanan utama
    addons: [], // <-- LANGKAH 1: Tambahkan state untuk menampung add-on (array)
    catatan: "",
    metode_pembayaran: "COD",
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        setForm((prev) => ({
          ...prev,
          email: user.email || "",
        }));
      }
    };

    getUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  
  // --- LANGKAH 2: Buat fungsi khusus untuk menangani perubahan pada checkbox ---
  const handleAddonChange = (e) => {
    const { value, checked } = e.target;
    const { addons } = form;

    // Jika checkbox dicentang, tambahkan nilainya ke array 'addons'
    if (checked) {
      setForm({ ...form, addons: [...addons, value] });
    } 
    // Jika centang dihilangkan, hapus nilainya dari array 'addons'
    else {
      setForm({ ...form, addons: addons.filter((addon) => addon !== value) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Anda harus login terlebih dahulu.");
      return;
    }

    // --- LANGKAH 3: Gabungkan layanan utama dan add-on sebelum dikirim ---
    // Hasilnya akan menjadi array, contoh: ["ColorCare", "Bio StainRemoval"]
    const layanan_lengkap = [form.layanan, ...form.addons];

    const { error } = await supabase.from("orders").insert([
      {
        user_id: userId,
        nama: form.nama,
        telepon: form.telepon,
        email: form.email,
        alamat: form.alamat,
        layanan: layanan_lengkap, // Kirim array layanan yang sudah digabung
        catatan: form.catatan,
        metode_pembayaran: form.metode_pembayaran,
        status_pembayaran: "Belum dibayar",
        total_harga: null,
        created_at: new Date(),
      },
    ]);

    if (error) {
      alert("Gagal mengirim pesanan: " + error.message);
    } else {
      alert("Pesanan berhasil dikirim!");
      // --- LANGKAH 4: Reset form, termasuk array 'addons' ---
      setForm({
        nama: "",
        telepon: "",
        email: form.email,
        alamat: "",
        layanan: "WetClean",
        addons: [], // Reset addons
        catatan: "",
        metode_pembayaran: "COD",
      });
    }
  };

  return (
    <section id="order" className="max-w-3xl mx-auto my-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Form Pemesanan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... form input untuk nama, telepon, email, alamat tidak berubah ... */}
        <div>
          <label className="block text-sm mb-1">Nama Lengkap</label>
          <input type="text" name="nama" value={form.nama} onChange={handleChange} required className="w-full px-4 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm mb-1">No. Telepon</label>
          <input type="tel" name="telepon" value={form.telepon} onChange={handleChange} required className="w-full px-4 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" name="email" value={form.email} disabled className="w-full px-4 py-2 border rounded bg-gray-100" />
        </div>
        <div>
          <label className="block text-sm mb-1">Alamat</label>
          <input type="text" name="alamat" value={form.alamat} onChange={handleChange} required className="w-full px-4 py-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm mb-1">Pilih Layanan Utama</label>
          <select name="layanan" value={form.layanan} onChange={handleChange} className="w-full px-4 py-2 border rounded">
            <option value="WetClean">Wet Clean</option>
            <option value="GreenDryCleanning">Green Dry Cleanning</option>
          </select>
        </div>

        {/* --- LANGKAH 5: Tambahkan elemen checkbox untuk add-on di dalam form --- */}
        <div>
          <label className="block text-sm mb-1">Layanan Tambahan (Add-on)</label>
          <div className="space-y-2 mt-2 p-3 bg-gray-50 rounded-md">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="addons"
                value="Color Care"
                checked={form.addons.includes("Color Care")}
                onChange={handleAddonChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Color Care</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="addons"
                value="Brite White"
                checked={form.addons.includes("Brite White")}
                onChange={handleAddonChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Brite White</span>
            </label>
          </div>
        </div>
        
        {/* ... form input untuk metode pembayaran dan catatan tidak berubah ... */}
        <div>
          <label className="block text-sm mb-1">Metode Pembayaran</label>
          <select name="metode_pembayaran" value={form.metode_pembayaran} onChange={handleChange} className="w-full px-4 py-2 border rounded">
            <option value="COD">COD (Bayar di Tempat)</option>
            <option value="Transfer Bank">Transfer Bank</option>
            <option value="QRIS">QRIS</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Catatan Tambahan</label>
          <textarea name="catatan" value={form.catatan} onChange={handleChange} rows="3" className="w-full px-4 py-2 border rounded" />
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl w-full">
          Kirim Pesanan
        </button>
      </form>
    </section>
  );
}