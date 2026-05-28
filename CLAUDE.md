# Instrucciones para Claude Code

## REGLA CRÍTICA — Rutas de archivos

Este proyecto Next.js vive en la carpeta `frontend/`.

NUNCA escribas archivos en:
- AnalizadorMX/frontend/
- AnalizadorMX/frontend/analizadorligamx/
- Ninguna ruta que contenga "AnalizadorMX"

La carpeta AnalizadorMX/ es el proyecto React anterior, 
solo existe como referencia histórica. No se modifica.

Toda implementación nueva va en:
- frontend/app/
- frontend/app/components/
- frontend/public/
