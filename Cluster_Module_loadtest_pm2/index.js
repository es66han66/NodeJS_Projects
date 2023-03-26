const express = require("express");
const port = 3000;

const app = express();
console.log(`Worker Number ${process.pid} started`);

let countRequest = 0;
app.get("/", function (req, res) {
  console.time("noclusterApi");
  const base = 8;
  let result = 0;
  console.time("start");
  for (let i = Math.pow(base, 7); i >= 0; i--) {
    result += i + Math.pow(i, 10);
  }
  console.timeEnd("noclusterApi");

  console.log(`RESULT IS ${result} - ON PROCESS ${process.pid}`);
  res.send(`Result number is ${result}`);
  console.timeEnd("start");
  countRequest++;
  console.log(countRequest);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
