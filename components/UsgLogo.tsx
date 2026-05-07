/**
 * ============================================================
 * USG LOGO — usa los logos OFICIALES entregados por el cliente
 * ============================================================
 *
 *  /public/usg-logo-light.png  → versión clara (blanco + rojo)
 *                                 para fondos OSCUROS
 *  /public/usg-logo-dark.png   → versión oscura (gris + rojo)
 *                                 para fondos CLAROS
 *
 *  Estos son los ÚNICOS dos logos autorizados por el cliente,
 *  con sus colores corporativos exactos: gris carbón #4A4A4A
 *  para el wordmark "USG" en la versión oscura, y el rojo USG
 *  oficial #C8102E en el bloque que acompaña al wordmark.
 * ============================================================
 */

import Image from "next/image";

type Props = {
  variant?: "dark" | "light";
  className?: string;
  ariaLabel?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export default function UsgLogo({
  variant = "dark",
  className = "",
  ariaLabel = "USG",
  width = 1200,
  height = 512,
  priority = false,
}: Props) {
  const src =
    variant === "light" ? "/usg-logo-light.png" : "/usg-logo-dark.png";

  return (
    <Image
      src={src}
      alt={ariaLabel}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
