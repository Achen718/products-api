const express = require('express');
const app = express();
const port = 3000;
const productRouter = require('./routes/products');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1', productRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
