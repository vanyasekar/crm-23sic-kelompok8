import React, { useState } from "react";
import { Truck, Plus, Edit, Trash2, Check, X } from "lucide-react";

// Data contoh delivery laundry
const initialLaundryDeliveries = [
  {
    id: 1,
    orderNumber: "LND-001",
    customerName: "Budi Santoso",
    phone: "08123456789",
    address: "Jl. Sudirman No. 123, Jakarta",
    deliveryDate: "2023-07-20",
    pickupTime: "09:00-12:00",
    status: "Dalam Proses",
    items: [
      { name: "Kemeja", quantity: 3, service: "Cuci Setrika", price: 15000 },
      { name: "Celana", quantity: 2, service: "Cuci Kering", price: 20000 }
    ],
    notes: "Pintu belakang, nomor rumah hijau"
  },
  {
    id: 2,
    orderNumber: "LND-002",
    customerName: "Ani Wijaya",
    phone: "08234567890",
    address: "Apartemen Senopati Tower A Lantai 10",
    deliveryDate: "2023-07-21",
    pickupTime: "13:00-17:00",
    status: "Selesai",
    items: [
      { name: "Bed Cover", quantity: 1, service: "Dry Clean", price: 45000 }
    ],
    notes: "Tinggal di depan satpam"
  }
];

// Format harga laundry
function formatLaundryPrice(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(num);
}

export default function Delivery() {
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
          Manajemen Pengantaran Laundry
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Tambah Pengantaran
        </button>
      </div>

      {/* Form Tambah Pengantaran */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Tambah Pengantaran Laundry</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1 font-medium">Nomor Order</label>
                  <input
                    type="text"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Tanggal Pengantaran</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1 font-medium">Nama Pelanggan</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Nama lengkap pelanggan"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">No. Telepon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="08123456789"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Alamat Lengkap</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows={3}
                  placeholder="Alamat lengkap termasuk patokan"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1 font-medium">Waktu Jemput</label>
                  <select
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="09:00-12:00">Pagi (09:00 - 12:00)</option>
                    <option value="13:00-17:00">Siang (13:00 - 17:00)</option>
                    <option value="18:00-21:00">Malam (18:00 - 21:00)</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Dalam Proses">Dalam Proses</option>
                    <option value="Dalam Perjalanan">Dalam Perjalanan</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Batal">Batal</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Item Laundry</label>
                {formData.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                    <div className="col-span-5">
                      <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, e)}
                        className="w-full p-2 border rounded"
                        placeholder="Nama item (ex: Kemeja)"
                        required
                      />
                    </div>
                    <div className="col-span-3">
                      <select
                        name="service"
                        value={item.service}
                        onChange={(e) => handleItemChange(index, e)}
                        className="w-full p-2 border rounded"
                      >
                        <option value="Cuci Setrika">Cuci Setrika</option>
                        <option value="Cuci Kering">Cuci Kering</option>
                        <option value="Dry Clean">Dry Clean</option>
                        <option value="Setrika Saja">Setrika Saja</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, e)}
                        className="w-full p-2 border rounded"
                        min="1"
                        required
                      />
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => removeLaundryItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLaundryItem}
                  className="mt-2 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  + Tambah Item
                </button>
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Catatan</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows={2}
                  placeholder="Catatan khusus untuk kurir"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveDelivery}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Simpan Pengantaran
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabel Data Pengantaran */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pelanggan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alamat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">{delivery.orderNumber}</div>
                  <div className="text-xs text-gray-500">{delivery.pickupTime}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{delivery.customerName}</div>
                  <div className="text-sm text-gray-500">{delivery.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="max-w-xs truncate">{delivery.address}</div>
                  {delivery.notes && (
                    <div className="text-xs text-gray-500 mt-1">Note: {delivery.notes}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(delivery.deliveryDate).toLocaleDateString('id-ID')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    delivery.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                    delivery.status === 'Batal' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {delivery.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                  {formatLaundryPrice(calculateTotal(delivery.items))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleUpdateStatus(delivery.id, 'Selesai')}
                      className="text-green-600 hover:text-green-800 p-1"
                      title="Tandai Selesai"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(delivery.id, 'Batal')}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Batalkan"
                    >
                      <X size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteDelivery(delivery.id)}
                      className="text-gray-600 hover:text-gray-800 p-1"
                      title="Hapus"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {deliveries.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  Belum ada data pengantaran
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}