import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Response } from '../types';
import { getCategoryColor } from '../utils/scoring';
import { Trash2, Edit, X } from 'lucide-react';
import EditModal from './EditModal';

export default function AdminDashboard() {
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingResponse, setEditingResponse] = useState<Response | null>(null);

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResponses(data || []);
    } catch (error) {
      console.error('Error fetching responses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    try {
      const { error } = await supabase.from('responses').delete().eq('id', id);

      if (error) throw error;

      setResponses(responses.filter((r) => r.id !== id));
      alert('Data berhasil dihapus');
    } catch (error) {
      console.error('Error deleting response:', error);
      alert('Gagal menghapus data');
    }
  };

  const handleEdit = (response: Response) => {
    setEditingResponse(response);
  };

  const handleSaveEdit = async (updatedResponse: Response) => {
    try {
      const { error } = await supabase
        .from('responses')
        .update({
          nama: updatedResponse.nama,
          answers: updatedResponse.answers,
          total_score: updatedResponse.total_score,
          category: updatedResponse.category,
          updated_at: new Date().toISOString(),
        })
        .eq('id', updatedResponse.id);

      if (error) throw error;

      setResponses(responses.map((r) => (r.id === updatedResponse.id ? updatedResponse : r)));
      setEditingResponse(null);
      alert('Data berhasil diperbarui');
    } catch (error) {
      console.error('Error updating response:', error);
      alert('Gagal memperbarui data');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Kelola data hasil kuesioner PSS</p>
        </div>

        <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-blue-800">
            Total Responden: <strong>{responses.length}</strong>
          </p>
        </div>

        {responses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Belum ada data kuesioner</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Nama</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Skor Total</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Kategori</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Tanggal</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response) => (
                  <tr key={response.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-800">{response.nama}</p>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-2xl font-bold text-gray-800">{response.total_score}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-block px-4 py-2 rounded-full font-semibold ${getCategoryColor(
                          response.category
                        )}`}
                      >
                        {response.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-gray-600">
                      {new Date(response.created_at).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(response)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(response.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingResponse && (
        <EditModal
          response={editingResponse}
          onSave={handleSaveEdit}
          onClose={() => setEditingResponse(null)}
        />
      )}
    </div>
  );
}
