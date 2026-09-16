import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Inmobiliaria Chicureo - Tu lugar en la naturaleza",
  description: "Parcelas de 5.000 m² en ubicaciones estratégicas. Inversión segura en tu futuro.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
