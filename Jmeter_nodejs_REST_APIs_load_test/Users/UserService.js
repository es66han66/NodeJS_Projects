export default class UserService {
  constructor(central) {
    this.central = central;
    this.userDB = central.DBs["users"];
  }

  async createUser(userData) {
    const response = await this.userDB.DBQuery("user", "insertOne", userData);
    return response;
  }

  async updateUser(userId, userData) {
    const response = await this.userDB.DBQuery(
      "user",
      "updateOne",
      {
        id: userId,
      },
      userData
    );
    return response;
  }

  async getUser(userId) {
    const response = await this.userDB.DBQuery("user", "findOne", {
      id: userId,
    });
    return response;
  }

  async getUsers() {
    const response = await this.userDB.DBQuery("user", "find", {});
    return response;
  }

  async deleteUser(userId) {
    const response = await this.userDB.DBQuery("user", "delete", {
      id: userId,
    });
    return response;
  }
}
