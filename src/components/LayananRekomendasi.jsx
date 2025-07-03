import { useState } from "react";
import { supabase } from "../supabaseClient"; // Sesuaikan path jika perlu

// --- DATA BARU: Sesuaikan pertanyaan dengan klasifikasi baru ---
const questionsData = [
  {
    id: "q1",
    text: "Pilih jenis proses pencucian yang Anda inginkan:",
    options: [
      { value: "green_dry_cleaning", label: "Green Dry Cleaning (Premium dengan bahan khusus aQualis)" },
      { value: "wet_cleaning", label: "Wet Cleaning (Proses standar)" },
    ],
  },
  {
    id: "q2",
    text: "Apa warna dominan pada pakaian Anda?",
    options: [
      { value: "putih", label: "Putih Dominan" },
      { value: "berwarna", label: "Berwarna / Hitam Dominan" },
    ],
  },
];

// Komponen HasilRekomendasi tidak perlu diubah
function HasilRekomendasi({ rekomendasi, onReset }) {
  return (
    <div className="space-y-4 text-center">
      <h3 className="text-lg font-semibold text-gray-800">Rekomendasi Layanan Untuk Anda:</h3>
      <ul className="list-disc list-inside bg-gray-50 p-4 rounded-lg text-left">
        {rekomendasi.map((layanan, index) => (
          <li key={index} className="text-gray-700 font-medium mb-2">
            {layanan}
          </li>
        ))}
      </ul>
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg mt-4 transition-colors"
        onClick={onReset}
      >
        Ulangi Rekomendasi
      </button>
    </div>
  );
}


// --- KOMPONEN UTAMA ---
export default function LayananRekomendasi({ onRecommendationComplete = () => {} }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [rekomendasi, setRekomendasi] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (step === questionsData.length - 1) {
      calculateAndSaveRekomendasi();
      setIsFinished(true);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setRekomendasi([]);
    setIsFinished(false);
  };

  const saveResultToSupabase = async (rekomendasiFinal, jawabanUser) => {
    const { error } = await supabase.from("recommendation_logs").insert([
      { rekomendasi_final: rekomendasiFinal, jawaban: jawabanUser },
    ]);
    if (error) {
      console.error("Gagal menyimpan rekomendasi:", error.message);
    } else {
      console.log("Rekomendasi berhasil disimpan!");
      onRecommendationComplete();
    }
  };

  // --- LOGIKA BARU: Sesuaikan dengan klasifikasi baru ---
  const calculateAndSaveRekomendasi = () => {
    let layanan = [];

    // Langkah 1: Tentukan Layanan Utama
    if (answers.q1 === "green_dry_cleaning") {
      layanan.push("Green Dry Cleaning");
    } else {
      layanan.push("Wet Cleaning");
    }

    // Langkah 2: Tentukan Add-on berdasarkan Warna
    if (answers.q2 === "putih") {
      layanan.push("BriteWhite"); // Add-on untuk pakaian putih
    } else {
      layanan.push("ColorCare"); // Add-on untuk pakaian berwarna
    }

    setRekomendasi(layanan);
    saveResultToSupabase(layanan, answers);
  };

  const currentQuestion = questionsData[step];
  const currentAnswer = answers[currentQuestion.id];

  return (
    // JSX untuk tampilan tidak perlu diubah
    <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl mx-auto my-8 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Cari Tahu Layanan yang Tepat</h2>
      {!isFinished ? (
        <div className="space-y-6">
          <p className="font-semibold text-lg text-gray-700">
            {step + 1}. {currentQuestion.text}
          </p>
          <div className="space-y-3 flex flex-col">
            {currentQuestion.options.map((option) => (
              <label
                key={option.value}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  currentAnswer === option.value
                    ? "bg-blue-100 border-blue-500 ring-2 ring-blue-500"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option.value}
                  checked={currentAnswer === option.value}
                  onChange={() => handleAnswerChange(currentQuestion.id, option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full mt-4 disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
            disabled={!currentAnswer}
            onClick={handleNext}
          >
            {step === questionsData.length - 1 ? "Tampilkan Rekomendasi" : "Selanjutnya"}
          </button>
        </div>
      ) : (
        <HasilRekomendasi rekomendasi={rekomendasi} onReset={reset} />
      )}
    </div>
  );
}