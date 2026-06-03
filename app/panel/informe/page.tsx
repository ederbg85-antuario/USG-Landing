import { getInforme } from "@/lib/panel/data";
import ConfigNotice from "../ConfigNotice";
import InformeView from "./InformeView";

export const dynamic = "force-dynamic";
export const metadata = { title: "Informe — Panel USG" };

export default async function InformePage() {
  let data;
  try {
    data = await getInforme();
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
      <InformeView data={data} />
    </div>
  );
}

function Header() {
  return (
    <div className="mb-6">
      <h1 className="font-display text-4xl sm:text-5xl text-white tracking-wide">INFORME</h1>
      <p className="text-sm text-white/55 mt-1">
        Análisis de la promoción: productos más vendidos, distribuidores, sucursales y montos.
      </p>
    </div>
  );
}
