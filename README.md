# Editorial Social AI

Aplicación web para transformar artículos de Internet en carruseles editoriales profesionales para redes sociales.

## Flujo

**URL del artículo → análisis → referencia visual → Brand/Template System → Content Brief → Design Brief → generación → editor → exportación**

## Referencia visual

El usuario puede cargar una imagen PNG, JPG o WEBP desde el proyecto. La referencia se trata como **dirección artística**, no como una pieza para copiar. La futura capa de visión deberá extraer de ella:

- paleta y contraste
- jerarquía tipográfica
- grid y proporciones
- ritmo entre texto e imagen
- tratamiento fotográfico
- bordes, radios y espaciados
- estilo de titulares, subtítulos y CTA

La imagen de referencia proporcionada para este proyecto corresponde a un lenguaje editorial contemporáneo con rojo, blanco y negro, tipografía sans-serif pesada, composición modular y alternancia entre fotografía y bloques tipográficos.

## Arquitectura prevista

- `frontend`: React + TypeScript + Vite
- `content-extraction`: servicio aislado para recuperar y normalizar artículos
- `content-engine`: genera un Content Brief estructurado sin inventar hechos
- `design-engine`: convierte el brief y la referencia en Design Brief
- `image-engine`: proveedor intercambiable para generación de imágenes
- `brand-system`: identidad visual persistente y configurable
- `template-system`: layouts reutilizables por tipo de slide
- `editor`: edición individual y regeneración localizada
- `storage`: proyectos, presets y versiones
- `export`: composición final para 1:1, 4:5 y 9:16

## Estado actual

La primera iteración implementa la experiencia visual principal: carga de referencia, previsualización, URL del artículo, formato, cantidad de slides y selección de template. Las conexiones reales a extracción web, IA, almacenamiento y generación de imágenes deben implementarse como servicios desacoplados.

## Desarrollo

```bash
npm install
npm run dev
```

No se deben colocar claves privadas de proveedores de IA en el frontend. Las credenciales de servicios externos deben permanecer en el backend mediante variables de entorno.
