# RF-057 — Ver pedidos recibidos por la empresa

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-057 |
| Nombre | Ver pedidos recibidos por la empresa |
| Módulo | Pedidos |
| Prioridad | Alta |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe permitir que la empresa consulte todos los pedidos que incluyen alguno de sus productos, mostrando información del comprador, los ítems propios, el estado y el progreso de entrega.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
|--------|------|-------------|--------------|
| token_empresa | JWT | Sí | Rol empresa |

---

## Proceso

- La empresa consulta el listado de pedidos.
- El backend filtra las órdenes que contienen productos de la empresa.
- Cada pedido incluye nombre y email del comprador.
- Se muestran solo los ítems que pertenecen a la empresa con cantidades y precios.
- Se visualiza progreso de entrega y fecha estimada.

---

## Salidas

| Escenario | Código HTTP | Respuesta |
|------------|-------------|----------|
| Listado exitoso | 200 | Pedidos con ítems de la empresa |
| Sin pedidos | 200 | Lista vacía |

---

## Reglas de negocio

RN-001: La empresa solo ve pedidos que contengan sus productos.  
RN-002: Los totales mostrados corresponden a los ítems de la empresa.