import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-black text-white">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 md:px-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image
                src="/images/logo/kobana-logo.png"
                alt="Kobana"
                width={56}
                height={14}
                unoptimized
                className="h-[14px] w-auto"
              />
            </Link>
            <Image
              src="/images/marca-onca.png"
              alt="Onça Kobana"
              width={60}
              height={80}
              unoptimized
              className="h-16 w-auto opacity-80 transition-opacity hover:opacity-100"
            />
          </div>
          <div className="text-center text-xs text-gray-400 md:text-right">
            <p>&copy; 2008/2026 Kobana Tecnologia Ltda.</p>
            <p>
              CNPJ: 05.813.794/0001-26 - Calçada das Margaridas, 163, Sala 02
              Centro Comer, Alphaville - Barueri, SP - 06453-038.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
