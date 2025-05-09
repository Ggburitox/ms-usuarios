const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Usuarios',
      version: '1.0.0',
      description: 'API REST para gestión de usuarios',
    },
    servers: [
      {
        url: 'http://3.86.243.83:8001', // cambia si usas IP pública
      },
    ],
  },
  apis: ['./app/routes/*.js'], // rutas donde están los comentarios Swagger
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
