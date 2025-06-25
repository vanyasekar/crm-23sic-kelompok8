import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function OrderForm() {
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    email: "",
    alamat: "",
    layanan: "",
    catatan: "",
    metode_pembayaran: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Anda harus login terlebih dahulu.");
      return;
    }

    const { error } = await supabase.from("orders").insert([
      {
        user_id: userId,
        ...form,
        status_pembayaran: "Belum dibayar",
        total_harga: null,
        created_at: new Date()
      },
    ]);

    if (error) {
      alert("Gagal mengirim pesanan: " + error.message);
    } else {
      alert("Pesanan berhasil dikirim!");
      setForm({
        nama: "",
        telepon: "",
        email: form.email,
        alamat: "",
        layanan: "",
        catatan: "",
        metode_pembayaran: "",
      });
    }
  };

  return (
    <section id="order" className="max-w-3xl mx-auto my-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Form Pemesanan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block text-sm mb-1">Pilih Layanan</label>
          <select name="layanan" value={form.layanan} onChange={handleChange} className="w-full px-4 py-2 border rounded">
            <option>Color Care</option>
            <option>Green Dry Clean</option>
            <option>Antibacterial Guard</option>
          </select>
        </div>
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
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl">
          Kirim Pesanan
        </button>
      </form>
    </section>
  );
}
