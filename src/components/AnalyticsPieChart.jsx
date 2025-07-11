// File: components/AnalyticsPieChart.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Sesuaikan path jika perlu
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Warna untuk setiap potongan Pie Chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function AnalyticsPieChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      setLoading(true);
      
      // 1. Ambil semua data dari tabel recommendation_logs
      const { data, error } = await supabase
        .from("recommendation_logs")
        .select("rekomendasi_final");

      if (error) {
        console.error("Gagal mengambil data log:", error.message);
        setLoading(false);
        return;
      }

      // 2. Proses data untuk menghitung setiap layanan
      const serviceCounts = {};
      data.forEach((log) => {
        // 'log.rekomendasi_final' adalah array, contoh: ["BriteWhite", "Bio StainRemoval"]
        if (Array.isArray(log.rekomendasi_final)) {
          log.rekomendasi_final.forEach((serviceName) => {
            serviceCounts[serviceName] = (serviceCounts[serviceName] || 0) + 1;
          });
        }
      });
      
      // 3. Ubah format data agar sesuai dengan kebutuhan Recharts PieChart
      const formattedData = Object.entries(serviceCounts).map(([name, value]) => ({
        name,
        value,
      }));

      setChartData(formattedData);
      setLoading(false);
    };

    fetchAndProcessData();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Memuat data chart...</div>;
  }
  
  if (chartData.length === 0) {
      return <div className="text-center p-4">Belum ada data untuk ditampilkan.</div>
  }

  return (
    <div className="bg-white p-4 shadow rounded-lg w-full h-96">
        <h3 className="text-lg font-semibold mb-2 text-center">Popularitas Layanan Berdasarkan Rekomendasi</h3>
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
  );
}