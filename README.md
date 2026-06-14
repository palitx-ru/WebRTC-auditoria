# WebRTC STUN — Auditoría de Fuga de IP Real

Herramienta de auditoría que detecta si tu **extensión VPN** filtra tu IP real a través del protocolo WebRTC.  
Muchas VPN de navegador **no bloquean WebRTC**, lo que expone tu IP verdadera aunque creas estar protegido.

Probado con **Urban VPN** (extensión de Chrome) que prueba la fuga confirmada.

---

## ¿Cómo funciona?

Los navegadores usan WebRTC para comunicaciones en tiempo real (videollamadas, etc.).  
Para establecer conexiones, WebRTC hace peticiones STUN que revelan la IP pública real del dispositivo,**ignorando el proxy de la extensión VPN**.

---

## Cómo ejecutarlo (paso a paso)

No necesitas instalar nada. Solo necesitas un navegador.

### 1. Activa tu VPN (extensión del navegador)
Enciende la VPN que uses normalmente en tu navegador.

### 2. Verifica tu IP "visible"
Ve a https://www.cual-es-mi-ip.net/ (es un ejemplo para mirar tu ip)  
Anota la IP que aparece debería ser la IP del servidor VPN, no la tuya.

### 3. Abre las herramientas de desarrollador
Presiona `F12` o `Ctrl + Shift + I` y luego  ve a la pestaña "Console".

### 4. Pega y ejecuta el script
Copia todo el contenido de [`script.js`], pégalo en la consola y presiona `Enter`.

### 5. Interpreta el resultado


| 🔴 **PELIGRO FUGA DETECTADA** + IP visible | Tu VPN **no protege** contra WebRTC leak 

| 🟢 **SEGURO**  Tráfico bloqueado | Tu VPN bloquea WebRTC correctamente 

---

## ¿Cómo protegerte?

Si el script detectó una fuga, tienes estas opciones:

- Deshabilitar WebRTC en el navegador  en Firefox: `about:config` → `media.peerconnection.enabled` → `false`
- Usar una extensión anti-leak como *WebRTC Leak Prevent* o *uBlock Origin* (con la opción WebRTC activada)
- Cambiar a una VPN de escritorio (aplicación completa, no extensión)  estas sí enrutan todo el tráfico del sistema

---

## Aviso

Este script es únicamente para **auditoría personal** con el fin  que compruebes si tu propia VPN te protege.  
No recopila, envía ni almacena ningún dato. Todo ocurre localmente en tu navegador.
