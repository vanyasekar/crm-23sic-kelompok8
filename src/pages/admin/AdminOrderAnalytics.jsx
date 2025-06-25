import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminOrderAnalytics() {
  const [orders, setOrders] = useState([]);
  const [layananData, setLayananData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) {
        console.error(error.message);
        return;
      }

      setOrders(data);
      processAnalytics(data);
    };

    fetchOrders();
  }, []);

  const processAnalytics = (data) => {
    const layananCount = {};
    const statusCount = {};

    data.forEach((order) => {
      layananCount[order.layanan] = (layananCount[order.layanan] || 0) + 1;
      const status = order.status || "Dalam Proses";
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    setLayananData(
      Object.entries(layananCount).map(([layanan, count]) => ({ layanan, count }))
    );
    setStatusData(
      Object.entries(statusCount).map(([status, count]) => ({ status, count }))
    );
  };

  const updateOrder = async (id, field, value) => {
    const { error } = await supabase.from("orders").update({ [field]: value }).eq("id", id);

    if (!error) {
      const updatedOrders = orders.map((order) =>
        order.id === id ? { ...order, [field]: value } : order
      );
      setOrders(updatedOrders);
      processAnalytics(updatedOrders);
    } else {
      alert(`Gagal update ${field}: ` + error.message);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Analisis & Manajemen Pemesanan</h2>

      {/* Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-2">Layanan Paling Populer</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={layananData}>
              <XAxis dataKey="layanan" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold mb-2">Status Pesanan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">Manajemen Pesanan</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">Nama</th>
                <th className="px-3 py-2 text-left">Layanan</th>
                <th className="px-3 py-2 text-left">Metode Pembayaran</th>
                <th className="px-3 py-2 text-left">Total Harga</th>
                <th className="px-3 py-2 text-left">Status Pembayaran</th>
                <th className="px-3 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-3 py-2">{order.nama}</td>
                  <td className="px-3 py-2">{order.layanan}</td>
                  <td className="px-3 py-2">{order.metode_pembayaran || "-"}</td>

                  {/* Total Harga */}
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      className="w-24 border px-2 py-1 rounded"
                      value={order.total_harga || ""}
                      onChange={(e) => updateOrder(order.id, "total_harga", Number(e.target.value))}
                    />
                  </td>

                  {/* Status Pembayaran */}
                  <td className="px-3 py-2">
                    <select
                      className="border px-2 py-1 rounded"
                      value={order.status_pembayaran || "Belum Dibayar"}
                      onChange={(e) =>
                        updateOrder(order.id, "status_pembayaran", e.target.value)
                      }
                    >
                      <option value="Belum Dibayar">Belum Dibayar</option>
                      <option value="Sudah Dibayar">Sudah Dibayar</option>
                    </select>
                  </td>

                  {/* Status Pemesanan */}
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
