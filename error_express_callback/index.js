import express from "express";

const port = 3000;
const app = express();

console.log(`worker pid=${process.pid}`);

function newFunction() {
  throw new Error("boom hello");
}

app.get(
  "/lightWithoutCluster",
  (req, res, next) => {
    console.log("1st middleware");
    next(new Error("boom"));
  },
  (req, res, next) => {
    console.log("main handler");
    try {
      newFunction();
      res.send("CPU light task is done now");
    } catch (err) {
      next(err);
    }
  }
);
app.use((error, req, res, next) => {
  console.log("In middleware");
  console.log("error is", error);
  return res.send(error);
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
