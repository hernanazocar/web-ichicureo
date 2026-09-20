import Image from "next/image";

export default function Logo({ white = false }: { white?: boolean }) {
  return (
    <div className="flex items-center transition-all duration-300">
      <Image
        src="/logo.png"
        alt="Inmobiliaria Chicureo"
        width={180}
        height={60}
        className={`h-auto transition-all duration-300 ${
          white ? 'brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]' : 'drop-shadow-sm'
        }`}
        priority
      />
    </div>
  );
}
