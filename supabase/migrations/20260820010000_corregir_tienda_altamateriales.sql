-- Corrige el nombre de tienda mal capturado en 2 tickets aprobados que hacían
-- aparecer a sus participantes como "Otro / no identificado" en el Top 100.
-- Solicitud del cliente (20-ago-2026): "si no se encuentra a qué distribuidor
-- pertenecen entonces deben eliminarse" — en estos dos casos SÍ se identificó el
-- distribuidor, por lo que se corrige la captura en lugar de dar de baja.
--
-- IMPORTANTE: solo se modifica el campo `tienda`. Puntos, montos, folios y
-- estatus del ticket quedan intactos, por lo que ninguna posición del ranking
-- cambia con esta migración.

-- (1) Luis Alberto Estrada Lujan — folio 224594.
-- Capturado como "ATERIALES" (truncamiento de ALTAMATERIALES). La sucursal
-- declarada por el participante dice "Av. Pacheco 1210, Col. Obrera, Chihuahua",
-- que corresponde a la sucursal Pacheco de Altamateriales.
UPDATE public.tickets
SET tienda = 'ALTAMATERIALES',
    notas_internas = coalesce(notas_internas || ' | ', '') ||
      'Correccion 20-ago-2026: el nombre de tienda estaba mal capturado (ATERIALES). '
      'Se identifico como Altamateriales sucursal Av. Pacheco 1210, Col. Obrera, Chihuahua, '
      'segun el texto de sucursal capturado por el participante. Solo se corrige el nombre '
      'del distribuidor; puntos, montos y estatus del ticket no se modifican.'
WHERE folio_ticket = '224594' AND tienda = 'ATERIALES' AND status = 'aprobado';

-- (2) Gabriela Berenice Corral — folio 102100152103.
-- Capturado como "Getnet", que es la terminal bancaria y no un distribuidor. El
-- voucher corresponde a la misma compra del ticket ALTAMATERIALES folio 224154
-- (mismo importe 13,548.81, misma fecha 2026-07-06, sucursal Pacheco).
UPDATE public.tickets
SET tienda = 'ALTAMATERIALES',
    notas_internas = coalesce(notas_internas || ' | ', '') ||
      'Correccion 20-ago-2026: el nombre de tienda capturado era Getnet (terminal bancaria), '
      'no un distribuidor. El voucher corresponde a la misma compra del ticket ALTAMATERIALES '
      'folio 224154 (mismo importe 13548.81, misma fecha 2026-07-06, sucursal Pacheco). Solo se '
      'corrige el nombre del distribuidor; puntos, montos y estatus del ticket no se modifican.'
WHERE folio_ticket = '102100152103' AND tienda = 'Getnet' AND status = 'aprobado';

-- Verificación: tras estas correcciones ningún ganador del Top 100 queda con
-- distribuidor nulo o "Otro / no identificado".
--   select count(*) from ranking
--   where rank <= 100 and (distribuidor is null or distribuidor ilike '%no identificado%');
--   -- esperado: 0
