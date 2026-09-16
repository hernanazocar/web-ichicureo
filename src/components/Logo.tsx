import Image from "next/image";

export default function Logo({ white = false }: { white?: boolean }) {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.png"
        alt="Inmobiliaria Chicureo"
        width={180}
        height={60}
        className="h-auto"
        priority
      />
    </div>
  );
}
