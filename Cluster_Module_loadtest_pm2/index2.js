import express from 'express'

const port = 3000;

const app = express();
console.log(`Worker Number ${process.pid} started`);

app.get('/', (req, res) => {
  res.send('Hi There! This application does not use clustering.....');
})

app.get('/heavy', function (req, res) {
  console.time('noclusterApi');
  const base = 8;
  let result = 0;   
  for (let i = Math.pow(base, 7); i >= 0; i--) {       
    result += i + Math.pow(i, 10);
  };
  console.timeEnd('noclusterApi');

  console.log(`RESULT IS ${result} - ON PROCESS ${process.pid}`);
  res.send(`Result number is ${result}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});