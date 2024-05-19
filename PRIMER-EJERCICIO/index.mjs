import express from 'express';
import dotenv from 'dotenv';
import debug from 'debug';
import chalk from 'chalk';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configurar dotenv
dotenv.config();

const app = express();

// Middleware morgan para logging
app.use(morgan('dev'));

// Configurar EJS
app.set('view engine', 'ejs');

// Importar enrutadores
import productRouter from './routes/products.mjs';

// Usar enrutadores
app.use('/products', productRouter);
app.use('/api/products', productRouter);

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.listen(PORT, () => {
    debug(`Server is running on ${chalk.green(`http://localhost:${PORT}`)}`);
});
