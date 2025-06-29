// File: pages/AdminPesanan.jsx
import { useOrders } from "../../hooks/useOrders"; // Import custom hook

export default function AdminPesanan() {
  // Panggil hook, tapi kita hanya butuh data order, fungsi update, dan status loading
  const { orders, loading, updateOrder } = useOrders();

  if (loading) {
    return <div className="p-6 text-center">Memuat data pesanan...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manajemen Pesanan</h1>
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">Nama</th>
                <th className="px-3 py-2 text-left">Layanan</th>
                <th className="px-3 py-2 text-left">Metode Pembayaran</th>
                <th className="px-3 py-2 text-left">Total Harga</th>
                <th className="px-3 py-2 text-left">Status Pembayaran</th>
                <th className="px-3 py-2 text-left">Status Pesanan</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium">{order.nama}</td>
                  <td className="px-3 py-2">
                    {Array.isArray(order.layanan) ? order.layanan.join(", ") : order.layanan}
                  </td>
                  <td className="px-3 py-2">{order.metode_pembayaran || "-"}</td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      className="w-24 border px-2 py-1 rounded"
                      defaultValue={order.total_harga || ""}
                      onBlur={(e) => updateOrder(order.id, "total_harga", Number(e.target.value))}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <select
                      className="border px-2 py-1 rounded"
                      value={order.status_pembayaran || "Belum Dibayar"}
                      onChange={(e) => updateOrder(id, "status_pembayaran", e.target.value)}
                    >
                      <option value="Belum Dibayar">Belum Dibayar</option>
                      <option value="Sudah Dibayar">Sudah Dibayar</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <select
                      className="border px-2 py-1 rounded"
                      value={order.status || "Dalam Proses"}
                      onChange={(e) => updateOrder(order.id, "status", e.target.value)}
                    >
                      <option value="Dalam Proses">Dalam Proses</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Batal">Batal</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    Tidak ada data pesanan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}