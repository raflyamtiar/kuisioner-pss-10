import { useState } from 'react';
import { Response } from '../types';
import { questions, scaleLabels } from '../data/questions';
import { calculateScore, getCategory } from '../utils/scoring';
import { X } from 'lucide-react';

interface EditModalProps {
  response: Response;
  onSave: (response: Response) => void;
  onClose: () => void;
}

export default function EditModal({ response, onSave, onClose }: EditModalProps) {
  const [nama, setNama] = useState(response.nama);
  const [answers, setAnswers] = useState<number[]>(response.answers);

  const handleAnswerChange = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim()) {
      alert('Nama harus diisi');
      return;
    }

    if (answers.some((a) => a === -1)) {
      alert('Semua pertanyaan harus dijawab');
      return;
    }

    const totalScore = calculateScore(answers);
    const category = getCategory(totalScore);

    const updatedResponse: Response = {
      ...response,
      nama: nama.trim(),
      answers,
      total_score: totalScore,
      category,
    };

    onSave(updatedResponse);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Edit Data Responden</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6">
            <label htmlFor="edit-nama" className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="edit-nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-6 mb-8">
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
                        name={`edit-question-${index}`}
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

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
