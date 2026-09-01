# RF-047 — Calcular envío y envío gratis

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-047 |
| Nombre | Calcular envío y envío gratis |
| Módulo | Carrito de Compras |
| Prioridad | Alta |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe calcular automáticamente el costo de envío del carrito aplicando envío gratis cuando el subtotal alcanza el umbral definido.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
|--------|------|-------------|--------------|
| subtotal | Decimal | Sí | ≥ 0 |
| umbral | Decimal | Fijo | 100000 COP |
| costo_envió | Decimal | Fijo | 15000 COP |

---

## Proceso

- Se calcula el subtotal del carrito.
- Si el subtotal es 0 o mayor o igual a 100000 COP, el envío es gratis.
- En caso contrario, el envío es 15000 COP.
- El total se calcula como `subtotal - descuento + envío`.

---

## Salidas

| Escenario | Resultado |
|------------|-----------|
| Subtotal ≥ 100000 | Envío gratis (0) |
| Subtotal < 100000 | Envío 15000 |
| Carrito vacío | Envío 0 |

---

## Reglas de negocio

RN-001: El envío gratis se otorga desde 100000 COP.  
RN-002: El costo de envío base es 15000 COP.  
RN-003: El carrito muestra un banner motivador según falte o no para el envío gratis.