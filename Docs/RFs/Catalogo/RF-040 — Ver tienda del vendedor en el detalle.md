# RF-040 — Ver tienda del vendedor en el detalle

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-040 |
| Nombre | Ver tienda del vendedor en el detalle |
| Módulo | Catálogo |
| Prioridad | Media |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe mostrar en el detalle de un producto la información de la tienda que lo vende, incluyendo el nombre de la empresa y su estado de verificación dentro de la plataforma.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
|--------|------|-------------|--------------|
| product_id | UUID | Sí | Debe existir y estar publicado |
| company_name | Texto | No | Devuelto por el detalle |

---

## Proceso

- El usuario abre el detalle de un producto.
- El backend devuelve el nombre de la empresa vendedora (`company_name`).
- La interfaz muestra "Vendido por <empresa>" junto al avatar o inicial.
- Si la empresa está verificada, se muestra la insignia "Tienda verificada".

---

## Salidas

| Escenario | Resultado |
|------------|-----------|
| Producto con vendedor | "Vendido por X" + avatar |
| Empresa verificada | Insignia "Tienda verificada" |
| Producto sin vendedor | Ocultar sección de tienda |

---

## Reglas de negocio

RN-001: Solo productos publicados muestran la tienda vendedora.  
RN-002: La insignia de verificación solo aparece si la empresa está verificada.