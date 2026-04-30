# USG Liga de Campeones — Landing Page

Landing page oficial de la promoción **USG Liga de Campeones** para la dinámica de acumulación de puntos. El registro y la gestión de tickets se realiza 100% por WhatsApp; esta landing es informativa y dirige tráfico al chat oficial.

Construida con **Next.js 14 (App Router) + TypeScript + Tailwind CSS** — lista para deploy directo a Vercel.

---

## ⚡ Quick start

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## 🔧 Configuración antes de desplegar

### 1. Reemplazar el número de WhatsApp

Abre el archivo `lib/config.ts` y reemplaza el valor de `whatsappNumber` con el número real (formato internacional sin signos):

```ts
export const SITE_CONFIG = {
  whatsappNumber: "5215512345678", // ← Cambiar este número
  // ...
};
```

**Formato:** `52` (México) + `1` (celular) + 10 dígitos. Ejemplo: para `+52 55 1234 5678` usa `"5215512345678"`.

### 2. (Opcional) Personalizar el mensaje pre-llenado

En el mismo archivo, ajusta `whatsappMessage` con el texto inicial que verá el usuario al abrir el chat.

### 3. (Opcional) Productos y premios

Si la lista oficial de productos o los montos de premios cambian, edita los arrays `PRODUCTS_BASIC`, `PRODUCTS_PREMIUM` y `PRIZES` en `lib/config.ts`. La UI se actualiza automáticamente.

---

## 🚀 Deploy en Vercel

### Opción A — Desde GitHub (recomendado)

1. Crea un repo en GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: USG Liga de Campeones landing"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<repo>.git
   git push -u origin main
   ```

2. Entra a [vercel.com/new](https://vercel.com/new), selecciona el repo y haz **Import**.

3. Vercel detecta Next.js automáticamente. No necesitas configurar nada extra. Click **Deploy**.

4. En 1-2 minutos tendrás el dominio `*.vercel.app`. Después puedes conectar el dominio personalizado desde Settings → Domains.

### Opción B — Vercel CLI

```bash
npm install -g vercel
vercel
```

Sigue las instrucciones interactivas.

---

## 📁 Estructura del proyecto

```
.
├── app/
│   ├── layout.tsx          # Layout raíz, metadata, fonts
│   ├── page.tsx            # Página principal (compone los componentes)
│   └── globals.css         # Estilos globales + utilidades custom
├── components/
│   ├── Header.tsx          # Navegación fija superior
│   ├── Hero.tsx            # Sección principal con CTA WhatsApp
│   ├── HowToPlay.tsx       # 4 pasos de la mecánica
│   ├── Products.tsx        # Productos básicos vs premium
│   ├── Prizes.tsx          # Premios y bolsa total
│   ├── FAQ.tsx             # Preguntas frecuentes (acordeón)
│   ├── FinalCTA.tsx        # CTA grande de cierre
│   ├── Footer.tsx          # Footer con T&C y legales
│   └── WhatsAppFloat.tsx   # Botón flotante de WhatsApp
├── lib/
│   └── config.ts           # ⭐ Configuración global (número, productos, premios)
├── public/
│   └── images.png          # Logo USG
├── tailwind.config.ts      # Configuración Tailwind + paleta USG
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🎨 Paleta de colores

- **Rojo USG:** `#C8102E` (CTA, acentos)
- **Rojo oscuro:** `#9E0A21` (gradientes)
- **Negro:** `#0A0A0A` (fondo principal)
- **Verde WhatsApp:** `#25D366` (botones de conversión)

Definidos en `tailwind.config.ts` como `usg-red`, `usg-red-dark`, `usg-black`.

---

## 📝 Pendientes / próximos pasos

- [ ] Reemplazar número de WhatsApp en `lib/config.ts`
- [ ] Confirmar copy oficial con USG (mecánica, productos, vigencia)
- [ ] Agregar fotos reales de los premios (carpeta `public/`)
- [ ] Conectar Vercel con dominio personalizado (ej. `liga.usg.com.mx`)
- [ ] Agregar pixel de tracking si aplica (GA4, Meta Pixel)
- [ ] Revisión legal final de Términos y Condiciones

---

## 📞 Contacto técnico

Desarrollado por **Antuario × Métrica BTL**.

Cualquier duda: hola@antuario.mx
