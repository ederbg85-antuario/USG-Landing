import { getRankingData } from "@/lib/panel/data";
import ConfigNotice from "../ConfigNotice";
import RankingTable from "./RankingTable";

export const dynamic = "force-dynamic";

export default async function RankingPage() {
  let rows;
  try {
    rows = await getRankingData();
  } catch (e) {
    return (
      <div>
        <Header />
        <ConfigNotice message={(e as Error).message} />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <RankingTable rows={rows} />
    </div>
  );
}

function Header() {
  return (
    <div className="mb-6">
      <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
        RANKING Y REGISTROS
      </h1>
      <p className="text-sm text-white/55 mt-1">
        Todos los participantes, sus puntos y los tickets que han enviado.
      </p>
    </div>
  );
}
