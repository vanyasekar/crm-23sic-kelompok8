import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import PelangganForm from './PelangganForm';

function Pelanggan() {
  const [pelanggans, setPelanggans] = useState([]);
  const [editingPelanggan, setEditingPelanggan] = useState(null);

  const fetchPelanggans = async () => {
    const { data, error } = await supabase.from('pelanggan').select('*').order('created_at', { ascending: false });
    if (error) console.error('Gagal mengambil data:', error);
    else setPelanggans(data);
  };

  const addPelanggan = async (pelanggan) => {
    const { error } = await supabase.from('pelanggan').insert(pelanggan);
    if (error) console.error('Gagal menambah:', error);
    else fetchPelanggans();
  };

  const updatePelanggan = async (pelanggan) => {
    const { error } = await supabase
      .from('pelanggan')
      .update(pelanggan)
      .eq('id', pelanggan.id);
    if (error) console.error('Gagal memperbarui:', error);
    else {
      fetchPelanggans();
      setEditingPelanggan(null);
    }
  };

  const deletePelanggan = async (id) => {
    const { error } = await supabase.from('pelanggan').delete().eq('id', id);
    if (error) console.error('Gagal menghapus:', error);
    else fetchPelanggans();
  };

  useEffect(() => { fetchPelanggans(); }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD Pelanggan dengan Supabase</h1>
      <PelangganForm
        addUser={addPelanggan}
        updateUser={updatePelanggan}
        editingUser={editingPelanggan}
      />
      <ul className="mt-4">
        {pelanggans.map(p => (
          <li key={p.id} className="border p-2 my-2 flex justify-between items-center">
            <div>
              <p className="font-semibold">{p.nama}</p>
              <p className="text-sm text-gray-600">{p.alamat} - {p.riwayat_transaksi}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => setEditingPelanggan(p)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => deletePelanggan(p.id)} className="text-red-600 hover:underline">Hapus</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pelanggan;
