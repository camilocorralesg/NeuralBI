# NeuralBI - Reglas y Directivas para Agentes de IA

Este archivo contiene las directivas operativas obligatorias para cualquier agente que trabaje en el repositorio **NeuralBI**. Deben cumplirse sin excepción en cada tarea y ciclo de desarrollo.

---

## 1. Regla Mandatoria: Ejecución Obligatoria de Pruebas Antes de Publicar Código

> [!IMPORTANT]
> **NUNCA hagas commit, push ni despliegues código nuevo sin antes haber ejecutado y aprobado la suite de pruebas.**
> El usuario no debe tener que recordarte correr las pruebas; esta validación es automática y autónoma.

### Flujo de Verificación Obligatorio:

1. **Antes de hacer `git commit` o `git push`:**
   Ejecuta siempre la suite completa de pruebas:
   ```bash
   npm run test
   ```
   Todas las pruebas deben finalizar en verde (`100% passed`, código de salida `0`).

2. **Antes de entregas mayores, cambios estructurales o releases a producción:**
   Ejecuta el pipeline unificado de pre-despliegue:
   ```bash
   npm run checklist
   ```
   Este comando valida en cadena:
   - `oxlint`: Calidad y sintaxis del código sin errores.
   - `vitest run`: Suite completa de Unit Tests y Pruebas de Integración.
   - `next build`: Generación y compilación estática de todas las páginas de producción sin advertencias críticas.

3. **Mantenimiento y Actualización de Pruebas:**
   - Si una modificación de código altera intencionalmente una funcionalidad existente (validaciones de formulario, URLs de SEO, campos de Zoho CRM, etc.), es responsabilidad del agente **actualizar las pruebas asociadas en `test/`** en el mismo commit para mantener el 100% de cobertura funcional.
   - Prohibido eliminar o desactivar tests (`skip` / `todo`) para forzar un pase artificial.

---

## 2. Regla: Un Solo Servidor de Desarrollo y Carpetas Separadas

Varios agentes pueden trabajar en este repositorio a la vez. Para que no se pisen:

- **Desarrollo:** `npm run dev` en `http://localhost:3000/NeuralBI`, escribe en `.next-dev/`. Debe haber **un solo** servidor de desarrollo. Antes de arrancar otro, comprueba si el puerto 3000 ya responde y reutilízalo.
- **Build:** `npm run build` / `npm run checklist` / `next start` usan `.next/`. `next.config.mjs` separa las carpetas por fase, así que un build puede correr con el servidor de desarrollo encendido sin romperlo.
- **Servidores de QA temporales** (`next start -p <puerto>`, arneses de capturas): ciérralos al terminar, incluido el árbol de procesos (en Windows, `taskkill /pid <pid> /T /F`).
- No borres `.next-dev/` mientras el servidor de desarrollo esté corriendo.
