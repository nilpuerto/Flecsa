# Guía de Despliegue en Vercel - Flecsa.com

## 📋 Requisitos Previos

1. **Cuenta en Vercel**: Ve a [vercel.com](https://vercel.com) y crea una cuenta (puedes usar GitHub, GitLab o email)
2. **Dominio**: Tienes `flecsa.com` listo para usar
3. **Código en Git**: Tu código debe estar en GitHub, GitLab o Bitbucket

---

## 🚀 Paso a Paso

### **Paso 1: Preparar el Favicon**

El favicon debe estar en la carpeta `public`, no en `src/assets`:

```bash
# Copia paper.png a public
cp src/assets/paper.png public/favicon.png
```

Luego actualiza `index.html`:
```html
<link rel="icon" type="image/png" href="/favicon.png" />
```

### **Paso 2: Verificar el Build**

Prueba que el build funciona localmente:

```bash
cd zerlo
npm run build
```

Esto crea una carpeta `dist` con los archivos listos para producción.

### **Paso 3: Subir a Git (si no lo has hecho)**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

### **Paso 4: Conectar con Vercel**

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Click en **"Add New Project"** o **"Import Project"**
3. Conecta tu repositorio (GitHub/GitLab/Bitbucket)
4. Selecciona el repositorio donde está tu código

### **Paso 5: Configurar el Proyecto en Vercel**

Vercel detectará automáticamente que es un proyecto Vite, pero verifica:

- **Framework Preset**: Vite
- **Root Directory**: `zerlo` (si tu repo tiene la carpeta zerlo)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### **Paso 6: Variables de Entorno (si las necesitas)**

Si tu frontend necesita variables de entorno (como `VITE_API_URL`):

1. En Vercel, ve a **Settings** → **Environment Variables**
2. Añade las variables necesarias:
   - `VITE_API_URL` = `https://tu-backend.com` (si tienes backend)

### **Paso 7: Desplegar**

1. Click en **"Deploy"**
2. Espera 2-3 minutos mientras Vercel:
   - Instala dependencias
   - Ejecuta el build
   - Despliega el sitio

### **Paso 8: Configurar el Dominio flecsa.com en Cloudflare**

1. En Vercel, ve a tu proyecto → **Settings** → **Domains**
2. Añade `flecsa.com` y `www.flecsa.com`
3. Vercel te dará instrucciones para configurar DNS

4. **En Cloudflare:**
   - Ve a tu panel de Cloudflare → Selecciona el dominio `flecsa.com`
   - Ve a **DNS** → **Records**

5. **Configuración DNS en Cloudflare:**

   **Para el dominio principal (flecsa.com):**
   - Si Cloudflare está en modo **DNS Only** (gris):
     ```
     Tipo: CNAME
     Nombre: @
     Contenido: cname.vercel-dns.com
     Proxy: Desactivado (nube gris)
     ```
   - Si Cloudflare está en modo **Proxied** (naranja):
     ```
     Tipo: A
     Nombre: @
     Contenido: 76.76.21.21
     Proxy: Activado (nube naranja) - OPCIONAL
     ```
     O también puedes usar:
     ```
     Tipo: CNAME
     Nombre: @
     Contenido: cname.vercel-dns.com
     Proxy: Desactivado (nube gris) - RECOMENDADO para Vercel
     ```

   **Para www.flecsa.com:**
   ```
   Tipo: CNAME
   Nombre: www
   Contenido: cname.vercel-dns.com
   Proxy: Desactivado (nube gris) - RECOMENDADO
   ```

6. **Importante en Cloudflare:**
   - **Desactiva el Proxy (nube gris)** para los registros de Vercel para evitar problemas
   - Si quieres usar el proxy de Cloudflare, Vercel puede funcionar pero puede haber conflictos con SSL
   - Espera 1-5 minutos (Cloudflare es muy rápido)

7. **Verificación:**
   - Vercel detectará automáticamente cuando los DNS estén configurados
   - En Vercel → Settings → Domains verás el estado (Valid Configuration)

### **Paso 9: Verificar SSL**

Vercel automáticamente:
- ✅ Configura SSL/HTTPS (certificado gratuito)
- ✅ Redirige HTTP → HTTPS
- ✅ Configura www → dominio principal

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas `git push` a tu repositorio:
- Vercel detectará los cambios automáticamente
- Creará un nuevo deployment
- Si todo está bien, lo pondrá en producción

---

## 📁 Estructura del Proyecto

```
zerlo/
├── dist/              ← Se genera con `npm run build` (NO subir a git)
├── public/            ← Archivos estáticos (favicon, etc.)
├── src/               ← Tu código React
├── vercel.json        ← Configuración de Vercel
└── package.json
```

---

## ⚠️ Notas Importantes

1. **SPA Routing**: El archivo `vercel.json` ya está configurado para que todas las rutas redirijan a `index.html` (necesario para React Router)

2. **Backend**: Si tienes backend en otro servidor, asegúrate de configurar CORS para permitir requests desde `flecsa.com`

3. **Variables de Entorno**: Las variables que empiezan con `VITE_` son públicas en el frontend. No pongas secretos ahí.

4. **Build Local**: Siempre prueba `npm run build` localmente antes de hacer push

---

## 🆘 Problemas Comunes

**Error: "Build failed"**
- Verifica que `npm run build` funciona localmente
- Revisa los logs en Vercel para ver el error específico

**El dominio no funciona**
- Espera más tiempo (DNS puede tardar hasta 24h)
- Verifica que los registros DNS están correctos
- Usa [dnschecker.org](https://dnschecker.org) para verificar propagación

**Las rutas no funcionan (404)**
- Asegúrate de que `vercel.json` tiene el rewrite configurado
- Verifica que estás usando React Router correctamente

---

## ✅ Checklist Final

- [ ] Favicon copiado a `public/`
- [ ] `npm run build` funciona localmente
- [ ] Código subido a Git
- [ ] Proyecto conectado en Vercel
- [ ] Build exitoso en Vercel
- [ ] Dominio añadido en Vercel
- [ ] DNS configurado en tu proveedor de dominio
- [ ] SSL activo (automático en Vercel)
- [ ] Sitio accesible en flecsa.com

---

¡Listo! Tu sitio estará en producción en minutos. 🎉

