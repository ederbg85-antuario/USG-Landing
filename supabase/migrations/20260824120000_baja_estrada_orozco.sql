-- Baja de 2 participantes a solicitud del cliente (24-ago-2026), en la revision
-- final de la lista de ganadores: Luis Alberto Estrada Lujan (posicion 90) y
-- Blanca Orozco (posicion 110).
--
-- IMPORTANTE: no se elimina ningun ticket ni compra. Sus comprobantes siguen
-- con estatus 'aprobado' y sus montos permanecen dentro de la facturacion
-- total; unicamente quedan fuera del ranking publico y de la premiacion, que
-- solo consideran participantes con estado_cuenta = 'activo'.
--
-- Efecto: el ranking pasa de 276 a 274 participantes activos y el Top 100 se
-- recorre, entrando Julio Cesar Jesus Castro (DYC Materiales) en la posicion 100.
UPDATE public.participantes
SET estado_cuenta = 'bloqueado',
    motivo_bloqueo = 'BAJA 24-ago-2026 a solicitud del cliente: retirado de la dinamica de premios en la revision final de la lista de ganadores. Sus tickets siguen APROBADOS y su compra sigue contando en la facturacion total; solo queda fuera del ranking y de la premiacion.'
WHERE id IN (
  '834d1831-01d8-4d61-aa1a-c60069efc451',  -- Luis Alberto Estrada Lujan
  'be816e69-f684-4d18-8f5c-e4fe46e98a9b'   -- Blanca Orozco
);

-- Verificaciones esperadas:
--   select count(*) from ranking;                     -- 274
--   select count(*) from tickets
--     where telefono in ('5216142547959','5216142568695')
--       and status = 'aprobado';                      -- 2 (conservados)
