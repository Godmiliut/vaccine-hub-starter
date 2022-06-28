const db = require("../db")
const { BadRequestError, UnauthorizedError} = require("../utils/errors")

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
        const requiredFields = ["email", "password", "first_name", "last_name", "location", "date"]
        requiredFields.forEach((field) => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })

        //  if the provided email has an incorrect format, throw an error
        if (credentials.email.indexOf("@") < 0){
            throw new BadRequestError("Invalid email")
        }

        //  if the email is already within the database, throw error
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if(existingUser){
            throw new BadRequestError(`${credentials.email} already in use`)
        }

        //  otherwise, generate a user profile and append it to the users list
        const lowercasedEmail = credentials.email.toLowerCase()

        const result = await db.query(`
            INSERT INTO users (
                email,
                password,
                first_name,
                last_name,
                location,
                date
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING  id, email, password, first_name, last_name, location, date;
        `, [lowercasedEmail, credentials.password, credentials.first_name, credentials.last_name, credentials.location, credentials.date]) 

        const user = result.rows[0]
        
        return user
    }

    static async fetchUserByEmail(email) {
        if (!email){
            throw new BadRequestError("No email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user
    }
}

module.exports = User