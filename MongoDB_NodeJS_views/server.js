import express from "express";
import UserService from "./Users/UserService.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

export default class Server {
  constructor(central) {
    this.userService = new UserService(central);
  }

  startServer() {
    app.post("/createStudent", async (req, res) => {
      const userID = await this.userService.createUser(req.body);
      res.json({
        message: `Student successfully created with ID ${userID}`,
      });
    });

    app.patch("/updateStudent/:userId", async (req, res) => {
      await this.userService.updateUser(req.params.userId, req.body);
      res.json({
        message: "User successfully updated",
      });
    });

    app.get("/getStudent/:userId", async (req, res) => {
      res.json({
        data: await this.userService.getUser(req.params.userId),
      });
    });

    app.get("/getStudentFromView/:userId", async (req, res) => {
      res.json({
        data: await this.userService.getUserFromView(req.params.userId),
      });
    });

    app.delete("/deleteStudent/:userId", async (req, res) => {
      await this.userService.deleteUser(req.params.userId);
      res.json({
        message: "User successfully deleted",
      });
    });

    app.listen(8000, () => {
      console.log("Server started at 8000");
    });
  }
}
