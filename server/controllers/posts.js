import { db } from "../database/database.js"
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {
    const cat = req.query.cat;

    const query = cat
        ? "SELECT * FROM posts WHERE category=?"
        : "SELECT * FROM posts";

    db.query(query, [cat], (err, data) => {
        if (err) return res.status(500).send(err)
        return res.status(200).json(data)
    })
}

export const getPost = (req, res) => {
    const query = "SELECT p.id, `username`, `title`, `description`, p.image, u.image AS userImage, `category`, `date` FROM user u JOIN posts p ON u.id=p.uid WHERE p.id=?";

    db.query(query, [req.params.id], (err, data) => {
        if (err) return res.status(500).send(err)
        console.log(data[0], req.params.id)
        return res.status(200).json(data[0])
    })
}

export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authorized!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid")

        const query = "INSERT INTO posts(`title`, `description`, `image`, `category`, `date`, `uid`) VALUES(?)";

        const values = [
            req.body.title,
            req.body.description,
            req.body.image,
            req.body.category,
            req.body.date,
            userInfo.id
        ]

        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).send(err)
            return res.json("Post has been created")
        })
    })
}

export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authorized!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid")

        const postId = req.params.id;
        const query = "DELETE FROM posts WHERE `id`=? AND `uid`=?";

        db.query(query, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your post!")
            return res.json("Post has been deleted")
        })
    })
}

export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authorized!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is invalid")

        const postId = req.params.id;
        const query = "UPDATE posts SET `title`=?, `description`=?, `image`=?, `category`=? WHERE `id`=? AND `uid`=?";

        const values = [
            req.body.title,
            req.body.description,
            req.body.image,
            req.body.category,
        ]

        db.query(query, [...values, postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).send(err)
            return res.json("Post has been updated")
        })
    })
}