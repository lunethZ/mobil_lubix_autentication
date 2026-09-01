# RF-008 — Visualización de contraseña

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-008 |
| Nombre | Visualización de contraseña |
| Módulo | Autenticación |
| Prioridad | Media |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe permitir al usuario mostrar u ocultar la contraseña en el formulario de inicio de sesión mediante un ícono de ojo, para verificar que la escribió correctamente antes de enviar sus credenciales.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
|--------|------|-------------|--------------|
| Ojo para mostrar contraseña | Botón (ícono) | No | Alterna el tipo del campo entre `password` y `text` |

---

## Proceso

- El usuario ingresa la contraseña en el campo del formulario.
- El campo se muestra enmascarado por defecto (`type="password"`).
- El usuario presiona el ícono de ojo dentro del campo.
- El sistema alterna el tipo del campo a `text`, mostrando la contraseña.
- Al volver a presionar el ícono, la contraseña se oculta nuevamente.
- El ícono refleja el estado: ojo abierto (visible) u ojo tachado (oculto).

---

## Salidas

| Escenario | Resultado |
|------------|-----------|
| Usuario presiona el ojo | La contraseña se muestra en texto plano |
| Usuario vuelve a presionar el ojo | La contraseña se oculta de nuevo |
| Estado inicial | Contraseña oculta por defecto |

---

## Archivos asociados

| Módulo | Ruta/Archivo |
|--------|--------------|
| Frontend | `frontend/src/pages/login.tsx` (estado `showPassword`, `EyeIcon`/`EyeSlashIcon`) |

---

## Reglas de negocio

RN-001: La contraseña siempre debe mostrarse enmascarada por defecto.  
RN-002: La visibilidad de la contraseña no debe persistirse entre sesiones.  
RN-003: El botón de visibilidad no debe representar un envío del formulario.