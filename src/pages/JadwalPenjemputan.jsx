import { useState } from 'react'

const JadwalPenjemputan = () => {
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    tanggal: '',
    waktu: '',
    catatan: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Jadwal dikirim:', formData)
    alert('Jadwal penjemputan berhasil disimpan!')
    // Di sini bisa ditambahkan logic simpan ke database
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">Atur Jadwal Penjemputan</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Alamat Penjemputan</label>
          <textarea
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tanggal</label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Waktu</label>
            <input
              type="time"
              name="waktu"
              value={formData.waktu}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Catatan Tambahan</label>
          <textarea
            name="catatan"
            value={formData.catatan}
            onChange={handleChange}
            rows={2}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            placeholder="Contoh: Jangan lupa jemput pukul 8 pagi"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Simpan Jadwal
        </button>
      </form>
    </div>
  )
}

export default JadwalPenjemputan
