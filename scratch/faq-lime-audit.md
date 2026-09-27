# FAQ y footer lima — auditoría Impeccable

Alcance: variante remix del FAQ y tratamiento cromático del footer. Se conserva el vidrio por decisión explícita del usuario.

## Resultado de diseño

La composición mantiene la identidad existente: título centrado, tarjetas oscuras, estados lima y firma recortada. No introduce ilustraciones, numeración decorativa, nuevas promesas ni animación continua. Las otras variantes no se modificaron.

| Dimensión | Nota / 4 | Evidencia y límites |
| --- | --- | --- |
| Accesibilidad | 3 | Botones nativos, Enter/Espacio/Tab comprobados en navegador, foco visible, regiones etiquetadas y paneles cerrados inertes. Zoom nativo no disponible en el navegador integrado. |
| Rendimiento | 3 | Sin dependencias nuevas, transición de altura limitada al acordeón de cuatro preguntas; blur existente conservado. Sin perfil de rendimiento formal. |
| Responsive | 4 | Revisión visual de escritorio, tablet y 320/375/414 px; sin desplazamiento horizontal. Respuesta española de 377 px completa. |
| Tematización | 3 | Fuentes y acento existentes; tonos lima locales aprobados. El detector identifica dos neutros locales fuera del catálogo de DESIGN.md. |
| Patrones visuales | 3 | Jerarquía y estados consistentes; vidrio y tarjetas mantenidos expresamente. |
| Total | 16/20 | Bueno; sin bloqueos detectados en el alcance. |

## Correcciones aplicadas

- Preguntas convertidas a botones con aria-expanded y aria-controls; foco visible y activación nativa por teclado.
- Eliminado el límite de 250 px; altura natural y respuesta completa en móvil.
- Seleccionar o pulsar una respuesta ya no cierra el acordeón.
- Estilos desacoplados de sui-card-hover para que los estados no sean anulados por reglas globales.
- Radio del botón alineado a 16 px tras el detector.
- Preferencia de movimiento reducido: título estático, transición instantánea del panel y CSS sin transiciones.
- Fondo y texto secundario del footer sin tonos azules. Contraste mínimo analítico aproximado de 6.17:1 sobre la composición sRGB de los tres gradientes; cálculo conservador sin el velo negro, que aumenta el contraste.

## Comprobaciones

- Inglés y español: contenido conservado mediante pruebas, cambio de idioma con una respuesta abierta y revisión visual.
- Apertura exclusiva, cierre al repetir pulsación y respuestas cerradas fuera del árbol accesible.
- Footer: 17 enlaces conservados, columnas y firma independientes; sin desbordamiento en 320/375/414 px.
- Reflujo adicional a 720 px como aproximación al espacio CSS de un viewport de 1440 px con zoom del 200 %. Los atajos de zoom no modifican el zoom del navegador integrado; no se declara una comprobación nativa al 200 %.
- Movimiento reducido comprobado por pruebas del componente y revisión de reglas CSS; no emulado a nivel del navegador.
- Consola de la vista previa: sin errores registrados durante la revisión.

## Observaciones

- [P3] Neutros #e3e8db y #cbd1c5 locales, fuera del catálogo de DESIGN.md. Son tonos deliberados para esta superficie; el primero está especificado por el plan. No se amplía el sistema global de colores en este cambio.
- [P3] Queda una comprobación manual del zoom nativo al 200 % en un navegador que lo exponga. El reflujo y las respuestas largas fueron verificados a anchos menores.

Los logs de checklist y build se conservan junto a este informe. La primera ejecución del checklist encontró una expectativa obsoleta en Industries.test.jsx; el archivo fue actualizado por trabajo externo a esta tarea y se lanzó una nueva ejecución completa.
