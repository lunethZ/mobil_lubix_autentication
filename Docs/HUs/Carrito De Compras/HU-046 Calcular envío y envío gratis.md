# HU-046 — Calcular envío y envío gratis

## Identificación

| Campo | Valor |
|---------|---------|
| ID | HU-046 |
| Título | Calcular envío y envío gratis |
| Módulo | Carrito de Compras |
| Prioridad | Alta |
| Estado | Implementado |
| RF asociados | RF-047 |

---

## Historia

Como usuario de Lubix, quiero saber cuánto cuesta el envío de mi compra y obtener envío gratis al alcanzar cierto monto, para conocer el total final claramente.

---

## Criterios de aceptación

### CA-046.1 — Cálculo del costo de envío

**Dado que** estoy en el carrito de compras,

**cuando** el subtotal es menor a 100000 COP,

**entonces** el sistema muestra el costo de envío de 15000 COP en el resumen.

---

### CA-046.2 — Banner de envío gratis

**Dado que** el subtotal es menor a 100000 COP,

**cuando** reviso el carrito,

**entonces** debo ver un banner que indica cuánto me falta para obtener envío gratis.

---

### CA-046.3 — Envío gratis alcanzado

**Dado que** el subtotal es 100000 COP o más,

**cuando** reviso el resumen del carrito,

**entonces** el envío aparece como "Gratis" y no suma al total.

---

### CA-046.4 — Reflejo en el checkout

**Dado que** el envío fue calculado en el carrito,

**cuando** estoy en el resumen del pedido,

**entonces** el envío y el total a pagar se muestran correctamente aplicando la regla de envío gratis.

---

### CA-046.5 — Carrito vacío

**Dado que** el carrito no tiene productos,

**cuando** reviso el resumen,

**entonces** el envío es 0 y no se agrega ningún costo adicional.

---