import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Truck } from "lucide-react";

export default function Delivery() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Gagal ambil pesanan:", error.message);
        } else {
          setOrders(data);
        }
      }
    };

    fetchOrders();
  }, []);
  
  // Fungsi untuk memformat angka menjadi format Rupiah (Rp)
  const formatCurrency = (number) => {
    if (number === null || isNaN(number)) {
      return "-"; // Tampilkan strip jika harga null atau bukan angka
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0, // Tidak menampilkan angka desimal
    }).format(number);
  };

  const batalkanPesanan = async (id) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: "Batal" })
      .eq("id", id);

    if (error) {
      alert("Gagal membatalkan pesanan");
    } else {
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status: "Batal" } : order))
      );
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Truck className="text-blue-600" size={24} />
          Riwayat Pemesanan Anda
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Layanan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alamat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metode</th>
              {/* --- TAMBAHKAN HEADER BARU UNTUK HARGA --- */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Harga</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status Pembayaran</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{new Date(order.created_at).toLocaleDateString("id-ID")}</td>
                <td className="px-6 py-4 text-sm">
                   {/* Tampilkan layanan sebagai string yang dipisah koma */}
                   {Array.isArray(order.layanan) ? order.layanan.join(", ") : order.layanan}
                </td>
                <td className="px-6 py-4 text-sm">{order.alamat}</td>
                <td className="px-6 py-4 text-sm">{order.metode_pembayaran || "-"}</td>
                
                {/* --- TAMBAHKAN SEL BARU UNTUK MENAMPILKAN HARGA --- */}
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatCurrency(order.total_harga)}
                </td>

                <td className="px-6 py-4 text-sm">{order.status_pembayaran || "-"}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.status === "Selesai" ? "bg-green-100 text-green-800"
                    : order.status === "Batal" ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.status || "Dalam Proses"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {order.status === "Dalam Proses" && (
                    <button
                      onClick={() => batalkanPesanan(order.id)}
                      className="text-red-600 hover:underline text-xs"
                    >
                      Batalkan
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                {/* --- SESUAIKAN COLSPAN KARENA ADA TAMBAHAN 1 KOLOM --- */}
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500 text-sm">
                  Belum ada riwayat pemesanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}