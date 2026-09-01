# RF-048 — Fusionar carrito local con el servidor

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-048 |
| Nombre | Fusionar carrito local con el servidor |
| Módulo | Carrito de Compras |
| Prioridad | Alta |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe permitir que el carrito guardado localmente en el dispositivo se fusione con el carrito del servidor al iniciar sesión, sumando las cantidades de los productos que ya existan y respetando el stock máximo.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
|--------|------|-------------|--------------|
| token_autenticado | JWT | Sí | Usuario o empresa válidos |
| items_locales | Lista | Sí | product_id + quantity |
| items_servidor | Lista | No | Carrito existente |

---

## Proceso

- El usuario agrega productos al carrito sin iniciar sesión (carrito local persistido).
- Al autenticarse, el sistema envía los items locales al endpoint de fusión.
- Si el producto ya existe en el carrito del servidor, se suman las cantidades hasta el stock máximo.
- Si no existe, se agrega como nuevo item.
- El carrito local se limpia y se reemplaza por el resultado fusionado.

---

## Salidas

| Escenario | Código HTTP | Respuesta |
|------------|-------------|----------|
| Fusión exitosa | 200 | Carrito fusionado actualizado |
| Sin items locales | 200 | Carrito del servidor sin cambios |
| Stock excedido | 200 | Cantidad limitada al stock |

---

## Reglas de negocio

RN-001: La fusión solo ocurre después de una autenticación exitosa.  
RN-002: Las cantidades no deben superar el stock disponible.  
RN-003: El carrito local debe persistir entre sesiones sin login.