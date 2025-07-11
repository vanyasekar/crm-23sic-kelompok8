import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import AnalyticsPieChart from "../../components/AnalyticsPieChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [totalPendapatan, setTotalPendapatan] = useState(0);
  const [jumlahUser, setJumlahUser] = useState(0);
  const [jumlahOrder, setJumlahOrder] = useState(0);
  const [dataBulanan, setDataBulanan] = useState([]);
  const [dataUserBulanan, setDataUserBulanan] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Ambil total pendapatan dari order yang sudah dibayar hari ini
    const { data: pendapatanData, error: pendapatanError } = await supabase
      .from("orders")
      .select("total_harga, created_at")
      .eq("status_pembayaran", "Sudah Dibayar");

    if (!pendapatanError) {
      const today = new Date().toISOString().slice(0, 10);
      const pendapatanHariIni = pendapatanData
        .filter((d) => d.created_at.startsWith(today))
        .reduce((sum, order) => sum + parseFloat(order.total_harga || "0"), 0)
      setTotalPendapatan(pendapatanHariIni);
    }

    // Ambil jumlah user
    const { data: userData } = await supabase.from("profiles").select("id");
    setJumlahUser(userData.length);

    // Ambil jumlah order hari ini
    const { data: orderData } = await supabase.from("orders").select("*");
    setJumlahOrder(
      orderData.filter((o) =>
        o.created_at.startsWith(new Date().toISOString().slice(0, 10))
      ).length
    );

    // Data penjualan bulanan
    const bulan = Array.from({ length: 12 }, (_, i) => i + 1);
    const penjualanBulanan = bulan.map((b) => {
      const ordersInMonth = orderData.filter(
        (o) => new Date(o.created_at).getMonth() + 1 === b
      );
      return ordersInMonth.reduce(
        (total, o) => total + (o.total_harga || 0),
        0
      );
    });

    setDataBulanan(penjualanBulanan);

    // Data user bulanan (jika ingin ditambahkan)
    const userBulanan = bulan.map((b) => {
      const usersInMonth = userData.filter(
        (u) => new Date(u.created_at).getMonth() + 1 === b
      );
      return usersInMonth.length;
    });

    setDataUserBulanan(userBulanan);
  };

  const stats = [
    {
      label: "Pendapatan Hari Ini",
      value: `Rp ${totalPendapatan.toLocaleString("id-ID")}`,
      percent: "+10%",
      color: "green",
    },
    {
      label: "Pengguna Hari Ini",
      value: `${jumlahUser}`,
      percent: "+3%",
      color: "blue",
    },
    {
      label: "Klien Baru",
      value: "+3",
      percent: "-2%",
      color: "red",
    },
    {
      label: "Order Hari Ini",
      value: `${jumlahOrder}`,
      percent: "+5%",
      color: "purple",
    },
  ];

  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    datasets: [
      {
        label: "Penjualan (Rp)",
        data: dataBulanan,
        backgroundColor: "rgba(99, 102, 241, 0.7)", // purple-600
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Penjualan Bulanan Tahun Ini" },
    },
  };

  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    datasets: [
      {
        label: "Pendaftaran Pengguna",
        data: dataUserBulanan,
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Pertumbuhan Pengguna Tahun Ini" },
    },
  };

  return (
    <div className="space-y-12">
      {/* Statistik Ringkas */}
      <div className="px-6 space-y-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">Statistik Hari Ini</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ label, value, percent, color }) => (
            <div
              key={label}
              className="bg-white rounded-xl shadow p-5 border border-gray-100"
            >
              <p className="text-sm text-gray-500">{label}</p>
              <h2
                className={`text-2xl font-bold text-${color}-600 flex items-center gap-2`}
              >
                {value}
                <span className={`text-xs font-semibold text-${color}-500`}>
                  {percent}
                </span>
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Grafik */}
      <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6">
          <Bar options={barOptions} data={barData} />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <Line options={lineOptions} data={lineData} />
        </div>
      </div>
      <AnalyticsPieChart/>
    </div>
    
  );
}
