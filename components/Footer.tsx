import Link from "next/link";
import UsgLogo from "@/components/UsgLogo";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="bg-white inline-flex rounded-lg px-3 py-2 mb-4 shadow-md">
              <UsgLogo variant="dark" className="h-10 w-auto" />
            </div>
            <p className="font-display text-2xl text-white tracking-wide mb-2">
              LIGA DE CAMPEONES
            </p>
            <p className="text-sm text-white/55 max-w-md leading-relaxed">
              Promoción oficial USG 2026. Acumula goles (puntos) por cada
              compra de productos USG, sube en el ranking nacional y compite
              por hasta $100,000 MXN en premios.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">
              Promoción
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="#mecanica" className="hover:text-usg-red transition-colors">
                  Cómo se juega
                </Link>
              </li>
              <li>
                <Link href="#productos" className="hover:text-usg-red transition-colors">
                  Productos y puntos
                </Link>
              </li>
              <li>
                <Link href="#premios" className="hover:text-usg-red transition-colors">
                  Premios
                </Link>
              </li>
              <li>
                <Link href="#ranking" className="hover:text-usg-red transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-usg-red transition-colors">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="#terminos" className="hover:text-usg-red transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="#privacidad" className="hover:text-usg-red transition-colors">
                  Aviso de privacidad
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="hover:text-usg-red transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Terms summary */}
        <div
          id="terminos"
          className="border-t border-white/10 pt-8 text-xs text-white/40 leading-relaxed space-y-3"
        >
          <p className="font-bold text-white/60 uppercase tracking-widest text-[10px]">
            Términos y condiciones generales
          </p>
          <p>
            Promoción válida únicamente en territorio nacional mexicano.
            Participación gratuita, sujeta a la compra de productos USG
            participantes mencionados en esta página. Los puntos se acumulan
            exclusivamente por piezas registradas mediante ticket de compra
            válido enviado al canal oficial de WhatsApp de la promoción.
          </p>
          <p>
            Los premios económicos se otorgarán mediante NDC (Nota de Crédito)
            al distribuidor correspondiente; al momento de premiar se entregará
            un cheque representativo al ganador para redimir en POV. USG se
            reserva el derecho de validar o rechazar tickets que presenten
            inconsistencias o indicios de fraude. Vigencia, productos
            participantes, mecánica detallada y términos legales completos se
            comunican al iniciar el chat con el agente oficial.
          </p>
          <p>
            USG, USG Tablaroca®, USG Durock Forte®, USG Redimix®, USG
            Basecoat®, USG Anti-Moho®, USG Firecode®, USG Securock®, USG
            Plafones® y USG Donn® son marcas registradas de USG Corporation.
          </p>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} USG. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{" "}
            <span className="text-white/60 font-semibold">Antuario × Métrica BTL</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
