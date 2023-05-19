# Proyecto Final Backend Coderhouse

- Proyecto Final del curso de Backend CoderHouse

# Desarrollado con:

- Express
- Bcrypt
- MongoDB
- JsonWebToken
- Mongoose
- Socket.io
- Dotenv
- EJS
- Nodemailer
- Twilio
- Log4js
- Multer
- Passport Local

# Navegacion y componentes

Contendrá las rutas necesarias que permitan listar los productos existentes, ingresar productos nuevos, borrar y modificar sus detalles, así como interactuar con el carrito de compras.

- Se implementará una API RESTful con los verbos get, post, put y delete para cumplir con todas las acciones necesarias.

- Los productos ingresados se almacenarán en una base de datos MongoDB.

- El usuario podrá registrar sus credenciales de acceso para luego poder ingresar a su cuenta. Estas credenciales serán guardadas en la base de datos MongoDB encriptando la contraseña.

- El cliente tendrá una sesión activa de usuario con tiempo de expiración configurable.

- Implementarás un canal de chat basado en websockets, el cual permita atender las consultas del cliente.

- La arquitectura del servidor estará basada en capas (MVC).

- El servidor podrá tomar configuraciones desde un archivo externo.

- Se enviará un mail a una casilla configurable, por cada registro nuevo de usuario y con cada orden de compra generada.

- En caso de detectar algún error, el servidor enviará una vista.