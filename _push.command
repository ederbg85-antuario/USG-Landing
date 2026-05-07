#!/bin/bash
# ============================================================
#  USG · empuja los cambios pendientes a GitHub (origin/main)
# ------------------------------------------------------------
#  Doble-click en este archivo en Finder para ejecutarlo, o
#  desde Terminal:
#     bash "_push.command"
# ============================================================
set -e
cd "$(dirname "$0")"

echo "▶︎ Limpiando candados antiguos de git..."
rm -f .git/index.lock .git/_lock_* .git/HEAD.lock.* 2>/dev/null || true

echo "▶︎ Agregando todos los cambios..."
git add -A

echo "▶︎ Estado actual:"
git status --short

echo ""
echo "▶︎ Creando commit..."
git commit -m "feat(landing): optimiza Hero, cancha vertical en móvil y nuevo logo de fondo

- Hero: imagen del estadio en 16:9 + object-contain en desktop para que
  se vea completa sin recortes; tipografía y spacing recalibrados.
- Fondo móvil: nueva cancha vertical (1080x1920, 9:16) con líneas
  más gruesas y elementos prominentes; usa position: fixed + 100dvh y
  evita background-attachment: fixed (buggy en iOS).
- Marca de agua del fondo: ahora usa el USG Logo blanco oficial
  entregado por el cliente (usg-logo-watermark.svg).
- Limpieza: marquee corrediza desactivada (componente y CSS) por
  solicitud del cliente; .gitignore actualizado para excluir
  artefactos fuente del brand kit y respaldos manuales." || echo "(sin cambios nuevos)"

echo ""
echo "▶︎ Push a origin/main (esto disparará el deploy automático en Vercel)..."
git push origin main

echo ""
echo "✓ ¡Listo! Vercel debería empezar el deploy en ~30 segundos."
