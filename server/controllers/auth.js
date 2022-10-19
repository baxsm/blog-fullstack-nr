import { db } from "../database/database.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    const query = "SELECT * FROM user WHERE email=? OR username=?";

    db.query(query, [email, username], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("User already exists!");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const query2 = "INSERT INTO user(`username`, `email`, `password`) VALUES(?)";

        const values = [
            username,
            email,
            hash
        ]

        db.query(query2, [values], (err, data) => {
            if (err) return res.json(err)
            return res.status(200).json("User has been created.")
        })
    })

}

export const login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    const query = "SELECT * FROM user WHERE username=?";

    db.query(query, [username], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(409).json("User not found!");

        const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);

        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!")

        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        {
            const { password, ...other } = data[0]

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(other)
        }
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        security: true
    }).status(200).json("User has been logged out!")
}