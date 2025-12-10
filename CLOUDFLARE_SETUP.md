# Configurar Cloudflare con Vercel - Guía Paso a Paso

## 🎯 Resumen Rápido

Cloudflare actúa como intermediario entre tu dominio y Vercel. Necesitas configurar los registros DNS en Cloudflare para que apunten a Vercel.

---

## 📋 Paso a Paso Detallado

### **1. Primero en Vercel**

1. Ve a tu proyecto en Vercel
2. **Settings** → **Domains**
3. Añade:
   - `flecsa.com`
   - `www.flecsa.com`
4. Vercel te mostrará los valores DNS que necesitas

### **2. En Cloudflare**

#### **A. Accede a tu Panel**
1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com)
2. Selecciona el dominio `flecsa.com`

#### **B. Ve a la Sección DNS**
1. En el menú lateral, click en **DNS**
2. Click en **Records** (Registros)

#### **C. Configura los Registros**

**Opción 1: Usando CNAME (Recomendado para Cloudflare)**

Para `flecsa.com` (dominio principal):
```
Tipo: CNAME
Nombre: @
Contenido: cname.vercel-dns.com
Proxy: OFF (nube gris) ⚠️ IMPORTANTE
TTL: Auto
```

Para `www.flecsa.com`:
```
Tipo: CNAME
Nombre: www
Contenido: cname.vercel-dns.com
Proxy: OFF (nube gris) ⚠️ IMPORTANTE
TTL: Auto
```

**Opción 2: Usando A Record (Si CNAME no funciona)**

Para `flecsa.com`:
```
Tipo: A
Nombre: @
Contenido: 76.76.21.21
Proxy: OFF (nube gris)
TTL: Auto
```

Para `www.flecsa.com`:
```
Tipo: CNAME
Nombre: www
Contenido: cname.vercel-dns.com
Proxy: OFF (nube gris)
TTL: Auto
```

### **3. Elimina Registros Conflictivos**

Si ya tienes registros A o CNAME para `@` o `www`, elimínalos o edítalos:
- Busca registros existentes con nombre `@` o `www`
- Si existen, edítalos o elimínalos
- Añade los nuevos registros de Vercel

### **4. Configuración del Proxy de Cloudflare**

⚠️ **IMPORTANTE**: Para Vercel, es mejor tener el **Proxy DESACTIVADO** (nube gris):

- **Proxy OFF (nube gris)**: DNS directo, Vercel maneja SSL
- **Proxy ON (nube naranja)**: Puede causar problemas con SSL de Vercel

**Recomendación**: Deja el proxy **OFF** para los registros de Vercel.

### **5. Verificación**

1. **En Cloudflare:**
   - Los registros deberían aparecer en la lista
   - Estado: "Active" (activo)

2. **En Vercel:**
   - Ve a Settings → Domains
   - Deberías ver:
     - ✅ `flecsa.com` - Valid Configuration
     - ✅ `www.flecsa.com` - Valid Configuration
   - Si dice "Invalid Configuration", espera 1-5 minutos

3. **Prueba el dominio:**
   - Abre `https://flecsa.com` en el navegador
   - Debería cargar tu sitio de Vercel

---

## 🔧 Configuración Avanzada (Opcional)

### **Si quieres usar el Proxy de Cloudflare:**

Si activas el proxy (nube naranja), necesitas:

1. **En Cloudflare → SSL/TLS:**
   - Modo: **Full** (no "Full Strict")
   - Esto permite que Cloudflare se comunique con Vercel

2. **En Vercel:**
   - Vercel seguirá funcionando, pero Cloudflare estará en medio
   - Puede haber pequeñas latencias adicionales

### **Configurar Redirecciones:**

Si quieres redirigir `www` → dominio principal o viceversa:

**En Cloudflare → Rules → Redirect Rules:**
```
Si la URL coincide con: http://www.flecsa.com/*
Redirigir a: https://flecsa.com/$1
Código: 301
```

O hazlo en Vercel → Settings → Domains (Vercel puede manejar esto automáticamente).

---

## ⚠️ Problemas Comunes

### **"Invalid Configuration" en Vercel**

**Solución:**
1. Verifica que los registros DNS están correctos en Cloudflare
2. Asegúrate de que el Proxy está OFF (nube gris)
3. Espera 5-10 minutos
4. Verifica en [dnschecker.org](https://dnschecker.org) que los DNS se han propagado

### **El sitio no carga**

**Solución:**
1. Verifica que Vercel muestra "Valid Configuration"
2. Limpia la caché del navegador (Ctrl+Shift+Delete)
3. Prueba en modo incógnito
4. Verifica que el build en Vercel fue exitoso

### **Error de SSL/HTTPS**

**Solución:**
1. Si usas Proxy OFF: Vercel maneja SSL automáticamente (espera 5-10 min)
2. Si usas Proxy ON: Ve a Cloudflare → SSL/TLS → Modo: Full

### **Los cambios no se reflejan**

**Solución:**
1. Cloudflare tiene caché: Espera 1-5 minutos
2. Limpia la caché del navegador
3. Prueba desde otro dispositivo/red

---

## 📝 Checklist Final

- [ ] Dominio añadido en Vercel (flecsa.com y www.flecsa.com)
- [ ] Registros DNS configurados en Cloudflare
- [ ] Proxy OFF (nube gris) para registros de Vercel
- [ ] Registros antiguos eliminados/actualizados
- [ ] Vercel muestra "Valid Configuration"
- [ ] Sitio accesible en https://flecsa.com
- [ ] SSL activo (candado verde en el navegador)

---

## 🎉 ¡Listo!

Una vez configurado, cada vez que hagas `git push`:
- Vercel desplegará automáticamente
- Cloudflare servirá el contenido
- Tu sitio estará en producción en `flecsa.com`

---

## 📞 Soporte

Si tienes problemas:
- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Cloudflare**: [community.cloudflare.com](https://community.cloudflare.com)





