export type PublicRankingEntry = {
  rank: number;
  name: string;
  state?: string;
  stars: number;
  points: number;
  distributor?: string;
  prize?: string;
};

type ClientWinnerTuple = readonly [
  rank: number,
  name: string,
  state: string,
  points: number,
  distributor: string,
  prize: string,
];

/**
 * Lista pública entregada por el cliente para la landing de ganadores.
 *
 * Fuente: hoja "115 GANADORES USG", gid 211095307.
 * Corte: 26 de agosto de 2026.
 *
 * Esta lista es deliberadamente independiente de Supabase y conserva el orden
 * definido por el cliente. Sólo incluye campos aprobados para publicación; no
 * agregar teléfonos, correos, ciudades ni domicilios de entrega.
 */
const CLIENT_WINNERS: readonly ClientWinnerTuple[] = [
  [1,"Jovana R.","Quintana Roo",7401500,"Obrek","$100,000"],
  [2,"Jesús E.","Yucatán",2133100,"Obrek","$50,000"],
  [3,"Diego M.","Jalisco",2056100,"Hazlo! Kontabla","$30,000"],
  [4,"Alicia A.","Colima",2481100,"Hazlo! Kontabla","MOTOCICLETA DE TRABAJO 200 CC"],
  [5,"Andrés M.","Jalisco",2143200,"Hazlo! Kontabla","MOTOCICLETA DE TRABAJO 200 CC"],
  [6,"Ronaldo A.","Quintana Roo",1950300,"Obrek","MOTOCICLETA DE TRABAJO 200 CC"],
  [7,"José Y.","Nayarit",1301500,"CIASA","MOTOCICLETA DE TRABAJO 200 CC"],
  [8,"Paulina J.","Jalisco",1233800,"Hazlo! Kontabla","SMART TV DE 65 PULGADAS"],
  [9,"Julio A.","Jalisco",1001800,"CIASA","SMART TV DE 65 PULGADAS"],
  [10,"Guillermo P.","Jalisco",828800,"CIASA","SMART TV DE 65 PULGADAS"],
  [11,"ABEL C.","Morelos",789100,"Centro de Prefabricados","SMART TV DE 65 PULGADAS"],
  [12,"Cynthia J.","Jalisco",692100,"CIASA","SMART TV DE 65 PULGADAS"],
  [13,"Isela M.","Tabasco",676500,"DYC Materiales","SMART TV DE 65 PULGADAS"],
  [14,"Mario H.","Ciudad de México",657900,"Materiales Construcentro","SMART TV DE 65 PULGADAS"],
  [15,"Luz S.","Estado de México",632500,"Materiales Construcentro","SMART TV DE 65 PULGADAS"],
  [16,"César Y.","Nayarit",600500,"CIASA","SCOOTER ELECTRICO 500W"],
  [17,"María A.","Estado de México",495700,"Hazlo! Kontabla","SCOOTER ELECTRICO 500W"],
  [18,"Sandra F.","Jalisco",468900,"Hazlo! Kontabla","SCOOTER ELECTRICO 500W"],
  [19,"Ricardo R.","Jalisco",468600,"Hazlo! Kontabla","SCOOTER ELECTRICO 500W"],
  [20,"Gabriel M.","Yucatán",402000,"Obrek","SCOOTER ELECTRICO 500W"],
  [21,"Andrés A.","Yucatán",394100,"Obrek","ROTOMARTILLO BOSCH O SIMILAR"],
  [22,"David R.","Jalisco",283500,"Hazlo! Kontabla","ROTOMARTILLO BOSCH O SIMILAR"],
  [23,"Andrés H.","Yucatán",279500,"Obrek","ROTOMARTILLO BOSCH O SIMILAR"],
  [24,"Laura H.","Chihuahua",251500,"Altamateriales","ROTOMARTILLO BOSCH O SIMILAR"],
  [25,"Javier E.","Tabasco",217500,"DYC Materiales","ROTOMARTILLO BOSCH O SIMILAR"],
  [26,"Sergio U.","Chihuahua",184100,"Altamateriales","DETECTOR DE METAL MUROS"],
  [27,"Francisco J.","Chihuahua",170000,"Altamateriales","DETECTOR DE METAL MUROS"],
  [28,"Gabriela E.","Morelos",163400,"Centro de Prefabricados","DETECTOR DE METAL MUROS"],
  [29,"Pavel A.","Estado de México",161700,"CIASA","DETECTOR DE METAL MUROS"],
  [30,"Alejandro G.","Jalisco",160800,"Hazlo! Kontabla","DETECTOR DE METAL MUROS"],
  [31,"Keiry Y.","Sinaloa",154400,"Multiplafones","DETECTOR DE METAL MUROS"],
  [32,"Flavio S.","Chihuahua",152200,"Altamateriales","DETECTOR DE METAL MUROS"],
  [33,"Eugenio T.","Michoacán",150400,"Prontopanel","DETECTOR DE METAL MUROS"],
  [34,"Victor M.","Tabasco",126100,"DYC Materiales","DETECTOR DE METAL MUROS"],
  [35,"Maritza H.","Jalisco",122700,"Napresa","DETECTOR DE METAL MUROS"],
  [36,"Jaime M.","Chihuahua",112500,"Altamateriales","TERMOS OFICIALES MUNDIAL 2026"],
  [37,"Marco A.","Chihuahua",111000,"Altamateriales","TERMOS OFICIALES MUNDIAL 2026"],
  [38,"Gerardo A.","Nayarit",110800,"CIASA","TERMOS OFICIALES MUNDIAL 2026"],
  [39,"Jose d.","Michoacán",110800,"CIASA","TERMOS OFICIALES MUNDIAL 2026"],
  [40,"Quintin M.","Chihuahua",105900,"Altamateriales","TERMOS OFICIALES MUNDIAL 2026"],
  [41,"Fernanda H.","Estado de México",104600,"Materiales Construcentro","TERMOS OFICIALES MUNDIAL 2026"],
  [42,"Victor A.","Morelos",99300,"Centro de Prefabricados","TERMOS OFICIALES MUNDIAL 2026"],
  [43,"Marco A.","Michoacán",95900,"CIASA","TERMOS OFICIALES MUNDIAL 2026"],
  [44,"Jordy Y.","Ciudad de México",86000,"Materiales Construcentro","TERMOS OFICIALES MUNDIAL 2026"],
  [45,"Benigno A.","Sinaloa",79000,"CIASA","TERMOS OFICIALES MUNDIAL 2026"],
  [46,"Edgar C.","Michoacán",79000,"CIASA","BALON OFICIALES MUNDIAL 2026"],
  [47,"Rodrigo S.","Michoacán",74500,"CIASA","BALON OFICIALES MUNDIAL 2026"],
  [48,"Jonathan A.","Quintana Roo",69800,"Alfredo E. Mimenza Novelo","BALON OFICIALES MUNDIAL 2026"],
  [49,"Juan A.","Oaxaca",66900,"Grupo IMAC","BALON OFICIALES MUNDIAL 2026"],
  [50,"Domingo A.","Yucatán",62500,"Obrek","BALON OFICIALES MUNDIAL 2026"],
  [51,"Ricardo C.","Ciudad de México",60500,"Materiales Construcentro","BALON OFICIALES MUNDIAL 2026"],
  [52,"Enrique R.","Chihuahua",60000,"Eléctrica y Plomería de Sudcalifornia","BALON OFICIALES MUNDIAL 2026"],
  [53,"Eric A.","Nayarit",59800,"CIASA","BALON OFICIALES MUNDIAL 2026"],
  [54,"René O.","Ciudad de México",59500,"Materiales Construcentro","BALON OFICIALES MUNDIAL 2026"],
  [55,"Dulce V.","Ciudad de México",55000,"Materiales Construcentro","BALON OFICIALES MUNDIAL 2026"],
  [56,"Rafael P.","Quintana Roo",53500,"Materiales Construcentro","BALON OFICIALES MUNDIAL 2026"],
  [57,"Saul G.","Morelos",49000,"Centro de Prefabricados","BALON OFICIALES MUNDIAL 2026"],
  [58,"Gomez H.","Estado de México",45000,"Materiales Construcentro","BALON OFICIALES MUNDIAL 2026"],
  [59,"Jose G.","Chihuahua",44600,"Altamateriales","BALON OFICIALES MUNDIAL 2026"],
  [60,"Richard M.","Michoacán",40400,"CIASA","BALON OFICIALES MUNDIAL 2026"],
  [61,"Luis E.","Sinaloa",37800,"CIASA","BALON OFICIALES MUNDIAL 2026"],
  [62,"Luis A.","Tabasco",36000,"DYC Materiales","BALON OFICIALES MUNDIAL 2026"],
  [63,"Juan R.","Chihuahua",35600,"Altamateriales","BALON OFICIALES MUNDIAL 2026"],
  [64,"Omar A.","Chihuahua",35300,"Altamateriales","BALON OFICIALES MUNDIAL 2026"],
  [65,"Oscar Á.","Ciudad de México",35000,"Materiales Construcentro","BALON OFICIALES MUNDIAL 2026"],
  [66,"Jaime p.","Michoacán",33500,"Prontopanel","MINI KIT DE HERRAMIENTAS"],
  [67,"Cesar A.","Morelos",33500,"Centro de Prefabricados","MINI KIT DE HERRAMIENTAS"],
  [68,"Jose I.","Guanajuato",31000,"CIASA","MINI KIT DE HERRAMIENTAS"],
  [69,"Maribel V.","Estado de México",30600,"Obrek","MINI KIT DE HERRAMIENTAS"],
  [70,"Alan E.","Chihuahua",30300,"Altamateriales","MINI KIT DE HERRAMIENTAS"],
  [71,"Ana K.","Ciudad de México",30000,"Materiales Construcentro","MINI KIT DE HERRAMIENTAS"],
  [72,"José A.","Tabasco",29600,"DYC Materiales","MINI KIT DE HERRAMIENTAS"],
  [73,"José A.","Morelos",28800,"Centro de Prefabricados","MINI KIT DE HERRAMIENTAS"],
  [74,"Irving I.","Sinaloa",26500,"Aceros del Pacífico","MINI KIT DE HERRAMIENTAS"],
  [75,"Samuel J.","Tabasco",25400,"DYC Materiales","MINI KIT DE HERRAMIENTAS"],
  [76,"Luis M.","Chihuahua",23700,"Altamateriales","MINI KIT DE HERRAMIENTAS"],
  [77,"Priscila P.","Quintana Roo",23100,"Materiales Construcentro","MINI KIT DE HERRAMIENTAS"],
  [78,"Eduardo E.","Morelos",22700,"Centro de Prefabricados","MINI KIT DE HERRAMIENTAS"],
  [79,"Isaac C.","Tabasco",22200,"DYC Materiales","MINI KIT DE HERRAMIENTAS"],
  [80,"Jesús V.","Chihuahua",22000,"Altamateriales","MINI KIT DE HERRAMIENTAS"],
  [81,"Jesús A.","Chihuahua",22000,"Altamateriales","MINI KIT DE HERRAMIENTAS"],
  [82,"Julio C.","Sinaloa",21900,"CIASA","MINI KIT DE HERRAMIENTAS"],
  [83,"ROBERTO T.","Tabasco",21300,"DYC Materiales","MINI KIT DE HERRAMIENTAS"],
  [84,"Manuel A.","Chihuahua",21000,"Eléctrica y Plomería de Sudcalifornia","MINI KIT DE HERRAMIENTAS"],
  [85,"Jose M.","Chihuahua",19900,"Altamateriales","MINI KIT DE HERRAMIENTAS"],
  [86,"Jose E.","Sinaloa",19100,"Aceros del Pacífico","FAJA DE CARGA"],
  [87,"José G.","Chihuahua",18000,"Altamateriales","FAJA DE CARGA"],
  [88,"Luis G.","Chihuahua",17500,"Altamateriales","FAJA DE CARGA"],
  [89,"Marco V.","Puebla",16800,"Tools Palaces","FAJA DE CARGA"],
  [90,"Aldo I.","Chihuahua",16500,"Altamateriales","FAJA DE CARGA"],
  [91,"Valentín L.","Chihuahua",16000,"Altamateriales","FAJA DE CARGA"],
  [92,"Carol O.","Ciudad de México",15000,"Materiales Construcentro","FAJA DE CARGA"],
  [93,"Gabriela B.","Chihuahua",14800,"Altamateriales","FAJA DE CARGA"],
  [94,"Antonio M.","Michoacán",14800,"CIASA","FAJA DE CARGA"],
  [95,"Angel F.","Michoacán",13900,"CIASA","FAJA DE CARGA"],
  [96,"Arturo A.","Ciudad de México",12500,"Materiales Construcentro","FAJA DE CARGA"],
  [97,"Amado R.","Morelos",11500,"Centro de Prefabricados","FAJA DE CARGA"],
  [98,"Luis J.","Sonora",11300,"Vector","FAJA DE CARGA"],
  [99,"Julio C.","Tabasco",11100,"DYC Materiales","FAJA DE CARGA"],
  [100,"Cesar C.","Estado de México",10500,"Construdeco","FAJA DE CARGA"],
  [101,"Rubén G.","Quintana Roo",10500,"Obrek","FAJA DE CARGA"],
  [102,"Alberto C.","Chihuahua",9500,"Altamateriales","FAJA DE CARGA"],
  [103,"Miguel Á.","Michoacán",9300,"CIASA","FAJA DE CARGA"],
  [104,"Tomas M.","Michoacán",9200,"CIASA","FAJA DE CARGA"],
  [105,"José R.","Ciudad de México",9000,"Materiales Construcentro","FAJA DE CARGA"],
  [106,"Jesús A.","Michoacán",8800,"CIASA","TIRALINEAS"],
  [107,"Marcos C.","Ciudad de México",8500,"Obrek","TIRALINEAS"],
  [108,"Orlando S.","Chihuahua",8100,"Altamateriales","TIRALINEAS"],
  [109,"Edwy E.","Estado de México",7000,"Materiales Construcentro","TIRALINEAS"],
  [110,"Saul I.","Chihuahua",6800,"Materiales Duque","TIRALINEAS"],
  [111,"Emiliano V.","Chihuahua",6800,"Altamateriales","TIRALINEAS"],
  [112,"Jesús R.","Chihuahua",6600,"Altamateriales","TIRALINEAS"],
  [113,"Rodrigo C.","Morelos",6000,"Centro de Prefabricados","TIRALINEAS"],
  [114,"Efraín d.","Tabasco",6000,"DYC Materiales","TIRALINEAS"],
  [115,"Gustavo U.","Chihuahua",5800,"Altamateriales","TIRALINEAS"],
];

export const CLIENT_WINNERS_TOTAL = CLIENT_WINNERS.length;
export const CLIENT_WINNERS_UPDATED_AT = "2026-08-26T12:00:00-06:00";

export const CLIENT_WINNERS_RANKING: readonly PublicRankingEntry[] =
  CLIENT_WINNERS.map(
    ([rank, name, state, points, distributor, prize]) => ({
      rank,
      name,
      state,
      stars: 0,
      points,
      distributor,
      prize,
    }),
  );
