import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

export default class Server {
  constructor() {
  }

  startServer() {

    app.get("/sample", async (req, res) => {
      res.json({
        data: "successfull_sample",
      });
    });

    app.listen(8000, () => {
      console.log("Server started at 8000");
    });
  }
}
