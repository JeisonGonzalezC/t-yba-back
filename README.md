## Available Scripts

Para instalar las dependencias del packages.json
### `npm install`
o
### `yarn install`

Para iniciar el proyecto
Primero
### `npm run build`
o
### `yarn build`

Posteriormente
### `npm start`
o
### `yarn start`

Crear una base de datos con el nombre test_tyba
Para correr las migraciones
### `npm run db:prod:migrate`
o
### `yarn db:prod:migrate`

Crear un archivo .env en la raíz del proyecto y agregar las siguientes variables de entorno
DB_CONNECTION="postgresql://USUARIOPG:CONTRASEÑAPG@localhost/test_tyba"
PORT="3004"
PWD_SALT="cualquierpass"
PWD_TOKEN="cualquiertoke"
ENDPOINT_RESTAURANT="https://places.ls.hereapi.com/places/v1/discover"
API_RESTAURANT_KEY="Xjuomra7ydZtkYOKsntf_XWjNhBrDLbnaJrDwls8IPM"

Funcionamiento:
El proyecto cuenta con 3 enpooints de auth
Register
Login
LOgout

Cuenta con dos enpoints para:
Consultrar los restaurantes por coordenadas
Consultar las transacciones a la api de retaurantes

Además el backend cuenta con los test unitarios a los modelos usadas.
AuthModel
RestaurantModel.

En la raíz se encuentra un archivo llamado
Tyba.postman_collection.json
Para ver la documentación de la api en postman.

### NOTA
Si el endpoint de consultrar restaurantes falla, por favor consultarme.
la llave API_RESTAURANT_KEY expira rapidamente por ser una cuenta free de la api y no entre en mucho detalle sobre como refrescar el token asú que se debe generar nuevamente de forma manual.