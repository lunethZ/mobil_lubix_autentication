# RF-055 — Gestionar estado de pedido desde la empresa

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-055 |
| Nombre | Gestionar estado de pedido desde la empresa |
| Módulo | Pedidos |
| Prioridad | Alta |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe permitir que la empresa avance el estado de los pedidos que contienen sus productos a lo largo de su ciclo de vida: pendiente → confirmado → enviado → entregado, o cancelado.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
|--------|------|-------------|--------------|
| order_id | UUID | Sí | Debe existir y contener productos de la empresa |
| status | Texto | Sí | confirmed, cancelled, shipped, delivered |

---

## Proceso

- La empresa consulta sus pedidos recibidos.
- Selecciona un pedido y una acción según el estado actual.
- En `pending` puede Confirmar o Rechazar (cancelled).
- En `confirmed` puede Marcar enviado (shipped).
- En `shipped` puede Marcar entregado (delivered).
- El backend valida la transición y actualiza el progreso de entrega.

---

## Salidas

| Escenario | Código HTTP | Respuesta |
|------------|-------------|----------|
| Transición válida | 200 | Pedido actualizado |
| Transición inválida | 400 | "Transición no permitida" |
| Pedido sin productos de la empresa | 404 | No encontrado |

---

## Reglas de negocio

RN-001: Transiciones: pending→confirmed|cancelled, confirmed→shipped|cancelled, shipped→delivered.  
RN-002: La empresa solo gestiona pedidos que contengan sus productos.  
RN-003: Un pedido entregado o cancelado no admite más cambios.