import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Truck } from "lucide-react";

export default function LaundryDelivery() {
  const [deliveries, setDeliveries] = useState(initialLaundryDeliveries);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    orderNumber: `LND-${Math.floor(100 + Math.random() * 900)}`,
    customerName: "",
    phone: "",
    address: "",
    deliveryDate: new Date().toISOString().split('T')[0],
    pickupTime: "09:00-12:00",
    status: "Dalam Proses",
    items: [{ name: "", service: "Cuci Setrika", quantity: 1, price: 0 }],
    notes: ""
  });

  // Handle perubahan form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle perubahan item laundry
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [name]: value };
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  // Tambah item laundry
  const addLaundryItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: "", service: "Cuci Setrika", quantity: 1, price: 0 }]
    }));
  };

  // Hapus item laundry
  const removeLaundryItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  // Hitung total harga
  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Simpan data delivery
  const handleSaveDelivery = () => {
    if (!formData.customerName || !formData.phone || !formData.address) {
      alert("Harap isi data pelanggan dengan lengkap");
      return;
    }

    const newDelivery = {
      ...formData,
      id: deliveries.length + 1,
      items: formData.items.filter(item => item.name && item.service)
    };

    setDeliveries([...deliveries, newDelivery]);
    resetForm();
    setShowForm(false);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      orderNumber: `LND-${Math.floor(100 + Math.random() * 900)}`,
      customerName: "",
      phone: "",
      address: "",
      deliveryDate: new Date().toISOString().split('T')[0],
      pickupTime: "09:00-12:00",
      status: "Dalam Proses",
      items: [{ name: "", service: "Cuci Setrika", quantity: 1, price: 0 }],
      notes: ""
    });
  };

  // Hapus delivery
  const handleDeleteDelivery = (id) => {
    if (window.confirm("Hapus data pengantaran ini?")) {
      setDeliveries(deliveries.filter(d => d.id !== id));
    }
  };

  // Update status delivery
  const handleUpdateStatus = (id, newStatus) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { ...d, status: newStatus } : d
    ));
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status Pembayaran</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{new Date(order.created_at).toLocaleDateString("id-ID")}</td>
                <td className="px-6 py-4 text-sm">{order.layanan}</td>
                <td className="px-6 py-4 text-sm">{order.alamat}</td>
                <td className="px-6 py-4 text-sm">{order.metode_pembayaran || "-"}</td>
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
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500 text-sm">
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
