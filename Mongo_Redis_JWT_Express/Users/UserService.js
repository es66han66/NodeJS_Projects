import Authenticate from '../Authenticate/authenticate.js'

export default class UserService {
  constructor(central) {
    this.central = central;
    this.userDB = central.DBs["users"];
    this.authenticateService = new Authenticate()
    this.cache = central.Cache
  }

  async createUser(userData) {
    const response = await this.userDB.DBQuery("user", "insertOne", userData);
    return response;
  }

  async loginUser(userData) {
    const response = await this.userDB.DBQuery("user", "findOne", {
      email: userData.email,
      password: userData.password
    })
    if(response.hasOwnProperty("email")) {
      const token = this.authenticateService.getToken(userData.email)
      return {
        token: token
      }
    } else {
      return {
        message: "User doesn't exist"
      }
    }
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

  async getUser(userId, token = null) {
    const verifyToken = this.authenticateService.verifyToken(token)
    if(verifyToken) {
      const cachedData = await this.cache.get(userId)
      if(cachedData) {
        return JSON.parse(cachedData)
      }
      const response = await this.userDB.DBQuery("user", "findOne", {
        id: userId,
      });
      await this.cache.set(userId, JSON.stringify(response))
      return response;
    } else {
      return "Invalid Token"
    }
  }

  async deleteUser(userId) {
    const response = await this.userDB.DBQuery("user", "delete", {
      id: userId,
    });
    return response;
  }
}
