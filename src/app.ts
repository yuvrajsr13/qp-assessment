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

// API Routes
app.use('/admin', adminRoutes); // Admin routes
app.use('/user', userRoutes);   // User routes

// Swagger UI explicitly to serve at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Handle the root route explicitly
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the Grocery API! Visit /api-docs for API documentation.',
  });
});

// Fallback for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
