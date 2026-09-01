# RF-029 — Aplicar descuento a producto

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-029 |
| Nombre | Aplicar descuento a producto |
| Módulo | Productos |
| Prioridad | Media |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe permitir que la empresa active un descuento porcentual sobre el precio de un producto para exhibirlo como oferta en el catálogo.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
|--------|------|-------------|--------------|
| discount_enable | Booleano | Sí | Activa/desactiva la oferta |
| discount_value | Decimal | Sí | 0–100 |

---

## Proceso

- La empresa habilita el descuento del producto.
- Se ingresa el porcentaje de descuento (0–100).
- El backend valida el rango del porcentaje.
- El precio efectivo se calcula como `precio - (precio × descuento / 100)`.
- El producto se muestra como oferta en el catálogo con el porcentaje visible.

---

## Salidas

| Escenario | Resultado |
|------------|-----------|
| Descuento activo | Precio efectivo con descuento aplicado |
| Descuento desactivado | Precio original sin oferta |
| Porcentaje fuera de rango | Error "el descuento debe estar entre 0 y 100" |

---

## Reglas de negocio

RN-001: El porcentaje de descuento debe estar entre 0 y 100.  
RN-002: El descuento se aplica al calcular precios en catálogo, carrito y factura.  
RN-003: El precio base del producto se mantiene intacto.