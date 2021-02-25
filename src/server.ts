import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json({message: 'hello world'});
});

// 1º param => Rota(Recurso API)
app.post('/', (req, res) => {
  // Recebeu os dados para salvar
  return res.json('ok');
});

app.listen(3333);

