# HU-009 — Verificación de empresa

## Identificación

| Campo | Valor |
|---------|---------|
| ID | HU-009 |
| Título | Verificación de empresa |
| Módulo | Autenticación |
| Prioridad | Alta |
| Estado | Pendiente |
| RF asociados | RF-009 |

---

## Historia

Como empresa de Lubix, quiero completar la verificación de mi cuenta con mi documentación, para que mi empresa quede validada y pueda publicar productos en la plataforma.

---

## Criterios de aceptación

### CA-009.1 — Acceso a la sección de verificación

**Dado que** soy una empresa registrada,

**cuando** ingreso a mi panel,

**entonces** debo ver una sección de verificación que muestre el estado actual de mi cuenta (pendiente, verificada o rechazada).

---

### CA-009.2 — Envío de documentación

**Dado que** mi empresa no está verificada,

**cuando** ingreso la sección de verificación,

**entonces** debo poder cargar mi NIT y los documentos de constitución requeridos.

---

### CA-009.3 — Solicitud registrada

**Dado que** envío mi documentación,

**cuando** el sistema la recibe,

**entonces** debo ver una confirmación de que la solicitud fue enviada y mi estado cambia a pendiente de validación.

---

### CA-009.4 — Estado después de la validación

**Dado que** el administrador valida mi documentación,

**cuando** reviso mi panel,

**entonces** mi empresa debe aparecer como verificada y habilitada para publicar productos.

---

### CA-009.5 — Verificación rechazada

**Dado que** el administrador rechaza mi documentación,

**cuando** reviso mi panel,

**entonces** debo ver el motivo del rechazo y poder corregir y reenviar la documentación.

---

### CA-009.6 — Restricción hasta verificar

**Dado que** mi empresa aún no está verificada,

**cuando** intento publicar o gestionar productos,

**entonces** el sistema debe impedirlo e informarme que la verificación es obligatoria.

---