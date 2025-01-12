import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from './config/swagger';

const swaggerSpec = swaggerJsdoc({
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts'],
});

const app = express();

app.use(bodyParser.json());

// Swagger setup
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

export default app;
