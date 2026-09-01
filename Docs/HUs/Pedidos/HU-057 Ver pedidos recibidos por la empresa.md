# HU-057 — Ver pedidos recibidos por la empresa

## Identificación

| Campo | Valor |
|---------|---------|
| ID | HU-057 |
| Título | Ver pedidos recibidos por la empresa |
| Módulo | Pedidos |
| Prioridad | Alta |
| Estado | Implementado |
| RF asociados | RF-057 |

---

## Historia

Como empresa de Lubix, quiero ver los pedidos que recibo con sus productos, comprador y estado, para gestionar y organizar mis ventas.

---

## Criterios de aceptación

### CA-057.1 — Listado de pedidos recibidos

**Dado que** soy una empresa autenticada con pedidos realizados,

**cuando** accedo a la sección de pedidos,

**entonces** veo una lista con todos los pedidos que contienen mis productos.

---

### CA-057.2 — Información resumida del pedido

**Dado que** reviso la lista de pedidos,

**cuando** observo cada pedido,

**entonces** veo información resumida como número de pedido, fecha y estado.

---

### CA-057.3 — Detalle completo del pedido

**Dado que** selecciono un pedido de la lista,

**cuando** abro su detalle,

**entonces** veo los productos, cantidades, precio total, dirección de envío y datos del comprador.

---

### CA-057.4 — Nombre y email del comprador

**Dado que** abro el detalle de un pedido recibido,

**cuando** reviso la información,

**entonces** veo el nombre y el email del comprador.

---

### CA-057.5 — Progreso y fecha estimada

**Dado que** reviso un pedido recibido,

**cuando** consulto su estado,

**entonces** veo el progreso de entrega y la fecha estimada de entrega.

---