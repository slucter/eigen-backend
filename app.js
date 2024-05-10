const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Router = require('./src/router')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT_SRV || 3737

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
            title: 'Borrow Book - Eigen BE Test',
            version: '1.0.0',
            description: 'dokumentasi api be borrow book test',
            license: {
                name: 'Source Code',
                url: 'https://github.com/slucter',
            },
        },
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: 'Development server',
        },
    ],
    tags: [
        {
          name: 'Book',
        },
        {
          name: 'Member',
        },
    ],
};
  
  const options = {
    swaggerDefinition,
    apis: ['./src/router/*.js'],
  };
  
const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/api', Router)

app.listen(PORT, () => console.log(`running on port ${PORT}`))
