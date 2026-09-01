# HU-029 — Aplicar descuento a producto

## Identificación

| Campo | Valor |
|---------|---------|
| ID | HU-029 |
| Título | Aplicar descuento a producto |
| Módulo | Productos |
| Prioridad | Media |
| Estado | Implementado |
| RF asociados | RF-029 |

---

## Historia

Como empresa de Lubix, quiero aplicar un descuento porcentual a mis productos, para ofrecerlos como ofertas y atraer más compradores.

---

## Criterios de aceptación

### CA-029.1 — Activar descuento

**Dado que** tengo un producto registrado,

**cuando** accedo a su configuración,

**entonces** debo poder activar la opción de descuento.

---

### CA-029.2 — Ingresar porcentaje válido

**Dado que** activo el descuento,

**cuando** ingreso el porcentaje,

**entonces** el sistema acepta valores entre 0 y 100 y rechaza valores fuera del rango con un mensaje de error.

---

### CA-029.3 — Cálculo del precio efectivo

**Dado que** guardo un producto con descuento activo,

**cuando** se muestra en el catálogo,

**entonces** se calcula el precio efectivo descontado según el porcentaje.

---

### CA-029.4 — Visualización como oferta

**Dado que** el producto tiene descuento activo,

**cuando** aparece en la tienda,

**entonces** se muestra el porcentaje de descuento y el precio original con el precio efectivo.

---

### CA-029.5 — Desactivar descuento

**Dado que** desactivo el descuento,

**cuando** guardo los cambios,

**entonces** el producto vuelve a mostrar su precio original sin oferta.

---