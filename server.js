const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let productData = [
  { id: 1, name: 'Товар 1', description: 'Описание товара 1', hidden: false, outOfStock: false },
  { id: 2, name: 'Товар 2', description: 'Описание товара 2', hidden: false, outOfStock: false },
  { id: 3, name: 'Товар 3', description: 'Описание товара 3', hidden: false, outOfStock: false }
];

app.get('/products', (req, res) => {
  res.json(productData);
});

app.post('/products/:id', (req, res) => {
  const productId = req.params.id;
  const { hidden, outOfStock } = req.body;

  const product = productData.find(p => p.id === parseInt(productId));
  if (product) {
    product.hidden = hidden;
    product.outOfStock = outOfStock;
    res.json({ message: 'Товар обновлен' });
  } else {
    res.status(404).json({ error: 'Товар не найден' });
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
