const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Usuarios',
      version: '1.0.0',
      description: 'API REST para gestión de usuarios del sistema de cine',
    },
    servers: [
      {
        url: 'http://3.86.243.83:8001' // usa tu ip publica de MV DESARROLLO
      }
    ]
  },
  apis: ['./app/routes/*.js'], // ruta donde están las rutas documentadas
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
