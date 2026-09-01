# HU-055 — Gestionar estado de pedido desde la empresa

## Identificación

| Campo | Valor |
|---------|---------|
| ID | HU-055 |
| Título | Gestionar estado de pedido desde la empresa |
| Módulo | Pedidos |
| Prioridad | Alta |
| Estado | Implementado |
| RF asociados | RF-055 |

---

## Historia

Como empresa de Lubix, quiero confirmar, enviar y entregar los pedidos que recibo, para controlar el proceso de mis ventas dentro de la plataforma.

---

## Criterios de aceptación

### CA-055.1 — Acción para confirmar pedido

**Dado que** recibo un pedido en estado pendiente,

**cuando** reviso el pedido,

**entonces** debo ver las acciones "Confirmar" y "Rechazar" para decidir qué hago con él.

---

### CA-055.2 — Confirmación del pedido

**Dado que** confirmo un pedido,

**cuando** la acción se procesa,

**entonces** el pedido pasa a estado "confirmado".

---

### CA-055.3 — Marcar como enviado

**Dado que** tengo un pedido confirmado,

**cuando** lo despacho,

**entonces** debo poder marcarlo como "enviado".

---

### CA-055.4 — Marcar como entregado

**Dado que** tengo un pedido enviado,

**cuando** el comprador lo recibe,

**entonces** debo poder marcarlo como "entregado".

---

### CA-055.5 — Rechazo del pedido

**Dado que** rechazo un pedido pendiente o confirmado,

**cuando** la acción se procesa,

**entonces** el pedido pasa a estado "cancelado".

---

### CA-055.6 — Transiciones inválidas bloqueadas

**Dado que** intento aplicar un cambio de estado no permitido,

**cuando** envío la acción,

**entonces** el sistema impide el cambio y no modifica el pedido.

---