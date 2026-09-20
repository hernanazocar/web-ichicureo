# Videos para el sitio

## Video del Hero - Tour Virtual

Coloca aquí tu video de dron volando sobre campos.

**Nombre del archivo:** `drone-campo.mp4`

**Especificaciones recomendadas:**
- Formato: MP4 (H.264)
- Resolución: 1920x1080 (Full HD) o mayor
- Duración: 10-30 segundos
- Tamaño máximo: 10-20 MB (optimizado para web)
- FPS: 30 fps

**Dónde conseguir videos:**
1. Grabar tu propio video con drone
2. Pexels: https://www.pexels.com/es-es/buscar/videos/drone%20campo/
3. Pixabay: https://pixabay.com/es/videos/search/drone/
4. Coverr: https://coverr.co/

**Cómo optimizar el video para web:**
```bash
# Usando FFmpeg (si lo tienes instalado)
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k drone-campo.mp4
```

Una vez que coloques el video aquí, se reproducirá automáticamente en la página de Tour Virtual.
