# HU-008 — Visualizar contraseña

## Identificación

| Campo | Valor |
|---------|---------|
| ID | HU-008 |
| Título | Visualizar contraseña |
| Módulo | Autenticación |
| Prioridad | Media |
| Estado | Implementado |
| RF asociados | RF-008 |

---

## Historia

Como usuario de Lubix, quiero poder visualizar la contraseña que estoy escribiendo al iniciar sesión, para verificar que la escribí correctamente antes de ingresar.

---

## Criterios de aceptación

### CA-008.1 — Ícono de ojo en el campo de contraseña

**Dado que** el usuario se encuentra en la pantalla de inicio de sesión,

**cuando** se muestra el campo de contraseña,

**entonces** debe aparecer un ícono de ojo dentro del campo que permita mostrar u ocultar la contraseña.

---

### CA-008.2 — Mostrar contraseña

**Dado que** el usuario tiene el campo de contraseña oculto,

**cuando** presiona el ícono de ojo,

**entonces** la contraseña se muestra en texto plano y el ícono cambia a ojo tachado.

---

### CA-008.3 — Ocultar contraseña

**Dado que** el usuario tiene la contraseña visible,

**cuando** vuelve a presionar el ícono de ojo,

**entonces** la contraseña vuelve a mostrarse enmascarada y el ícono regresa a ojo abierto.

---

### CA-008.4 — Estado inicial

**Dado que** el usuario accede a la pantalla de inicio de sesión,

**cuando** el formulario se carga,

**entonces** la contraseña se muestra enmascarada por defecto.

---

### CA-008.5 — La visibilidad no afecta el envío

**Dado que** el usuario muestra u oculta la contraseña,

**cuando** presiona el botón de iniciar sesión,

**entonces** el formulario se envía con la contraseña correcta, sin importar si estaba visible u oculta.

---