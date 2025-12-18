import { useState } from 'react';
import { questions, scaleLabels } from '../data/questions';
import { calculateScore, getCategory, getCategoryColor } from '../utils/scoring';
import { supabase } from '../lib/supabase';
import { CheckCircle2 } from 'lucide-react';

export default function QuestionnaireForm() {
  const [nama, setNama] = useState('');
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(-1));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; category: string } | null>(null);
  const [error, setError] = useState('');

  const handleAnswerChange = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nama.trim()) {
      setError('Nama harus diisi');
      return;
    }

    if (answers.some((a) => a === -1)) {
      setError('Semua pertanyaan harus dijawab');
      return;
    }

    setIsSubmitting(true);

    try {
      const totalScore = calculateScore(answers);
      const category = getCategory(totalScore);

      const { error: insertError } = await supabase.from('responses').insert({
        nama: nama.trim(),
        answers,
        total_score: totalScore,
        category,
      });

      if (insertError) throw insertError;

      setResult({ score: totalScore, category });
      setNama('');
      setAnswers(Array(10).fill(-1));
    } catch (err) {
      setError('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Terima Kasih!</h2>
        <p className="text-gray-600 mb-6">Kuesioner Anda telah berhasil disimpan.</p>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <p className="text-sm text-gray-500 mb-2">Total Skor Anda</p>
          <p className="text-5xl font-bold text-gray-800 mb-4">{result.score}</p>
          <p className="text-sm text-gray-500 mb-2">Kategori Stres</p>
          <span
            className={`inline-block px-6 py-3 rounded-full text-lg font-semibold ${getCategoryColor(
              result.category
            )}`}
          >
            {result.category}
          </span>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
          <p className="text-sm text-blue-800">
            <strong>Catatan:</strong> Hasil ini hanya alat bantu untuk menilai tingkat stres Anda dan
            bukan diagnosis medis. Jika Anda memiliki kekhawatiran, konsultasikan dengan tenaga
            profesional.
          </p>
        </div>

        <button
          onClick={() => setResult(null)}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Isi Kuesioner Baru
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Kuesioner Perceived Stress Scale (PSS)
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Pertanyaan-pertanyaan ini menanyakan tentang perasaan dan pikiran Anda selama{' '}
          <strong>satu bulan terakhir</strong>. Untuk setiap pertanyaan, pilih jawaban yang paling
          mendekati perasaan Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="nama" className="block text-sm font-semibold text-gray-700 mb-2">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Masukkan nama lengkap Anda"
          />
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-gray-50 rounded-xl p-6">
              <p className="font-medium text-gray-800 mb-4">
                {question.id}. {question.text}
              </p>

              <div className="space-y-2">
                {scaleLabels.map((label, value) => (
                  <label
                    key={value}
                    className="flex items-center p-3 bg-white rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-300 transition-colors"
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={value}
                      checked={answers[index] === value}
                      onChange={() => handleAnswerChange(index, value)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">
                      {value} - {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg"
        >
          {isSubmitting ? 'Menyimpan...' : 'Kirim Kuesioner'}
        </button>
      </form>
    </div>
  );
}
