import { NextResponse } from "next/server";
import { getPublicRanking } from "@/lib/public-ranking";
import {
  CLIENT_WINNERS_TOTAL,
  CLIENT_WINNERS_UPDATED_AT,
} from "@/lib/client-winners-ranking";

export const revalidate = 86_400;

export async function GET() {
  try {
    const entries = await getPublicRanking(CLIENT_WINNERS_TOTAL);

    return NextResponse.json(
      {
        entries,
        updatedAt: CLIENT_WINNERS_UPDATED_AT,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=0, s-maxage=86400",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "No se pudo cargar la lista oficial de ganadores." },
      { status: 502 },
    );
  }
}
