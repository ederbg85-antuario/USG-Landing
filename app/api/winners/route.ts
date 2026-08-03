import { NextResponse } from "next/server";
import { getPublicRanking } from "@/lib/public-ranking";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const entries = await getPublicRanking(100);

    return NextResponse.json(
      {
        entries,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "No se pudo actualizar el ranking de ganadores." },
      { status: 502 },
    );
  }
}
