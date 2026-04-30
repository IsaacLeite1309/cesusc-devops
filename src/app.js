const express = require('express');
const app = express();
const port = 3000;

// Rota solicitada para servir o arquivo HTML
app.get('/index', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor ativo em http://localhost:${port}/index`);
});