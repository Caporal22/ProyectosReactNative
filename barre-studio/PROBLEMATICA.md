# Barre Club — Aplicación móvil de reservas y tienda

## Problemática a resolver

Barre Club es un estudio de barre fitness ubicado en la Ciudad de México, dedicado a clases de bajo impacto que combinan ballet, pilates y yoga. Actualmente, la propietaria del estudio enfrenta tres problemas operativos importantes que limitan su crecimiento y la experiencia de sus clientas: la gestión manual de reservas mediante mensajes de WhatsApp que genera confusiones de horarios y dobles reservas; la dependencia de un sistema externo de citas que renta mensualmente y no le pertenece, lo que impide personalizar la experiencia para sus clientas y la obliga a pagar una renta recurrente; y la falta de un canal digital propio para vender productos complementarios como termos personalizados, calcetas antiderrapantes y bebidas isotónicas que actualmente solo ofrece de forma presencial en el mostrador del estudio.

## Solución propuesta

La aplicación móvil Barre Club resuelve estos problemas integrando en una sola plataforma móvil tres módulos principales: un sistema de reservas de clases, una tienda en línea de productos del estudio, y un panel administrativo para la dueña. La aplicación está desarrollada en Kotlin nativo para Android con arquitectura limpia separada por responsabilidades, almacenamiento remoto en Firebase Firestore para sincronización en tiempo real entre dispositivos, y autenticación con Firebase Authentication que distingue entre dos tipos de usuarios: administradores (la dueña y sus maestras) y clientes finales.

Los administradores pueden crear, editar y eliminar clases definiendo nombre, maestro, descripción, fecha, hora, duración y cupo máximo a través de diálogos nativos DatePickerDialog y TimePickerDialog. También gestionan el catálogo de productos categorizados como bebidas, termos y calcetas, especificando precio, descripción y stock disponible.

Las clientas pueden registrarse con correo y contraseña, recuperar su contraseña por correo electrónico, navegar el catálogo de clases disponibles, reservar su lugar en clases con cupo limitado, recibir notificaciones locales una hora antes de cada clase reservada como recordatorio, agregar productos al carrito con selección de método de pago mediante botones de radio y aceptación de términos con checkbox, y consultar la ubicación física del estudio mediante Google Maps integrado.

Adicionalmente, la aplicación incorpora el sensor podómetro del dispositivo para que las clientas registren los pasos caminados antes de su sesión como complemento al entrenamiento, e incluye un módulo de video promocional para mostrar la propuesta de valor del estudio a nuevas clientas. La interfaz utiliza FlatList para listas de clases y productos, modales bottom-sheet para formularios de creación, y diseño responsivo que funciona tanto en modo vertical como horizontal del dispositivo, todo siguiendo la identidad visual de la marca Barre Club con su paleta de tonos terracota, blush y dorado.
