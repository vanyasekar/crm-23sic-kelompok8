import { useEffect, useState, useMemo } from "react";
import { supabase } from "../../supabaseClient";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from "chart.js";
import { Download, Users, DollarSign, UserCheck, UserPlus, TrendingUp } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

// Komponen Kartu Statistik
function StatCard({ title, value, icon }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">{icon}</div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">{title}</p>
                    <p className="text-2xl font-bold text-gray-800">{value}</p>
                </div>
            </div>
        </div>
    );
}

export default function AdminOrderAnalytics() {
    // --- STATE ---
    const [orders, setOrders] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState('30d');

    // --- DATA FETCHING ---
    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            const { data: orderData } = await supabase.from("orders").select("user_id, total_harga, created_at, nama, layanan");
            const { data: serviceData } = await supabase.from("services").select("name, price");
            setOrders(orderData || []);
            setServices(serviceData || []);
            setLoading(false);
        };
        fetchAllData();
    }, []);

    // --- DATA PROCESSING ---
    const analyticsData = useMemo(() => {
        if (!orders.length) return null;

        const priceMap = services.reduce((acc, service) => { acc[service.name] = service.price || 0; return acc; }, {});
        const now = new Date();
        let startDate = new Date(0);

        if (dateRange === '7d') startDate.setDate(now.getDate() - 7);
        else if (dateRange === '30d') startDate.setDate(now.getDate() - 30);
        
        const filteredOrders = orders.filter(o => new Date(o.created_at) >= startDate);

        // Kalkulasi KPI
        const totalPendapatan = filteredOrders.reduce((sum, order) => sum + (order.total_harga || 0), 0);
        const avgPendapatan = filteredOrders.length > 0 ? totalPendapatan / filteredOrders.length : 0;
        
        const firstOrderDateByUserId = orders.reduce((acc, order) => { if (!acc[order.user_id] || new Date(order.created_at) < new Date(acc[order.user_id])) { acc[order.user_id] = order.created_at; } return acc; }, {});
        let newCustomerOrders = 0;
        let returningCustomerOrders = 0;
        
        const revenueByDay = {};
        const layananPopulerCount = {};
        const layananMenguntungkanCount = {};
        const userOrderCounts = {};

        filteredOrders.forEach(order => {
            const orderDay = new Date(order.created_at).toISOString().split('T')[0];
            const firstOrderDay = new Date(firstOrderDateByUserId[order.user_id]).toISOString().split('T')[0];

            if (orderDay === firstOrderDay) newCustomerOrders++; else returningCustomerOrders++;
            revenueByDay[orderDay] = (revenueByDay[orderDay] || 0) + (order.total_harga || 0);
            userOrderCounts[order.nama] = (userOrderCounts[order.nama] || 0) + 1;

            if (Array.isArray(order.layanan)) {
                order.layanan.forEach(serviceName => {
                    layananPopulerCount[serviceName] = (layananPopulerCount[serviceName] || 0) + 1;
                    layananMenguntungkanCount[serviceName] = (layananMenguntungkanCount[serviceName] || 0) + (priceMap[serviceName] || 0);
                });
            }
        });

        // Format data untuk chart
        const sortedRevenueByDay = Object.entries(revenueByDay).sort(([a], [b]) => new Date(a) - new Date(b));
        const chartLabels = sortedRevenueByDay.map(([date]) => new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }));
        const chartRevenueData = sortedRevenueByDay.map(([, revenue]) => revenue);

        const layananPopuler = Object.entries(layananPopulerCount).sort(([, a], [, b]) => b - a).slice(0, 5).map(([name, value]) => ({ name, value }));
        const layananMenguntungkan = Object.entries(layananMenguntungkanCount).sort(([, a], [, b]) => b - a).slice(0, 5).map(([name, value]) => ({ name, value }));
        const penggunaAktif = Object.entries(userOrderCounts).sort(([, a], [, b]) => b - a).slice(0, 5);

        return { kpi: { totalPendapatan, avgPendapatan, newCustomerOrders, returningCustomerOrders }, charts: { chartLabels, chartRevenueData, layananPopuler, layananMenguntungkan }, penggunaAktif, laporanData: filteredOrders };
    }, [orders, services, dateRange]);

    // --- Fungsi Ekspor & Konfigurasi Chart ---
    const exportToCsv = () => { /* ... fungsi sama seperti sebelumnya ... */ };
    const lineData = { labels: analyticsData?.charts.chartLabels, datasets: [{ label: "Pendapatan Harian", data: analyticsData?.charts.chartRevenueData, borderColor: "#4F46E5", backgroundColor: "#C7D2FE", fill: true, tension: 0.3 }] };
    const popularServiceData = { labels: analyticsData?.charts.layananPopuler.map(d => d.name), datasets: [{ label: 'Jumlah Pesanan', data: analyticsData?.charts.layananPopuler.map(d => d.value), backgroundColor: '#3B82F6' }] };
    const profitableServiceData = { labels: analyticsData?.charts.layananMenguntungkan.map(d => d.name), datasets: [{ label: 'Total Pendapatan', data: analyticsData?.charts.layananMenguntungkan.map(d => d.value), backgroundColor: '#10B981' }] };

    if (loading) return <div className="p-6 text-center">Memuat data analitik...</div>;

    return (
        <div className="p-6 bg-gray-50 space-y-6">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Analitik & Laporan Detail</h1>
                <div className="flex items-center gap-4">
                    <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="bg-white p-2 text-sm rounded-lg shadow-sm border focus:outline-none">
                        <option value="7d">7 Hari Terakhir</option>
                        <option value="30d">30 Hari Terakhir</option>
                        <option value="all">Semua Waktu</option>
                    </select>
                    <button onClick={exportToCsv} className="flex items-center gap-2 text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"><Download size={16}/> Unduh Laporan</button>
                </div>
            </div>

            {/* KPI Cards Lengkap */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Pendapatan" value={`Rp ${analyticsData?.kpi.totalPendapatan.toLocaleString('id-ID') || 0}`} icon={<DollarSign size={20}/>} />
                <StatCard title="Rata-rata per Pesanan" value={`Rp ${analyticsData?.kpi.avgPendapatan.toLocaleString('id-ID', {maximumFractionDigits: 0}) || 0}`} icon={<TrendingUp size={20}/>} />
                <StatCard title="Pesanan Pelanggan Baru" value={analyticsData?.kpi.newCustomerOrders || 0} icon={<UserPlus size={20}/>} />
                <StatCard title="Pesanan Pelanggan Kembali" value={analyticsData?.kpi.returningCustomerOrders || 0} icon={<UserCheck size={20}/>} />
            </div>

            {/* Grafik Tren Pendapatan */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Grafik Tren Pendapatan Harian</h3>
                <div className="h-80"><Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }}/></div>
            </div>

            {/* Grid untuk Chart Perbandingan dan Pengguna Aktif */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Layanan Paling Populer (by Order)</h3>
                    <div className="h-80"><Bar data={popularServiceData} options={{ responsive: true, maintainAspectRatio: false }} /></div>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Layanan Paling Menguntungkan (by Revenue)</h3>
                    <div className="h-80"><Bar data={profitableServiceData} options={{ responsive: true, maintainAspectRatio: false }} /></div>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Pengguna Paling Aktif</h3>
                    <ul className="space-y-4">
                        {(analyticsData?.penggunaAktif || []).map(([name, count]) => (
                            <li key={name} className="flex items-center justify-between">
                                <span className="font-medium text-sm">{name}</span>
                                <span className="text-sm font-bold">{count}x Pesan</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}