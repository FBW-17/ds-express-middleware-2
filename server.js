const express = require("express")
const api = express()

api.listen(3000, console.log("Started on 3000"))


const ageCheck = (req, res, next) => {
    console.log("Middleware called...", req.url)
    if(!req.query.age || req.query.age < 18 ) {
        next("Too young for this")
    }
    next()
}

api.get("/secure", ageCheck, (req, res) => {
    res.send("You reached the security area")
})


// BONUS TASK
let arrUsers = [
    {username: "Robmin", role:"Admin"}, 
    {username: "Rob", role: "User"}
]

const isAdmin = (req, res, next) => {
    if(!req.query.username) {
        return res.redirect("/")
    }
    let isAdmin = arrUsers.some(user => user.username == req.query.username && user.role == "Admin")
    if(!isAdmin) {
        return res.redirect("/")
    }
    // user has the right role => let him pass!
    next()
}

api.use("/admin", isAdmin)

api.get("/", (req, res) => {
    res.send("<h1>Homepage</h1>" +
        "<a href='/admin'>Admin page</a>")
})

api.get("/admin", (req, res) => {
    res.send("<h1>Welcome to Admin page</h1>")
})
