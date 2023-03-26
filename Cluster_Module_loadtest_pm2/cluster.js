const express = require("express");
const port = 3001;
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;
let countRequest = 0;
if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });

  cluster.on("message", () => {
    countRequest++;
    console.log(countRequest);
  });
} else {
  start();
}

function start() {
  const app = express();
  console.log(`Worker ${process.pid} started`);

  app.get("/", function (req, res) {
    console.time("withclusterApi");
    const base = 8;
    let result = 0;
    console.time("start");
    for (let i = Math.pow(base, 7); i >= 0; i--) {
      result += i + Math.pow(i, 10);
    }
    console.timeEnd("withclusterApi");

    console.log(`Result IS ${result} - ON PROCESS ${process.pid}`);
    res.send(`Result number is ${result}`);
    console.timeEnd("start");
    process.send("I am done");
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
