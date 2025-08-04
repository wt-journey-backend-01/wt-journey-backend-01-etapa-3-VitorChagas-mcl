const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Departamento de policia', // Título da documentação
            version: '1.0.0', // Versão atual da API
            description:
                'Documentação da API de agentes e casos'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local de desenvolvimento', // URL base da API
            },
        ],
    },
    apis: ['./routes/*.js'], // Onde estão os arquivos com as anotações JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

// Função que configura o Swagger na aplicação Express
function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;