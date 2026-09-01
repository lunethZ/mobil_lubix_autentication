# RF-017 — Cambiar tema claro/oscuro

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-017 |
| Nombre | Cambiar tema claro/oscuro |
| Módulo | Perfil de Usuario |
| Prioridad | Baja |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe permitir al usuario alternar el tema de la aplicación entre claro y oscuro desde su perfil, y recordar su elección.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
|--------|------|-------------|--------------|
| toggle | Acción | No | Sin datos adicionales |

---

## Proceso

- El usuario accede a su perfil.
- Presiona el botón de tema (sol/luna).
- El sistema cambia el tema global a claro u oscuro de forma inmediata.
- La preferencia se guarda localmente y se restaura al reabrir la app.
- Si no hay preferencia guardada, se usa el tema del sistema.

---

## Salidas

| Escenario | Resultado |
|------------|-----------|
| Presionar el botón | Tema alternado inmediatamente |
| Reabrir la app | Se conserva el tema elegido |
| Sin preferencia | Tema del sistema |

---

## Reglas de negocio

RN-001: La elección de tema se almacena localmente en el dispositivo.  
RN-002: El cambio de tema aplica a todas las pantallas de la app.  
RN-003: El tema del sistema se usa como valor por defecto.