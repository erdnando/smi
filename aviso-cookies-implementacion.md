# Implementación de aviso de cookies para SMI Networks

## Importancia del aviso de cookies

Aunque México no tiene una regulación tan estricta como el GDPR europeo, implementar un aviso de cookies en tu sitio web es una buena práctica de privacidad y transparencia con tus usuarios, especialmente considerando:

1. **Cumplimiento normativo**: La Ley Federal de Protección de Datos Personales en Posesión de Particulares (LFPDPPP) en México requiere informar a los usuarios sobre la recopilación de datos.

2. **Estándares internacionales**: Si tu sitio recibe visitantes de la UE o California, estarías sujeto a normativas más estrictas (GDPR/CCPA).

3. **Transparencia y confianza**: Aumenta la confianza de tus visitantes al ser transparente sobre la recopilación de datos.

4. **Preparación para futuras regulaciones**: Las leyes de privacidad en México podrían volverse más estrictas en el futuro.

## Archivos implementados

Se han creado dos nuevos archivos para implementar el aviso de cookies:

1. **cookie-consent.css**: Contiene los estilos para el banner de cookies.
2. **cookie-consent.js**: Contiene la lógica para mostrar/ocultar el aviso y guardar las preferencias del usuario.

## Instrucciones de implementación

Para implementar el aviso de cookies en tu sitio web, sigue estos pasos:

### 1. Añadir los archivos al encabezado HTML

Añade las siguientes líneas dentro de la etiqueta `<head>` de cada página HTML de tu sitio:

```html
<!-- Estilos y script para el aviso de cookies -->
<link rel="stylesheet" href="cookie-consent.css">
<script src="cookie-consent.js" defer></script>
```

### 2. Actualizar la política de privacidad

Es recomendable actualizar tu política de privacidad (`politica.html`) para incluir una sección específica sobre cookies que explique:

- Qué son las cookies
- Qué tipos de cookies utilizas en tu sitio
- Para qué se utilizan
- Cómo los usuarios pueden gestionarlas

### 3. Añadir un ancla en la política de privacidad

En tu archivo `politica.html`, añade un identificador para poder enlazar directamente a la sección de cookies:

```html
<h2 id="cookies">Política de Cookies</h2>
```

## Funcionamiento del aviso de cookies

El aviso implementado:

1. **Se muestra automáticamente** a los usuarios que visitan tu sitio por primera vez
2. **Guarda las preferencias** en el almacenamiento local del navegador
3. **No vuelve a mostrarse** si el usuario ya ha aceptado las cookies
4. **Es responsive** y se adapta a dispositivos móviles
5. **Permite configuración** (redirige a la política de privacidad)
6. **Está preparado para integrar** con herramientas de análisis como Google Analytics

## Personalización adicional (opcional)

Si deseas personalizar el aviso de cookies:

1. **Colores**: Modifica las variables de color en `cookie-consent.css`
2. **Texto**: Edita el contenido en `cookie-consent.js`
3. **Comportamiento**: Añade lógica adicional para tipos específicos de cookies

## Recomendaciones legales

Para cumplir plenamente con las normativas internacionales, considera:

1. **Consentimiento explícito**: El banner actual está configurado para pedir consentimiento explícito
2. **Opción de rechazo**: Considera añadir un botón para rechazar cookies no esenciales
3. **Panel de preferencias**: Para una implementación más robusta, desarrolla un panel detallado donde los usuarios puedan elegir qué tipos de cookies aceptan
4. **Consultoría legal**: Para garantizar el cumplimiento total con la LFPDPPP y otras regulaciones internacionales si tienes visitantes de otros países

## Siguiente paso recomendado

Una vez implementado el aviso de cookies, actualiza tu política de privacidad para incluir información detallada sobre:

1. Tipos de cookies utilizadas
2. Duración de las cookies
3. Datos recopilados
4. Terceros que pueden acceder a estos datos
5. Cómo los usuarios pueden eliminar o gestionar las cookies

---

*Este documento fue creado el 23 de julio de 2023*
