-- Unifica los distribuidores "ACEROS DEL PACIFICO" y "ACEROS CABOS" bajo un solo
-- nombre público ("Aceros del Pacífico"), a solicitud del cliente (correo de
-- Fernanda Angélica Maldonado, 20-ago-2026): ambas etiquetas corresponden al
-- mismo cliente (razón social ACEROS CABOS SA DE CV en public.distribuidores).
--
-- Afecta la vista public.ranking (usada por el ranking público en /ganadores)
-- y cualquier agregado por distribuidor derivado de public.tickets.tienda.
CREATE OR REPLACE FUNCTION public.normalizar_distribuidor(t text)
 RETURNS text
 LANGUAGE sql
 IMMUTABLE
AS $function$
  select case
    when t is null or btrim(t)='' then null
    when u ~ '(KONTABLA|CONTABLA)' then 'Hazlo! Kontabla'
    when u ~ 'OBREK|CENTRO CONSTRUCTOR MYP' then 'Obrek'
    when u ~ 'CIASA' then 'CIASA'
    when u ~ 'CENTRO DE PREFABRICADOS' then 'Centro de Prefabricados'
    when u ~ 'ALTAMATERIALES|ALTA MATERIALES|ALTAMATERALES|SOSA RENTERIA' then 'Altamateriales'
    when u ~ 'NAPRESA' then 'Napresa'
    when u ~ 'CONSTRUDECO' then 'Construdeco'
    when u ~ 'D ?Y ?C MATERIALES' then 'DYC Materiales'
    when u ~ 'CONSTRUCENTRO|COSTRUCENTRO|CONTRUCENTRO|CONSTRUCENTER|CONSTRU CENTRO|CONTRO CENTRO' then 'Materiales Construcentro'
    when u ~ 'VECTOR' then 'Vector'
    when u ~ 'PRONTOPANEL' then 'Prontopanel'
    when u ~ 'TOOLS PALACE' then 'Tools Palaces'
    when u ~ 'IMAC' then 'Grupo IMAC'
    when u ~ 'IDYCSA|MITRAS' then 'Idycsa'
    when u ~ 'MATERIALES DUQUE' then 'Materiales Duque'
    when u ~ 'IMAGINEM|IMAGINEN' then 'Imaginem Design & Create'
    when u ~ 'MULTIPLAFONES' then 'Multiplafones'
    when u ~ 'PLAFONES|PLATAFONES' then 'Plafones e Interiores'
    when u ~ 'ELECTRICA Y PLOMERIA DE SUDCALIFORNIA' then 'Eléctrica y Plomería de Sudcalifornia'
    when u ~ 'ACEROS DEL PACIFICO|ACEROS CABOS' then 'Aceros del Pacífico'
    when u ~ 'PLAMUR' then 'Plamur'
    when u ~ 'ISOTERMIKA' then 'Isotermika'
    when u ~ 'MIMENZA NOVELO' then 'Alfredo E. Mimenza Novelo'
    when u ~ 'DIMACO' then 'Dimaco'
    when u ~ 'APC DE CHIHUAHUA' then 'APC de Chihuahua'
    when u ~ '^USG' then 'USG (venta directa)'
    when u ~ 'SANRIV' then 'Ferretera Sanriv'
    when u ~ 'FERRETERIA Y MATERIALES SANTA' then 'Ferretería y Materiales Santa'
    when u ~ 'TOMOCHI' then 'Tomochi Obras y Servicios'
    when u ~ 'DIRCIO CHAVEZ' then 'Jessica C. Dircio Chávez'
    when u in ('CONTPAQI','GETNET','UNKNOWN','BLANCA OROZCO','SUCURSAL BUENAVISTA','ACAPULCO DE JUAREZ','ATERIALES','TERIALES','MATERIALES SA DE CV') then 'Otro / no identificado'
    else initcap(lower(btrim(t)))
  end
  from (select upper(btrim(t)) u) s;
$function$;

-- Baja de 4 participantes a solicitud del cliente (20-ago-2026): en la revisión
-- de "Ganadores por sucursal" se identificaron con distribuidor no vinculable al
-- Anexo 01. Se conservan sus tickets y compras (siguen aprobados y cuentan en la
-- facturación total); solo quedan fuera de la dinámica de premios.
UPDATE public.participantes
SET estado_cuenta = 'bloqueado',
    motivo_bloqueo = 'BAJA 20-ago-2026 a solicitud del cliente: en la revision de Ganadores por sucursal, parte de sus tickets aprobados no se pudieron vincular a un distribuidor autorizado del Anexo 01 (aparecen como Otro / no identificado). Bases clausula 3. Sus tickets siguen APROBADOS y su compra sigue contando en la facturacion total; solo queda fuera de la dinamica de premios.'
WHERE id IN (
  '8f97554d-52db-4ad9-a15d-e641b0593ef6',
  '21362ee8-0951-4f81-a32a-e0c0f56ba857',
  'c50401d2-2f66-46cd-8071-cb5abf10d703',
  '76cca6be-63e7-4753-bc5d-6dbe86ed78c0'
);
