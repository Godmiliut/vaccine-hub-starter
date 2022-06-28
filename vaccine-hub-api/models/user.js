const db = require("../db")
const { UnauthorizedError} = require("../utils/errors")

class User {
    static async login(credentials) {
        //  user should submit their email and password
        //  if any credential is missing, throw error
        //  match the given credentials to those stored in the database
        //  compare password for found user
        //  if successful, return user
        //  otherwise, throw Unauthorized Error
        throw new UnauthorizedError("Invalid email or password")
    }

    static async register(credentials) {
        // user should submit their email and password
        //  if any of the credentials is missing, throw error
        //  if any the email is already within the database, throw error
        //  otherwise, generate a user profile and append it to the users list
    }
}

module.exports = User