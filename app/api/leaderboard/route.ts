import { NextResponse } from "next/server";
import { getPublicRanking } from "@/lib/public-ranking";

/**
 * Resumen público para la landing principal. Usa la misma lista final del
 * cliente que /ganadores y permanece separado del ranking operativo.
 */
export const revalidate = 86_400;

export async function GET() {
  try {
    const entries = await getPublicRanking(15);

    return NextResponse.json(entries, {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo cargar la lista oficial de ganadores." },
      { status: 502 },
    );
  }
}
