import { useState } from "react";
import { supabase } from "../supabaseClient"; // Pastikan path ini benar

// ... (questionsData dan komponen HasilRekomendasi tetap sama)

const questionsData = [
  {
    id: "q1",
    text: "Apa warna dominan pada pakaian yang akan dicuci?",
    options: [
      { value: "putih", label: "Putih Dominan" },
      { value: "berwarna", label: "Berwarna / Hitam Dominan" },
      { value: "seimbang", label: "Seimbang antara Putih & Berwarna" },
    ],
  },
  {
    id: "q2",
    text: "Apakah pada pakaian terdapat noda dari makanan, minuman, darah, atau keringat?",
    options: [
      { value: "ya", label: "Ya" },
      { value: "tidak", label: "Tidak" },
    ],
  },
  {
    id: "q3",
    text: "Apakah Anda membutuhkan perlindungan antibakteri ekstra (misal: untuk pakaian bayi/setelah sakit)?",
    options: [
      { value: "ya", label: "Ya" },
      { value: "tidak", label: "Tidak" },
    ],
  },
];

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


export default function LayananRekomendasi() {
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState({});
  const [rekomendasi, setRekomendasi] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  // ... (handleAnswerChange, handleNext, reset tetap sama)
   const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (step === questionsData.length - 1) {
      calculateAndSaveRekomendasi(); // Ganti nama fungsi agar lebih jelas
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

  // --- FUNGSI BARU UNTUK MENYIMPAN HASIL KE SUPABASE ---
  const saveResultToSupabase = async (rekomendasiFinal, jawabanUser) => {
    const { error } = await supabase.from("recommendation_logs").insert([
      { 
        rekomendasi_final: rekomendasiFinal, 
        jawaban: jawabanUser 
      },
    ]);

    if (error) {
      console.error("Gagal menyimpan rekomendasi:", error.message);
    } else {
      console.log("Rekomendasi berhasil disimpan!");
    }
  };

  const calculateAndSaveRekomendasi = () => {
    let layanan = [];
    
    if (answers.q1 === "putih") {
      layanan.push("BriteWhite");
    } else {
      layanan.push("ColorCare");
    }

    if (answers.q2 === "ya") {
      layanan.push("Bio StainRemoval");
    }

    if (answers.q3 === "ya") {
      layanan.push("Antibacterial Guard");
    }
    
    setRekomendasi(layanan);
    
    // Panggil fungsi untuk menyimpan setelah rekomendasi dihitung
    saveResultToSupabase(layanan, answers); 
  };
  
  const currentQuestion = questionsData[step];
  const currentAnswer = answers[currentQuestion.id];

  return (
    // ... JSX tidak berubah sama sekali
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