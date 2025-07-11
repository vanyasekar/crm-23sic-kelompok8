// 1. Impor gambar di bagian atas file
import laundryBgImage from '../assets/laundry-bg.jpg'; // Sesuaikan path relatif dari Hero.jsx

export default function Hero() {
  return (
    <section 
      className="relative h-72 md:h-96 bg-cover bg-center rounded-xl overflow-hidden" 
      // 2. Gunakan variabel yang diimpor
      style={{ backgroundImage: `url(${laundryBgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-2xl md:text-4xl font-bold">Laundry Ramah Lingkungan</h1>
          <p className="mt-2 md:text-lg">Pelayanan premium sejak 1952</p>
        </div>
      </div>
    </section>
  );
}