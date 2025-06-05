export default function Hero() {
  return (
    <section className="relative h-72 md:h-96 bg-cover bg-center rounded-xl overflow-hidden" style={{ backgroundImage: "url('/assets/laundry-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-2xl md:text-4xl font-bold">Laundry Ramah Lingkungan</h1>
          <p className="mt-2 md:text-lg">Pelayanan premium sejak 1952</p>
          <button
            onClick={() => document.getElementById('order').scrollIntoView({ behavior: 'smooth' })}
            className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md">
            Pesan Sekarang
          </button>
        </div>
      </div>
    </section>
  );
}
