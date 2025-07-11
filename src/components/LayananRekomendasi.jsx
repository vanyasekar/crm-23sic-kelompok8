// LayananRekomendasi.jsx

import { useState } from "react";
// Hapus atau jadikan komentar baris ini jika tidak lagi menggunakan Supabase
// import { supabase } from "../supabaseClient"; 

// Definisikan URL API Backend Flask Anda
const API_BASE_URL = "https://65de7848ede3.ngrok-free.app"; // Sesuaikan jika API berjalan di tempat lain (misal Ngrok URL)

const questionsData = [
  {
    id: "jenis_pakaian", 
    text: "Pilih jenis pakaian Anda:",
    options: [
      { value: "Kemeja", label: "Kemeja" },
      { value: "Jas", label: "Jas" },
      { value: "Handuk", label: "Handuk" },
      { value: "Gaun", label: "Gaun" },
      { value: "Celana", label: "Celana" },
      // Tambahkan opsi lain sesuai dataset Anda
    ],
  },
  {
    id: "bahan_pakaian", 
    text: "Apa bahan dasar pakaian ini?",
    options: [
      { value: "Katun", label: "Katun" },
      { value: "Wol", label: "Wol" },
      { value: "Sutra", label: "Sutra" },
      { value: "Jeans", label: "Jeans" },
      // Tambahkan opsi lain sesuai dataset Anda
    ],
  },
  {
    id: "brand_pakaian", 
    text: "Apakah brand pakaian Anda premium atau biasa?",
    options: [
      { value: "Premium", label: "Premium" },
      { value: "Biasa", label: "Biasa" },
    ],
  },
  {
    id: "warna_pakaian", 
    text: "Apa warna dominan pada pakaian Anda?",
    options: [
      { value: "putih", label: "Putih Dominan" },
      { value: "berwarna_hitam", label: "Berwarna / Hitam Dominan" }, 
    ],
  },
];

// Komponen HasilRekomendasi yang diperbarui
function HasilRekomendasi({ recommendedServices, confidenceScoresMain, confidenceScoresColor, onReset }) {
  const sortedConfidenceMain = confidenceScoresMain ? Object.entries(confidenceScoresMain).sort(([, a], [, b]) => b - a) : [];
  const sortedConfidenceColor = confidenceScoresColor ? Object.entries(confidenceScoresColor).sort(([, a], [, b]) => b - a) : [];

  return (
    <div className="space-y-4 text-center">
      <h3 className="text-lg font-semibold text-gray-800">Rekomendasi Layanan Untuk Anda:</h3>
      <ul className="list-disc list-inside bg-blue-50 border border-blue-200 p-4 rounded-lg text-left">
        {recommendedServices.map((layanan, index) => (
          <li key={index} className="text-blue-800 font-bold mb-2">
            {layanan}
          </li>
        ))}
      </ul>

      {/* Visualisasi Confidence Score untuk Layanan Utama */}
      {sortedConfidenceMain.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h4 className="text-md font-semibold text-gray-700 mb-3">Confidence Score (Layanan Proses Utama):</h4>
          <div className="space-y-2">
            {sortedConfidenceMain.map(([serviceName, score]) => (
              <div key={serviceName} className="flex items-center">
                <span className="w-1/3 text-left text-gray-600 text-sm">{serviceName}</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${score * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-gray-800 text-sm">{`${(score * 100).toFixed(1)}%`}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visualisasi Confidence Score untuk Layanan Warna */}
      {sortedConfidenceColor.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h4 className="text-md font-semibold text-gray-700 mb-3">Confidence Score (Layanan Warna):</h4>
          <div className="space-y-2">
            {sortedConfidenceColor.map(([serviceName, score]) => (
              <div key={serviceName} className="flex items-center">
                <span className="w-1/3 text-left text-gray-600 text-sm">{serviceName}</span>
                <div className="w-2/3 bg-blue-200 rounded-full h-4">
                  <div
                    className="bg-purple-500 h-4 rounded-full"
                    style={{ width: `${score * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-gray-800 text-sm">{`${(score * 100).toFixed(1)}%`}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg mt-4 transition-colors"
        onClick={onReset}
      >
        Ulangi Rekomendasi
      </button>
    </div>
  );
}


export default function LayananRekomendasi({ onRecommendationComplete = () => {} }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendedServices, setRecommendedServices] = useState([]);
  const [confidenceScoresMain, setConfidenceScoresMain] = useState(null);
  const [confidenceScoresColor, setConfidenceScoresColor] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    const currentQuestionAnswered = answers[questionsData[step].id];
    if (!currentQuestionAnswered) {
      setError("Mohon pilih jawaban terlebih dahulu.");
      return;
    }
    setError(null);

    if (step === questionsData.length - 1) {
      fetchRekomendasiFromBackend();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setRecommendedServices([]);
    setConfidenceScoresMain(null);
    setConfidenceScoresColor(null);
    setIsFinished(false);
    setIsLoading(false);
    setError(null);
  };

  const fetchRekomendasiFromBackend = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        "jenis_pakaian": answers.jenis_pakaian,
        "bahan_pakaian": answers.bahan_pakaian,
        "brand_pakaian": answers.brand_pakaian,
        "warna_pakaian": answers.warna_pakaian,
      };

      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal mendapatkan rekomendasi dari server.");
      }

      const result = await response.json();
      setRecommendedServices(result.recommended_services);
      setConfidenceScoresMain(result.confidence_scores_main);
      setConfidenceScoresColor(result.confidence_scores_color);
      setIsFinished(true);
      onRecommendationComplete();
    } catch (err) {
      console.error("Error fetching recommendation:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const currentQuestion = questionsData[step];
  const currentAnswer = answers[currentQuestion.id];

  const isNextDisabled = !currentAnswer || isLoading;

  return (
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
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full mt-4 disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
            disabled={isNextDisabled}
            onClick={handleNext}
          >
            {isLoading ? "Memuat..." : (step === questionsData.length - 1 ? "Tampilkan Rekomendasi" : "Selanjutnya")}
          </button>
        </div>
      ) : (
        <HasilRekomendasi
          recommendedServices={recommendedServices}
          confidenceScoresMain={confidenceScoresMain}
          confidenceScoresColor={confidenceScoresColor}
          onReset={reset}
        />
      )}
    </div>
  );
}

