# HU-040 — Ver tienda del vendedor en el detalle

## Identificación

| Campo | Valor |
|---------|---------|
| ID | HU-040 |
| Título | Ver tienda del vendedor en el detalle |
| Módulo | Catálogo |
| Prioridad | Media |
| Estado | Implementado |
| RF asociados | RF-040 |

---

## Historia

Como comprador de Lubix, quiero ver quién vende un producto y si su tienda está verificada, para decidir con confianza antes de comprar.

---

## Criterios de aceptación

### CA-040.1 — Nombre del vendedor visible

**Dado que** estoy en el detalle de un producto,

**cuando** reviso la información del producto,

**entonces** debo ver "Vendido por <nombre de la empresa>" resaltado.

---

### CA-040.2 — Avatar o inicial de la tienda

**Dado que** visualizo la sección del vendedor,

**cuando** reviso el detalle,

**entonces** se muestra el avatar de la tienda o la inicial de su nombre.

---

### CA-040.3 — Insignia de tienda verificada

**Dado que** la empresa vendedora está verificada,

**cuando** reviso la sección de la tienda,

**entonces** debe mostrarse la insignia "Tienda verificada".

---

### CA-040.4 — Sección oculta sin vendedor

**Dado que** el producto no tiene información de empresa,

**cuando** reviso el detalle,

**entonces** la sección del vendedor no debe mostrarse.

---