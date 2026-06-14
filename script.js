// ============================================================
//  WebRTC STUN — Auditoría de Fuga de IP Real
// Autor: palitx
//  Prueba si tu extensión VPN filtra tu IP real por WebRTC
// ============================================================

console.clear();

console.log("%c AUDITORÍA WEBRTC - DETECTOR DE FUGAS", "color:white; font-size: 16px; font-weight: bold;");
console.log("");

const configuracion = { 
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] 
};

const pc = new RTCPeerConnection(configuracion);
pc.createDataChannel("");
pc.createOffer().then(oferta => pc.setLocalDescription(oferta));

const ipsReales = new Set();

pc.onicecandidate = (evento) => {
    if (!evento.candidate) return;
    
    const candidato = evento.candidate.candidate;
    const partes = candidato.split(' ');
    const ipExtraida = partes[4];
    
    const esIPValida = (ip) => {
        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
        const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
        return ipv4Regex.test(ip) || ipv6Regex.test(ip);
    };
    
    if (!ipExtraida || ipExtraida.includes('.local') || !esIPValida(ipExtraida)) return;
    if (ipsReales.has(ipExtraida)) return;
    ipsReales.add(ipExtraida);
    
    const esPrivada = ipExtraida.match(/^(192\.168|10\.|172\.(1[6-9]|2\d|3[0-1])|127\.|169\.254)/);
    
    if (!esPrivada) {
        console.log("%c FUGA DETECTADA", "font-size: 15px; font-weight: bold;");
        console.log("%c El navegador ignoró el proxy. Tu IP real es:", "color: white; font-size: 13px;");
        console.log("");
        console.log("%c  " + ipExtraida + "  ", "color: #000000; background: #ffff00; font-size: 22px; font-weight: 900; padding: 12px 24px;");
        console.log("");
        console.log("%c⚠ VULNERABILIDAD: WebRTC/STUN bypass", "color: red; font-size: 12px;");
        console.log("%c⚠ Tu ubicación real es visible", "color: red; font-size: 12px;");
    }
};

setTimeout(() => {
    if (ipsReales.size === 0) {
        console.log("%c✅ SIN FUGAS DETECTADAS", "color: #00c853; font-size: 15px; font-weight: bold;");
        console.log("%c Tráfico WebRTC bloqueado o enrutado correctamente.", "color: white; font-size: 13px;");
        console.log("%c Tu IP real está protegida.", "color: white; font-size: 13px;");
    }
}, 5000);