import express from "express";

const port = 3000;
const app = express();

console.log(`worker pid=${process.pid}`);

app.get("/heavy", (req, res) => {
  console.log("hit in heavy");
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  }).then(() => {
    res.send("CPU heavy task is done now");
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
