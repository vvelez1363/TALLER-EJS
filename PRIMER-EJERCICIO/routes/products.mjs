import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta para devolver productos en formato JSON
router.get('/api/products', async (req, res) => {
    const data = await fs.readFile(path.join(__dirname, '..', 'products.json'), 'utf8');
    let products = JSON.parse(data).products;
    const minPrice = parseFloat(req.query.min_price) || 0;
    products = products.filter(product => product.product_price > minPrice);
    res.json({ products });
});

// Ruta para renderizar productos con EJS
router.get('/', async (req, res) => {
    const data = await fs.readFile(path.join(__dirname, '..', 'products.json'), 'utf8');
    let products = JSON.parse(data).products;
    const minPrice = parseFloat(req.query.min_price) || 0;
    products = products.filter(product => product.product_price > minPrice);
    res.render('products', { products });
});

export default router;
