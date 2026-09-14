# Regla de Verificación y Testing Automatizado

- **Siempre correr pruebas antes de publicar:** Antes de cualquier `git commit`, `git push` o entrega al usuario, el agente debe ejecutar de forma autónoma:
  ```bash
  npm run test
  ```
- **Checklist de pre-despliegue:** Para despliegues o cambios estructurales, ejecutar:
  ```bash
  npm run checklist
  ```
- **No publicar código roto:** Si alguna prueba falla, debe corregirse el código o actualizarse la prueba correspondiente antes de confirmar la tarea.
- **Autonomía:** Esta directiva no requiere recordatorio por parte del usuario.
