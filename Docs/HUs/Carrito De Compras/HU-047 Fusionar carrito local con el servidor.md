# HU-047 — Fusionar carrito local con el servidor

## Identificación

| Campo | Valor |
|---------|---------|
| ID | HU-047 |
| Título | Fusionar carrito local con el servidor |
| Módulo | Carrito de Compras |
| Prioridad | Alta |
| Estado | Implementado |
| RF asociados | RF-048 |

---

## Historia

Como usuario de Lubix, quiero que los productos que agregué como invitado se conserven al iniciar sesión, para no perder mi carrito y continuar la compra sin repetir pasos.

---

## Criterios de aceptación

### CA-047.1 — Conservación del carrito local

**Dado que** agrego productos al carrito sin iniciar sesión,

**cuando** cierro y reabro la aplicación sin autenticarme,

**entonces** el carrito local se conserva en el dispositivo.

---

### CA-047.2 — Fusión al iniciar sesión

**Dado que** tengo un carrito local y luego inicio sesión,

**cuando** la autenticación es exitosa,

**entonces** el carrito local se fusiona con el carrito guardado en el servidor.

---

### CA-047.3 — Suma de cantidades existentes

**Dado que** un producto ya existe tanto en el carrito local como en el del servidor,

**cuando** se fusiona,

**entonces** las cantidades se suman respetando el stock máximo disponible.

---

### CA-047.4 — Productos nuevos agregados

**Dado que** un producto del carrito local no existe en el del servidor,

**cuando** se fusiona,

**entonces** el producto se agrega como nuevo ítem del carrito.

---

### CA-047.5 — Carrito local limpio tras la fusión

**Dado que** la fusión fue exitosa,

**cuando** se completa el proceso,

**entonces** el carrito local queda vacío y se usa el carrito fusionado del servidor.

---