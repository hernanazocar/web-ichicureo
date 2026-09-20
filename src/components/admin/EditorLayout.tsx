import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface EditorLayoutProps {
  title: string;
  backLink: string;
  children: React.ReactNode;
}

export default function EditorLayout({ title, backLink, children }: EditorLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href={backLink}>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft size={20} className="text-gray-700" strokeWidth={2.5} />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-600 mt-0.5">Edición de sitio web</p>
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

export function EditorSection({ title, icon, children, highlight = false }: { title: string; icon?: React.ReactNode; children: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`bg-white rounded-2xl p-8 border-2 shadow-sm hover:shadow-md transition-all ${
      highlight ? 'border-primary/30 shadow-primary/5' : 'border-gray-200'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        {icon && <div className="text-primary text-2xl">{icon}</div>}
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function EditorInput({ label, value, onChange, placeholder, required, type = "text", rows }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  rows?: number;
}) {
  const InputComponent = type === "textarea" ? "textarea" : "input";

  return (
    <div>
      <label className="block text-sm font-bold mb-2 text-gray-800">{label} {required && <span className="text-red-500">*</span>}</label>
      <InputComponent
        type={type}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 font-medium text-base transition-all hover:border-gray-400"
      />
    </div>
  );
}

export function EditorActions({ onCancel, onSave, loading, cancelText = "Cancelar", saveText = "Guardar Cambios" }: {
  onCancel: string;
  onSave: () => void;
  loading: boolean;
  cancelText?: string;
  saveText?: string;
}) {
  return (
    <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-8 pb-6">
      <div className="flex gap-4">
        <Link href={onCancel} className="flex-1">
          <button
            type="button"
            className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-100 hover:border-gray-400 transition-all text-gray-900 text-lg"
          >
            {cancelText}
          </button>
        </Link>
        <button
          type="submit"
          disabled={loading}
          onClick={onSave}
          className="flex-1 bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white font-bold px-6 py-4 rounded-xl hover:shadow-xl transition-all disabled:opacity-50 text-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? "⏳ Guardando..." : `💾 ${saveText}`}
        </button>
      </div>
    </div>
  );
}
