/*
  # Create PSS Responses Table
  
  ## Deskripsi
  Membuat tabel untuk menyimpan hasil kuesioner Perceived Stress Scale (PSS)
  
  ## Tabel Baru
  - `responses`
    - `id` (uuid, primary key) - ID unik untuk setiap response
    - `nama` (text) - Nama responden
    - `answers` (jsonb) - Array berisi 10 jawaban (0-4)
    - `total_score` (integer) - Total skor (0-40)
    - `category` (text) - Kategori stres (Rendah/Sedang/Tinggi)
    - `created_at` (timestamptz) - Waktu pengisian
    - `updated_at` (timestamptz) - Waktu update terakhir
  
  ## Keamanan
  - Enable RLS pada tabel responses
  - Public dapat insert (untuk form submission)
  - Public dapat select, update, delete (untuk admin dashboard)
  
  ## Catatan
  - Answers disimpan sebagai JSONB array dengan 10 nilai (0-4)
  - Score dihitung otomatis di client side
  - Pertanyaan 4,5,7,8 sudah dibalik skornya sebelum disimpan
*/

CREATE TABLE IF NOT EXISTS responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama text NOT NULL,
  answers jsonb NOT NULL,
  total_score integer NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert responses"
  ON responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view responses"
  ON responses
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update responses"
  ON responses
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete responses"
  ON responses
  FOR DELETE
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_responses_created_at ON responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_responses_category ON responses(category);