import jwt from 'jsonwebtoken'
import config from "../configs/development.js";

export default class Authenticate {
    constructor() {
        this.secret = config.secretKey
    }

    getToken(username) {
        return jwt.sign({ username }, this.secret)
    }

    verifyToken(token) {
        try {
            jwt.verify(token, this.secret)
            return true
        } catch(err) {
            return false
        }
    }
}