# RF-009 — Verificación de empresa

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-009 |
| Nombre | Verificación de empresa |
| Módulo | Autenticación |
| Prioridad | Media |
| Estado | Pendiente |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe permitir que una empresa registrada complete su proceso de verificación, proporcionando la documentación requerida (NIT y documentos de constitución) para que su cuenta sea validada y pueda operar en la plataforma.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
|--------|------|-------------|--------------|
| token_empresa | JWT | Sí | Rol empresa |
| company_id | UUID | Sí | Debe existir |
| NIT | Texto | Sí | Formato válido de NIT |
| documentos | Archivos | Sí | Formato PDF/IMAGEN |

---

## Proceso

- La empresa accede a su sección de verificación.
- La empresa carga su NIT y documentos de constitución.
- El sistema registra la solicitud de verificación.
- El administrador valida la documentación (RF-063).
- Al ser validada, la empresa queda `verified = true` y puede publicar productos.

---

## Salidas

| Escenario | Código HTTP | Respuesta |
|------------|-------------|----------|
| Solicitud enviada | 200 | "Solicitud de verificación enviada" |
| Empresa ya verificada | 400 | "La empresa ya está verificada" |
| Documentación incompleta | 400 | "Documentación requerida" |
| Empresa no encontrada | 404 | "Empresa no encontrada" |

---

## Reglas de negocio

RN-001: Solo la empresa autenticada puede enviar su propia verificación.  
RN-002: La empresa no puede publicar productos hasta estar verificada.  
RN-003: La validación final de la documentación la realiza el administrador.