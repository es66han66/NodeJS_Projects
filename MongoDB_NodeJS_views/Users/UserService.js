export default class UserService {
  constructor(central) {
    this.central = central;
    this.userDB = central.DBs["students"];
  }

  async createUser(userData) {
    const response = await this.userDB.DBQuery("student", "insertOne", userData);
    return response;
  }

  async updateUser(userId, userData) {
    const response = await this.userDB.DBQuery(
      "student",
      "updateOne",
      {
        id: userId,
      },
      userData
    );
    return response;
  }

  async getUser(userId) {
    const response = await this.userDB.DBQuery("student", "findOne", {
      id: userId,
    });
    return response;
  }

  async getUserFromView(userId) {
    const response = await this.userDB.DBQuery("studentView", "findInView", {
      id: userId,
    });
    return response;
  }

  async deleteUser(userId) {
    const response = await this.userDB.DBQuery("student", "delete", {
      id: userId,
    });
    return response;
  }
}
