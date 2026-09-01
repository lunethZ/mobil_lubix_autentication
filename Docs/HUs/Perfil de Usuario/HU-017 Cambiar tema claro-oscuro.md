# HU-017 — Cambiar tema claro/oscuro

## Identificación

| Campo | Valor |
|---------|---------|
| ID | HU-017 |
| Título | Cambiar tema claro/oscuro |
| Módulo | Perfil de Usuario |
| Prioridad | Baja |
| Estado | Implementado |
| RF asociados | RF-017 |

---

## Historia

Como usuario de Lubix, quiero cambiar el tema de la aplicación entre claro y oscuro, para adaptarla a mi preferencia visual.

---

## Criterios de aceptación

### CA-017.1 — Botón de tema en el perfil

**Dado que** accedo a mi perfil,

**cuando** reviso las opciones de la pantalla,

**entonces** debo ver un botón con un ícono de sol o luna que permite alternar el tema.

---

### CA-017.2 — Cambio inmediato del tema

**Dado que** presiono el botón de tema,

**cuando** se activa la acción,

**entonces** la aplicación cambia a tema claro u oscuro de forma inmediata en todas las pantallas.

---

### CA-017.3 — Persistencia de la elección

**Dado que** elegí un tema,

**cuando** cierro y reabro la aplicación,

**entonces** se conserva el tema seleccionado.

---

### CA-017.4 — Tema del sistema como predeterminado

**Dado que** no he seleccionado un tema,

**cuando** abro la aplicación por primera vez,

**entonces** se usa el tema del sistema operativo.

---