import React from 'react'
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
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { Link } from 'react-router-dom'

import Hero from "../components/Hero"
import OrderForm from "../components/OrderForm"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const stats = [
    { label: "Pendapatan Hari Ini", value: "$53,000", percent: "+55%", color: "green" },
    { label: "Pengguna Hari Ini", value: "2,300", percent: "+3%", color: "blue" },
    { label: "Klien Baru", value: "+3,462", percent: "-2%", color: "red" },
    { label: "Penjualan", value: "$103,430", percent: "+5%", color: "purple" },
  ]

  const layanan = [
    { nama: "Color Care", slug: "color-care" },
    { nama: "Green Clean", slug: "green-clean" },
    { nama: "Antibacterial Guard", slug: "antibacterial-guard" }
  ]

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Penjualan (dalam ribuan $)",
        data: [12, 19, 14, 17, 22, 30, 28, 26, 32, 35, 40, 45],
        backgroundColor: "rgba(99, 102, 241, 0.7)", // purple-600
      },
    ],
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Penjualan Bulanan Tahun Ini' },
    },
  }

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Jumlah Pelanggan",
        data: [50, 75, 120, 180, 220, 260, 300, 350, 400, 430, 460, 500],
        borderColor: "rgba(59, 130, 246, 1)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  }

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Pertumbuhan Pelanggan Tahun Ini' },
    },
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <Hero />

      {/* Statistik Ringkas */}
      <div className="px-6 space-y-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">Statistik Hari Ini</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ label, value, percent, color }) => (
            <div key={label} className="bg-white rounded-xl shadow p-5">
              <p className="text-sm text-gray-500">{label}</p>
              <h2 className={`text-2xl font-bold text-${color}-600 flex items-center gap-2`}>
                {value}
                <span className={`text-xs font-semibold text-${color}-500`}>{percent}</span>
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

      {/* Layanan Kami */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-8">Layanan Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {layanan.map((item, i) => (
            <Link to={`/produk/${item.slug}`} key={i} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-700 mb-2">{item.nama}</h3>
              <p className="text-sm text-gray-600">Klik untuk lihat detail layanan {item.nama.toLowerCase()}...</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Form Pemesanan */}
      <OrderForm />
    </div>
  )
}

export default Dashboard
