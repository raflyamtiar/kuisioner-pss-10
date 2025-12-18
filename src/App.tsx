import { useEffect, useState } from "react";
import QuestionnaireForm from "./components/QuestionnaireForm";
import AdminDashboard from "./components/AdminDashboard";
import {
  FileText,
  LayoutDashboard,
  Shield,
  ShieldCheck,
  X,
} from "lucide-react";

function App() {
  const [currentPage, setCurrentPage] = useState<"form" | "admin">("form");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [adminAccessCode, setAdminAccessCode] = useState("");
  const [adminError, setAdminError] = useState("");

  const ADMIN_STORAGE_KEY = "pss-admin-authenticated";
  const configuredAccessCode = import.meta.env.VITE_ADMIN_ACCESS_CODE;
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (!isBrowser) return;
    const stored = window.localStorage.getItem(ADMIN_STORAGE_KEY);
    if (stored === "true") {
      setIsAdminAuthenticated(true);
    }
  }, [isBrowser, ADMIN_STORAGE_KEY]);

  useEffect(() => {
    if (!isBrowser) return;
    if (isAdminAuthenticated) {
      window.localStorage.setItem(ADMIN_STORAGE_KEY, "true");
    } else {
      window.localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  }, [isAdminAuthenticated, ADMIN_STORAGE_KEY, isBrowser]);

  const handleAdminButtonClick = () => {
    if (isAdminAuthenticated) {
      setCurrentPage("admin");
      return;
    }

    setAdminAccessCode("");
    setAdminError("");
    setIsAdminLoginOpen(true);
  };

  const handleAdminLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (!configuredAccessCode) {
      setAdminError("Kode akses admin belum dikonfigurasi.");
      return;
    }

    if (adminAccessCode.trim() === configuredAccessCode) {
      setIsAdminAuthenticated(true);
      setCurrentPage("admin");
      setIsAdminLoginOpen(false);
      return;
    }

    setAdminError("Kode akses salah. Silakan coba lagi.");
  };

  const closeAdminLogin = () => {
    setIsAdminLoginOpen(false);
    setAdminAccessCode("");
    setAdminError("");
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage("form");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">Kuesioner PSS</h1>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage("form")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === "form"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FileText className="w-5 h-5" />
                Form
              </button>
              <button
                onClick={handleAdminButtonClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === "admin"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {isAdminAuthenticated ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : (
                  <LayoutDashboard className="w-5 h-5" />
                )}
                {isAdminAuthenticated ? "Admin (Akses)" : "Admin"}
              </button>

              {isAdminAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors bg-red-50 text-red-700 hover:bg-red-100"
                >
                  <Shield className="w-5 h-5" />
                  Keluar Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {currentPage === "form" ? <QuestionnaireForm /> : <AdminDashboard />}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>Perceived Stress Scale (PSS) - Alat ukur tingkat stres</p>
        </div>
      </footer>

      {isAdminLoginOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-8 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={closeAdminLogin}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Tutup form akses admin"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center mb-6">
              <Shield className="w-10 h-10 text-blue-600 mb-3" />
              <h2 className="text-2xl font-bold text-gray-800">Akses Admin</h2>
              <p className="text-gray-600 mt-1 text-sm">
                Masukkan kode akses yang telah dibagikan khusus untuk admin.
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-code"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Kode Akses
                </label>
                <input
                  id="admin-code"
                  type="password"
                  value={adminAccessCode}
                  onChange={(event) => setAdminAccessCode(event.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="••••••"
                  autoFocus
                />
              </div>

              {adminError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {adminError}
                </p>
              )}

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={closeAdminLogin}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
              </div>

              {!configuredAccessCode && (
                <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                  Admin code belum di-set. Tambahkan variabel{" "}
                  <code>VITE_ADMIN_ACCESS_CODE</code> pada file environment.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
