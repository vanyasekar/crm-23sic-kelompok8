import { useEffect, useState, useMemo } from "react";
import { supabase } from "../../supabaseClient";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DollarSign, Users, ShoppingCart } from 'lucide-react';

// Registrasi elemen chart
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [allOrders, setAllOrders] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [dateRange, setDateRange] = useState('30d'); // Opsi: '7d', '30d', 'all'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Ambil semua data pesanan sekali saja
      const { data: ordersData, error: ordersError } = await supabase.from("orders").select("total_harga, created_at, status_pembayaran, layanan");
      if (ordersError) console.error("Gagal mengambil data pesanan:", ordersError);
      
      // Ambil jumlah total pengguna
      const { count: userCount, error: userError } = await supabase.from("profiles").select('id', { count: 'exact' });
      if (userError) console.error("Gagal mengambil data user:", userError);

      setAllOrders(ordersData || []);
      setTotalUser(userCount || 0);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Gunakan useMemo untuk memproses data setiap kali filter berubah
  // Ini lebih efisien daripada mengambil ulang data dari Supabase
  const processedData = useMemo(() => {
    if (!allOrders.length) {
      return { totalPendapatan: 0, jumlahOrder: 0, layananPopuler: [] };
    }

    const now = new Date();
    let startDate = new Date(0); // Default untuk 'semua'

    if (dateRange === '7d') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);
      startDate = sevenDaysAgo;
    } else if (dateRange === '30d') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      startDate = thirtyDaysAgo;
    }

    const filteredOrders = allOrders.filter(o => new Date(o.created_at) >= startDate);

    const totalPendapatan = filteredOrders
      .filter(o => o.status_pembayaran === 'Sudah Dibayar')
      .reduce((sum, order) => sum + (order.total_harga || 0), 0);

    const jumlahOrder = filteredOrders.length;
    
    const layananCount = {};
    filteredOrders.forEach(order => {
      if (Array.isArray(order.layanan)) {
        order.layanan.forEach(service => {
          layananCount[service] = (layananCount[service] || 0) + 1;
        });
      }
    });

    const layananPopuler = Object.entries(layananCount).map(([name, value]) => ({ name, value }));

    return { totalPendapatan, jumlahOrder, layananPopuler };
  }, [allOrders, dateRange]);


  // Konfigurasi untuk Pie Chart
  const pieData = {
    labels: processedData?.layananPopuler.map(d => d.name) || [],
    datasets: [{
      data: processedData?.layananPopuler.map(d => d.value) || [],
      backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444"],
      hoverOffset: 4
    }],
  };
  
  if (loading) return <div className="p-6 text-center">Memuat data dashboard...</div>;
  
  const getFilterLabel = () => {
      if(dateRange === '7d') return '7 Hari Terakhir';
      if(dateRange === '30d') return '30 Hari Terakhir';
      return 'Semua Waktu';
  }

  return (
    <div className="p-6 bg-gray-50 space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Utama</h1>
        
        {/* Filter Tanggal dengan Gaya Tombol */}
        <div className="flex items-center bg-white p-1 rounded-lg shadow-sm border">
          <button onClick={() => setDateRange('7d')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${dateRange === '7d' ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}>7 Hari</button>
          <button onClick={() => setDateRange('30d')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${dateRange === '30d' ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}>30 Hari</button>
          <button onClick={() => setDateRange('all')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${dateRange === 'all' ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}>Semua</button>
        </div>
      </div>

      {/* Kartu Statistik Ringkas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Pendapatan ({getFilterLabel()})</p>
            <p className="text-2xl font-bold text-green-600">Rp {processedData.totalPendapatan.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Pesanan ({getFilterLabel()})</p>
            <p className="text-2xl font-bold text-blue-600">{processedData.jumlahOrder}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Pengguna</p>
            <p className="text-2xl font-bold text-purple-600">{totalUser}</p>
        </div>
      </div>
      
      {/* Container Chart Layanan Populer */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-center">Layanan Populer ({getFilterLabel()})</h3>
          <div className="w-full max-w-sm h-80">
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
      </div>
    </div>
  );
}