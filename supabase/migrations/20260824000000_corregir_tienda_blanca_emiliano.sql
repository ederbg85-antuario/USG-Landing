-- Corrige el nombre de tienda mal capturado en 2 tickets aprobados mas que
-- dejaban a sus participantes como "Otro / no identificado" dentro del Top 115.
-- Solicitud del cliente (24-ago-2026, correo de Fernanda Angelica Maldonado).
--
-- IMPORTANTE: solo se modifica el campo `tienda` (y la sucursal cuando venia
-- vacia). Puntos, montos, folios y estatus quedan intactos, por lo que ninguna
-- posicion del ranking cambia con esta migracion.

-- (1) Blanca Orozco (posicion 110) — folio 224810.
-- El campo tienda tenia capturado el nombre de la CLIENTA en lugar del
-- distribuidor. La transcripcion del documento muestra emisor "LUIS SOSA
-- RENTERIA" (razon social de Altamateriales, Anexo 01) y una linea de concepto
-- "GASTOS ENVIO PACHECO", que corresponde a la sucursal Pacheco.
UPDATE public.tickets
SET tienda = 'ALTAMATERIALES',
    sucursal = coalesce(nullif(btrim(sucursal), ''), 'Pacheco'),
    notas_internas = coalesce(notas_internas || ' | ', '') ||
      'Correccion 24-ago-2026: el campo tienda tenia capturado el nombre de la clienta '
      '(BLANCA OROZCO) en lugar del distribuidor. La transcripcion del documento muestra '
      'emisor LUIS SOSA RENTERIA (razon social de Altamateriales) y una linea GASTOS ENVIO '
      'PACHECO, por lo que corresponde a Altamateriales sucursal Pacheco. Solo se corrige el '
      'nombre del distribuidor; puntos, montos y estatus no se modifican.'
WHERE folio_ticket = '224810' AND tienda = 'BLANCA OROZCO' AND status = 'aprobado';

-- (2) Emiliano Vargas Frias (posicion 114) — folio 224343.
-- Capturado como "ATERIALES", el mismo truncamiento de ALTAMATERIALES ya
-- corregido el 20-ago. Sus otros 3 tickets aprobados son SOSA RENTERIA,
-- ALTAMATERIALES y LUIS SOSA RENTERIA, y el folio pertenece a la misma serie.
UPDATE public.tickets
SET tienda = 'ALTAMATERIALES',
    notas_internas = coalesce(notas_internas || ' | ', '') ||
      'Correccion 24-ago-2026: nombre de tienda mal capturado (ATERIALES), truncamiento de '
      'ALTAMATERIALES. Los otros 3 tickets aprobados del mismo participante son SOSA RENTERIA / '
      'ALTAMATERIALES / LUIS SOSA RENTERIA y el folio pertenece a la misma serie. Solo se corrige '
      'el nombre del distribuidor; puntos, montos y estatus no se modifican.'
WHERE folio_ticket = '224343' AND tienda = 'ATERIALES' AND status = 'aprobado';

-- Verificacion: ningun participante dentro del Top 115 queda con distribuidor
-- nulo o "Otro / no identificado".
--   select count(*) from ranking
--   where rank <= 115 and (distribuidor is null or distribuidor ilike '%no identificado%');
--   -- esperado: 0
